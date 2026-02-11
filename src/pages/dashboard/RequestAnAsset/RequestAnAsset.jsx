import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import Pagination from "../../../components/common/Pagination"
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const RequestAnAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // States
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [requestNote, setRequestNote] = useState("");
  const limit = 10;

  // ১. ডাটা ফেচ করা (সার্চ, ফিল্টার এবং পেজিনেশন সহ)
  const { data: assetData = { assets: [], total: 0 }, isLoading, refetch } = useQuery({
    queryKey: ["assets-list", user?.email, searchText, filterType, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?email=${user?.email}&search=${searchText}&type=${filterType}&limit=${limit}&skip=${currentPage * limit}`
      );
      return res.data;
    },
  });

  const assets = assetData.assets || [];
  const totalAssets = assetData.total || 0;
  const totalPages = Math.ceil(totalAssets / limit);

  // ২. রিকোয়েস্ট সাবমিট করা
  const handleConfirmRequest = async () => {
    if (!selectedAsset) return;

    const requestInfo = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      requestDate: new Date(),
      requesterEmail: user?.email,
      requesterName: user?.displayName,
      requestNote: requestNote,
      status: "pending",
      hrEmail: selectedAsset.hrEmail,
      companyName: selectedAsset.companyName,
      assetImage: selectedAsset.productImage // যদি ইমেজ থাকে
    };

    try {
      const res = await axiosSecure.post("/requests", requestInfo);
      if (res.data.insertedId) {
        toast.success("Request sent successfully!");
        document.getElementById("request_modal").close();
        setRequestNote("");
        refetch();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Helmet>
        <title>Request Asset | AssetVerse</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center text-primary mb-8">Request An Asset</h2>

      {/* --- Search & Filter Bar --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search by asset name..."
            className="input input-bordered focus:border-primary"
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>

        <div className="form-control">
          <select
            className="select select-bordered"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(0);
            }}
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        <div className="form-control">
          <select className="select select-bordered">
            <option value="">Status: All Assets</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* --- Assets List Table --- */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg border border-base-200 mt-6">
        <table className="table table-zebra w-full">
          <thead className="bg-primary/10 text-primary">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-20 opacity-50 italic">
                  No assets found. Try adjusting your search.
                </td>
              </tr>
            ) : (
              assets.map((asset, index) => (
                <tr key={asset._id}>
                  <th>{currentPage * limit + index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 bg-base-200">
                        <img src={asset.productImage || "/placeholder-asset.png"} alt={asset.productName} />
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{asset.productName}</td>
                  <td>
                    <span className={`badge badge-sm font-semibold ${asset.productType === 'Returnable' ? 'badge-primary' : 'badge-ghost border-primary text-primary'}`}>
                      {asset.productType}
                    </span>
                  </td>
                  <td>
                    {asset.productQuantity > 0 ? (
                      <span className="badge badge-success badge-outline gap-1">
                        In Stock ({asset.productQuantity})
                      </span>
                    ) : (
                      <span className="badge badge-error badge-outline">Out of Stock</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedAsset(asset);
                        document.getElementById("request_modal").showModal();
                      }}
                      disabled={asset.productQuantity === 0}
                      className="btn btn-primary btn-xs md:btn-sm"
                    >
                      Request
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Pagination Section --- */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* --- Request Modal --- */}
      <dialog id="request_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-primary mb-4 border-b pb-2">
            Requesting: {selectedAsset?.productName}
          </h3>
          <div className="space-y-4">
            <div className="bg-base-200 p-4 rounded-lg text-sm mb-4">
              <p><strong>Asset Type:</strong> {selectedAsset?.productType}</p>
              <p><strong>Available Qty:</strong> {selectedAsset?.productQuantity}</p>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Message for HR:</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-28 focus:border-primary"
                placeholder="Write why you need this or specify any details..."
                value={requestNote}
                onChange={(e) => setRequestNote(e.target.value)}
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  document.getElementById("request_modal").close();
                  setRequestNote("");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary px-8"
                onClick={handleConfirmRequest}
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAnAsset;