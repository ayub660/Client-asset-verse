import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const RequestAnAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Filters & Search States
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [requestNote, setRequestNote] = useState("");


  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["assets-list", user?.email],
    queryFn: async () => {

      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });


  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.productName?.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = filterType ? asset.productType === filterType : true;
    return matchesSearch && matchesType;
  });


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
      // Ekhane status pathate hobe, backend-er sathe mil rekhe status ba requestStatus field check korun
      status: "pending",
      requestStatus: "pending", // Kichu backend-e ei name thake, tai safety-r jonno duitai dilam
      hrEmail: selectedAsset.hrEmail,
      companyName: selectedAsset.companyName,
      productImage: selectedAsset.productImage
    };

    try {
      const res = await axiosSecure.post("/requests", requestInfo);
      if (res.data.insertedId || res.data.requestId) {
        toast.success("Request sent successfully! Status: Pending");
        document.getElementById("request_modal").close();
        setRequestNote("");
        refetch(); // List-ti refresh korar jonno
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    }
  };
  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Request Asset | AssetVerse</title>
      </Helmet>

      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
        Available Assets for Request
      </h2>

      {/* --- Search & Filter Bar --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by asset name..."
            className="input input-bordered w-full"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <select
            className="select select-bordered w-full"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* --- Assets Grid --- */}
      {filteredAssets.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No assets found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
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
                <div className="card-actions mt-4">
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
                </div>
              </div>
            </div>
          ))}
        </div>
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