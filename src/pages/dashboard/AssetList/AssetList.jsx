import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import RequestAssetGrid from "../../../components/employee/RequestAssetGrid";

const AssetList = () => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { register, handleSubmit, setValue, reset } = useForm();

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["assets", searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
    staleTime: 1000 * 5,
    refetchOnWindowFocus: false,
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = assets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(assets.length / itemsPerPage);

  const openEditModal = (asset) => {
    setSelectedAsset(asset);
    setValue("productName", asset.productName);
    setValue("productType", asset.productType);
    setValue("productQuantity", asset.productQuantity);
    modalRef.current.showModal();
  };

  const onSubmitEdit = async (data) => {
    if (!selectedAsset) return;
    try {
      const res = await axiosSecure.patch(`/assets/${selectedAsset._id}`, data);
      if (res.data.modifiedCount) {
        modalRef.current.close();
        reset();
        refetch();
        Swal.fire("Success", "Asset updated successfully", "success");
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleDeleteAsset = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/assets/${id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire("Deleted!", "Asset has been removed.", "success");
        }
      } catch (err) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchText.trim());
    setCurrentPage(1);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-base-100 rounded-xl p-5">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        All Assets ({assets.length})
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="join w-full max-w-md">
          <input
            className="input input-bordered join-item w-full"
            placeholder="Search by asset name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="btn btn-primary join-item">Search</button>
        </div>
      </div>

      {/* Grid Display */}
      {assets.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No assets found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAssets.map((asset) => (
            <RequestAssetGrid
              key={asset._id}
              asset={asset}
              onEdit={() => openEditModal(asset)}
              onDelete={() => handleDeleteAsset(asset._id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="join">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`join-item btn ${currentPage === num + 1 ? "btn-primary" : "btn-outline"}`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Asset</h3>
          <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
            <input {...register("productName")} className="input input-bordered w-full" placeholder="Product Name" />
            <select {...register("productType")} className="select select-bordered w-full">
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
            <input type="number" {...register("productQuantity")} className="input input-bordered w-full" placeholder="Quantity" />
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" onClick={() => modalRef.current.close()} className="btn">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AssetList;