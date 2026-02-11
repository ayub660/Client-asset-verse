import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import RequestAssetGrid from "../../../components/RequestAssetGrid"; // আপনার কম্পোনেন্ট

const AssetList = () => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // প্যাগিনেশন স্টেট
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

  // ১. প্যাগিনেশন লজিক
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = assets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(assets.length / itemsPerPage);

  // এডিট মোডাল এবং ডিলিট ফাংশন আগের মতোই থাকবে (নিচে সংক্ষেপে দেওয়া হলো)
  const openEditModal = (asset) => {
    setSelectedAsset(asset);
    setValue("productName", asset.productName);
    setValue("productType", asset.productType);
    setValue("productQuantity", asset.productQuantity);
    modalRef.current.showModal();
  };

  const onSubmitEdit = async (data) => {
    // ... (আপনার আগের আপডেট কোড এখানে বসবে)
  };

  const handleDeleteAsset = async (id) => {
    // ... (আপনার আগের ডিলিট কোড এখানে বসবে)
  };

  const handleSearch = () => {
    setSearchQuery(searchText.trim());
    setCurrentPage(1); // সার্চ করলে ১ নম্বর পেজে নিয়ে যাবে
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-base-200 min-h-screen rounded-xl p-5">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        All Assets ({assets.length})
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="join w-full max-w-md">
          <input
            className="input input-bordered join-item w-full"
            placeholder="অ্যাসেটের নাম লিখে সার্চ করুন..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary join-item">Search</button>
        </div>
      </div>

      {/* ২. গ্রিড লেআউট ব্যবহার করে ডাটা দেখানো */}
      {assets.length === 0 ? (
        <p className="text-center text-gray-500">কোনো অ্যাসেট পাওয়া যায়নি।</p>
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

      {/* ৩. প্যাগিনেশন বাটন */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 mb-6">
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

      {/* Edit Modal (আপনার আগের মোডাল কোড এখানে থাকবে) */}
      <dialog ref={modalRef} className="modal">
        {/* ... modal content ... */}
      </dialog>
    </div>
  );
};

export default AssetList;