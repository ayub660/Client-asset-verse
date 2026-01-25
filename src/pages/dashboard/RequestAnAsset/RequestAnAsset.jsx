// RequestAnAsset.jsx
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const RequestAnAsset = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  // ------------------ Public Assets ------------------
  const { data: publicData = { assets: [], total: 0 }, isLoading: publicLoading } = useQuery({
    queryKey: ["public-assets", searchQuery, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets/public?searchText=${searchQuery}&limit=${limit}&skip=${currentPage * limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  const assets = publicData.assets || [];
  const totalAssets = publicData.total || 0;
  const totalPage = Math.ceil(totalAssets / limit);

  // ------------------ Employee Requests ------------------
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["my-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/asset-requests/employee");
      return res.data;
    },
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  // ------------------ Handlers ------------------
  const handleSearch = () => {
    setCurrentPage(0);
    setSearchQuery(searchText.trim());
  };

  const handleConfirmRequest = async () => {
    if (!selectedAsset) return;
    setIsSubmitting(true);
    try {
      const res = await axiosSecure.post("/requests", { assetId: selectedAsset._id });
      if (res.data?.request) {
        toast.success("Request sent successfully!");
        setSelectedAsset(null);
        document.getElementById("request_modal").close();
        queryClient.invalidateQueries(["my-requests"]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
    }
    setIsSubmitting(false);
  };

  if (publicLoading || requestsLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <Helmet>
        <title>Request Asset | AssetVerse</title>
      </Helmet>

      <h2 className="text-2xl font-bold text-center text-primary">Request an Asset</h2>

      {/* Search */}
      <div className="flex justify-center">
        <div className="flex gap-2 w-full max-w-sm relative">
          <input
            type="text"
            placeholder="Search asset..."
            className="input input-bordered flex-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary absolute right-0 z-50"
          >
            Search
          </button>
        </div>
      </div>

      {/* Public Assets Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Asset</th>
              <th>HR Email</th>
              <th>Available</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No assets found
                </td>
              </tr>
            ) : (
              assets.map((asset, index) => (
                <tr key={asset._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={asset.productImage} alt={asset.productName} />
                    </div>
                  </td>
                  <td>{asset.productName}</td>
                  <td>{asset.hrEmail}</td>
                  <td>{asset.productQuantity}</td>
                  <td>{asset.productType}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-primary"
                      disabled={asset.productQuantity === 0}
                      onClick={() =>
                        setSelectedAsset(asset) ||
                        document.getElementById("request_modal").showModal()
                      }
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

      {/* My Requests Table */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">My Requests</h3>
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Asset</th>
                <th>HR Email</th>
                <th>Request Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No requests yet
                  </td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr key={req._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={req.assetImage || req.productImage} alt={req.assetName} />
                      </div>
                    </td>
                    <td>{req.assetName}</td>
                    <td>{req.hrEmail}</td>
                    <td>{new Date(req.requestDate).toLocaleString()}</td>
                    <td className="capitalize font-semibold">
                      {req.requestStatus} {/* pending / approved / rejected */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Modal */}
      <dialog id="request_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg text-primary">Confirm Request</h3>
          {selectedAsset && (
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>Asset:</strong> {selectedAsset.productName}
              </p>
              <p>
                <strong>HR:</strong> {selectedAsset.hrEmail}
              </p>
              <p>
                <strong>Company:</strong> {selectedAsset.companyName}
              </p>
            </div>
          )}
          <div className="modal-action flex-col sm:flex-row gap-2">
            <button
              className="btn btn-outline w-full sm:w-auto"
              onClick={() => document.getElementById("request_modal").close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={handleConfirmRequest}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Confirm Request"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAnAsset;
