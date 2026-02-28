import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import Skeleton from "../../../components/Skeleton";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom"; // Detail page এ যাওয়ার জন্য

const RequestAnAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Search, Filter & Sort States
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [requestNote, setRequestNote] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetching assets
  const { data: assets = [], isLoading, isFetching, refetch } = useQuery({
    queryKey: ["assets-list", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });

  // ✅ Filter Logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.productName?.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = filterType ? asset.productType === filterType : true;
    return matchesSearch && matchesType;
  });

  // ✅ Corrected Sorting Logic
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === "available") {
      return b.productQuantity - a.productQuantity;
    }
    if (sortBy === "out-of-stock") {
      return a.productQuantity - b.productQuantity;
    }
    if (sortBy === "newest") {
      // আপনার ডাটাবেসে যদি requestDate বা createdAt না থাকে তবে বার্থডে বা অন্য ডেট ফিল্ড চেক করুন
      return new Date(b.requestDate || b.createdAt || 0) - new Date(a.requestDate || a.createdAt || 0);
    }
    return 0;
  });

  // ✅ Pagination Calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = sortedAssets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAssets.length / itemsPerPage);

  const handleConfirmRequest = async () => {
    if (!selectedAsset) return;

    const requestInfo = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      requestDate: new Date().toISOString(),
      requesterEmail: user?.email,
      requesterName: user?.displayName,
      requestNote: requestNote,
      status: "pending",
      requestStatus: "pending",
      hrEmail: selectedAsset.hrEmail,
      companyName: selectedAsset.companyName,
      productImage: selectedAsset.productImage
    };

    try {
      const res = await axiosSecure.post("/requests", requestInfo);
      if (res.data.insertedId || res.data.requestId) {
        toast.success("Request sent successfully!");
        document.getElementById("request_modal").close();
        setRequestNote("");
        refetch();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <Helmet>
        <title>Request Asset | AssetVerse</title>
      </Helmet>

      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
        Available Assets for Request
      </h2>

      {/* --- Search, Filter & Sort Bar --- */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-white p-6 rounded-xl shadow-sm border items-end">
        <div className="flex-1 w-full">
          <label className="label font-semibold">Search Asset</label>
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full"
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="w-full lg:w-48">
          <label className="label font-semibold">Filter Type</label>
          <select
            className="select select-bordered w-full"
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
        </div>

        <div className="w-full lg:w-48">
          <label className="label font-semibold">Sort by Options</label>
          <select
            className="select select-bordered w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default</option>
            <option value="available">High Stock First</option>
            <option value="out-of-stock">Low Stock First</option>
            <option value="newest">Newest Added</option>
          </select>
        </div>
      </div>

      {/* --- Assets Grid / Skeleton Loader --- */}
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ))}
        </div>
      ) : sortedAssets.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-bold text-xl">No assets found. 🔍</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentAssets.map((asset) => (
              <div key={asset._id} className="card bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
                <figure className="px-4 pt-4">
                  <img
                    src={asset.productImage || "https://via.placeholder.com/150"}
                    alt={asset.productName}
                    className="rounded-xl h-40 w-full object-cover bg-gray-100"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-gray-800 text-lg">{asset.productName}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`badge ${asset.productType === 'Returnable' ? 'badge-primary' : 'badge-ghost border-primary'}`}>
                      {asset.productType}
                    </span>
                    <span className={`font-bold ${asset.productQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Qty: {asset.productQuantity}
                    </span>
                  </div>

                  {/* --- Buttons Section --- */}
                  <div className="flex flex-col gap-2 mt-4">
                    <button
                      onClick={() => {
                        setSelectedAsset(asset);
                        document.getElementById("request_modal").showModal();
                      }}
                      disabled={asset.productQuantity <= 0}
                      className="btn btn-primary w-full btn-sm"
                    >
                      Request Asset
                    </button>

                    {/* ✅ View Details Button */}
                    <button
                      onClick={() => navigate(`/dashboard/asset-details/${asset._id}`)}
                      className="btn btn-outline btn-secondary w-full btn-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Pagination UI */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 mb-8">
              <div className="join">
                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setCurrentPage(num + 1);
                      window.scrollTo(0, 0); // পেজ চেঞ্জ করলে উপরে নিয়ে যাবে
                    }}
                    className={`join-item btn btn-md ${currentPage === num + 1 ? "btn-primary" : "btn-outline"}`}
                  >
                    {num + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* --- Request Modal --- */}
      <dialog id="request_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4 border-b pb-2">Request Confirmation</h3>
          <p className="text-gray-600 mb-4">You are requesting: <strong>{selectedAsset?.productName}</strong></p>

          <div className="form-control">
            <label className="label font-semibold">Additional Notes:</label>
            <textarea
              className="textarea textarea-bordered h-24 focus:ring-primary"
              placeholder="Why do you need this asset?"
              value={requestNote}
              onChange={(e) => setRequestNote(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => document.getElementById("request_modal").close()}>Cancel</button>
            <button className="btn btn-primary px-6" onClick={handleConfirmRequest}>Confirm Request</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAnAsset;