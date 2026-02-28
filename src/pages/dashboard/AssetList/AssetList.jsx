import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import RequestAssetGrid from "../../../components/employee/RequestAssetGrid";
import { Link } from "react-router-dom";
import Skeleton from "../../../components/Skeleton";

const AssetList = () => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Search, Filter & Sort States
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { register, handleSubmit, setValue, reset } = useForm();

  // Fetch Assets
  const { data: assets = [], isLoading, isFetching, refetch } = useQuery({
    queryKey: ["assets", searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?search=${searchQuery}`);
      return res.data;
    },
    staleTime: 1000 * 5,
    refetchOnWindowFocus: false,
  });

  // Filter Logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType ? asset.productType === filterType : true;
    return matchesSearch && matchesType;
  });

  // ✅ Sorting Logic
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return a.productQuantity - b.productQuantity;
    }
    if (sortBy === "high-to-low") {
      return b.productQuantity - a.productQuantity;
    }
    if (sortBy === "newest") {
      return new Date(b.addedDate || b.createdAt) - new Date(a.addedDate || a.createdAt);
    }
    return 0;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // ✅ Ekhane sortedAssets use kora hoyeche
  const currentAssets = sortedAssets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  const handleSearch = () => {
    setSearchQuery(searchText.trim());
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchText("");
    setSearchQuery("");
    setFilterType("");
    setSortBy("");
    setCurrentPage(1);
  };

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
      if (res.data.modifiedCount > 0) {
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
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/assets/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Asset has been removed.", "success");
        }
      } catch (err) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  return (
    <div className="bg-base-100 rounded-xl p-5 shadow-lg min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary uppercase tracking-wide">
        Asset Inventory ({filteredAssets.length})
      </h2>

      {/* Search, Filter & Sort UI */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8 items-center">
        <div className="join w-full max-w-md">
          <input
            className="input input-bordered join-item w-full"
            placeholder="Search by asset name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="btn btn-primary join-item">
            Search
          </button>
        </div>

        <select
          className="select select-bordered w-full max-w-xs"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>

        {/* ✅ Sort Dropdown */}
        <select
          className="select select-bordered w-full max-w-xs"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort By</option>
          <option value="low-to-high">Quantity: Low to High</option>
          <option value="high-to-low">Quantity: High to Low</option>
          <option value="newest">Newest Added</option>
        </select>

        <button onClick={handleReset} className="btn btn-ghost text-error underline">
          Reset
        </button>
      </div>

      {/* Main Content Area */}
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400 font-semibold italic">No assets match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAssets.map((asset) => (
            <div key={asset._id} className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border-none">
              <RequestAssetGrid
                asset={asset}
                onEdit={() => openEditModal(asset)}
                onDelete={() => handleDeleteAsset(asset._id)}
              />
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Link
                  to={`/dashboard/asset-details/${asset._id}`}
                  className="btn btn-sm btn-outline btn-info w-full rounded-xl hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination UI */}
      {totalPages > 1 && !(isLoading || isFetching) && (
        <div className="flex justify-center mt-12 mb-5">
          <div className="join">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`join-item btn btn-md ${currentPage === num + 1 ? "btn-primary" : "btn-outline"}`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-gray-800">
          <h3 className="font-bold text-lg mb-6 text-primary">Edit Asset Information</h3>
          <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Product Name</label>
              <input {...register("productName")} className="input input-bordered w-full" />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Product Type</label>
              <select {...register("productType")} className="select select-bordered w-full">
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Quantity</label>
              <input type="number" {...register("productQuantity")} className="input input-bordered w-full" />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary px-8 text-white">Save Changes</button>
              <button type="button" onClick={() => modalRef.current.close()} className="btn btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AssetList;