import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import RequestAssetGrid from "../../../components/employee/RequestAssetGrid";

const AssetList = () => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Search & Filter States
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState(""); // Returnable/Non-returnable filter

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { register, handleSubmit, setValue, reset } = useForm();


  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["assets", searchQuery],
    queryFn: async () => {

      const res = await axiosSecure.get(`/assets?search=${searchQuery}`);
      return res.data;
    },
    staleTime: 1000 * 5,
    refetchOnWindowFocus: false,
  });


  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType ? asset.productType === filterType : true;
    return matchesSearch && matchesType;
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  const handleSearch = () => {
    setSearchQuery(searchText.trim());
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchText("");
    setSearchQuery("");
    setFilterType("");
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

  if (isLoading) return <Loading />;

  return (
    <div className="bg-base-100 rounded-xl p-5 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary uppercase tracking-wide">
        Asset Inventory ({filteredAssets.length})
      </h2>


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

        <button onClick={handleReset} className="btn btn-ghost text-error underline">
          Reset
        </button>
      </div>


      {filteredAssets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400 font-semibold italic">No assets match your search.</p>
        </div>
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


      {totalPages > 1 && (
        <div className="flex justify-center mt-12 mb-5">
          <div className="join">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`join-item btn btn-md ${currentPage === num + 1 ? "btn-primary" : "btn-outline"
                  }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </div>
      )}


      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
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
              <button type="submit" className="btn btn-primary px-8">Save Changes</button>
              <button type="button" onClick={() => modalRef.current.close()} className="btn">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AssetList;