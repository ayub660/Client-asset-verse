import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// সাজেশন লিস্ট (নামের সাথে টাইপ সেট করা)
const assetSuggestions = [
  { name: "Laptop", type: "Returnable" },
  { name: "Monitor", type: "Returnable" },
  { name: "Chair", type: "Returnable" },
  { name: "Desk", type: "Returnable" },
  { name: "Mouse", type: "Non-returnable" },
  { name: "Keyboard", type: "Non-returnable" },
  { name: "Pen", type: "Non-returnable" },
  { name: "Paper Bundle", type: "Non-returnable" },
  { name: "Headset", type: "Returnable" },
  { name: "Tissue Box", type: "Non-returnable" },
];

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [suggestions, setSuggestions] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const productNameValue = watch("productName");

  // ১. সাজেশনের লজিক
  useEffect(() => {
    if (productNameValue) {
      const filtered = assetSuggestions.filter((item) =>
        item.name.toLowerCase().includes(productNameValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [productNameValue]);

  // সাজেশন সিলেক্ট করলে টাইপ অটো সেট হবে
  const handleSelectSuggestion = (item) => {
    setValue("productName", item.name);
    setValue("productType", item.type);
    setSuggestions([]);
  };

  const { data: currentHR, isLoading } = useQuery({
    queryKey: ["currentHR", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleAddAsset = async (data) => {
    try {
      const asset = {
        ...data,
        productQuantity: Number(data.productQuantity),
        hrEmail: currentHR?.email,
        companyName: currentHR?.companyName,
        companyLogo: currentHR?.companyLogo,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/assets", asset);
      if (res.data.insertedId || res.data.asset) {
        Swal.fire({
          icon: "success",
          title: "Asset Added!",
          text: "New asset has been successfully listed.",
          showConfirmButton: false,
          timer: 1500,
        });
        queryClient.invalidateQueries(["assets"]);
        reset();
        navigate("/dashboard/asset-list");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <div className="flex justify-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <Helmet>
        <title>Add Asset | AssetVerse</title>
      </Helmet>

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-primary p-6">
          <h2 className="text-2xl font-bold text-white text-center">Add New Asset</h2>
          <p className="text-blue-100 text-center text-sm">Fill in the details to add to your inventory</p>
        </div>

        <form onSubmit={handleSubmit(handleAddAsset)} className="p-8 space-y-5">
          {/* Product Name with Suggestions */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 block mb-1">Product Name</label>
            <input
              type="text"
              {...register("productName", { required: "Name is required" })}
              className="input input-bordered w-full focus:ring-2 focus:ring-primary/20"
              placeholder="Start typing (e.g. Laptop)"
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border rounded-lg mt-1 shadow-2xl max-h-40 overflow-y-auto">
                {suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectSuggestion(item)}
                    className="p-3 hover:bg-blue-50 cursor-pointer flex justify-between border-b last:border-0"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs badge badge-ghost">{item.type}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Product Image URL */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Image URL</label>
            <input
              type="text"
              {...register("productImage", { required: "Image is required" })}
              className="input input-bordered w-full"
              placeholder="Paste image link here"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Product Type */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Type</label>
              <select
                {...register("productType", { required: true })}
                className="select select-bordered w-full font-medium"
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Quantity</label>
              <input
                type="number"
                {...register("productQuantity", { required: true, min: 1 })}
                className="input input-bordered w-full"
                placeholder="0"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full text-white font-bold text-lg mt-4 shadow-lg shadow-primary/30">
            Confirm & Add Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;