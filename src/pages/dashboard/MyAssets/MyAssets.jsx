import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const MyAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // --- Filter & Search States ---
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ["my-assets-requests", user?.email],
        queryFn: async () => {

            const res = await axiosSecure.get("/asset-requests/employee");
            return res.data;
        },
    });


    const filteredRequests = requests.filter((req) => {
        const assetName = (req.assetName || req.productName || "").toLowerCase();
        const matchesSearch = assetName.includes(search.toLowerCase());

        const currentStatus = req.status || req.requestStatus;
        const matchesStatus = statusFilter ? currentStatus === statusFilter : true;

        const currentType = req.assetType || req.productType;
        const matchesType = typeFilter ? currentType === typeFilter : true;

        return matchesSearch && matchesStatus && matchesType;
    });


    const handleCancelRequest = async (id) => {
        try {
            const res = await axiosSecure.delete(`/requests/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Request cancelled successfully!");
                refetch();
            }
        } catch (err) {
            toast.error("Failed to cancel request.");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            <Helmet><title>My Assets | AssetVerse</title></Helmet>

            <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                    My Requested Assets
                </h2>

                {/* --- Search and Filter Bar (বড় ডিজাইনের) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="form-control">
                        <label className="label font-bold text-gray-600">Search Assets</label>
                        <input
                            type="text"
                            placeholder="Type asset name..."
                            className="input input-bordered w-full focus:ring-2 ring-primary/20"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-gray-600">Filter by Status</label>
                        <select
                            className="select select-bordered w-full"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-gray-600">Asset Type</label>
                        <select
                            className="select select-bordered w-full"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="Returnable">Returnable</option>
                            <option value="Non-returnable">Non-returnable</option>
                        </select>
                    </div>
                </div>

                {/* --- Table Section --- */}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="table w-full">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-4">Asset Name</th>
                                <th>Type</th>
                                <th>HR Contact</th>
                                <th>Request Date</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((req) => {
                                    const currentStatus = req.status || req.requestStatus;
                                    const currentType = req.assetType || req.productType;

                                    return (
                                        <tr key={req._id} className="hover:bg-gray-50 transition-all">
                                            <td className="font-bold text-gray-800">
                                                {req.assetName || req.productName}
                                            </td>
                                            <td>
                                                <span className="badge badge-ghost font-medium">
                                                    {currentType}
                                                </span>
                                            </td>
                                            <td className="text-blue-600 font-medium">
                                                {req.hrEmail || "Company HR"}
                                            </td>
                                            <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`badge ${req.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                                    {req.status || req.requestStatus || "pending"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="flex justify-center gap-2">

                                                    {currentStatus === "pending" && (
                                                        <button
                                                            onClick={() => handleCancelRequest(req._id)}
                                                            className="btn btn-xs btn-error text-white px-4"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}


                                                    {currentStatus === "approved" && currentType === "Returnable" && (
                                                        <button className="btn btn-xs btn-primary px-4">
                                                            Return
                                                        </button>
                                                    )}


                                                    {(currentStatus === "rejected" || (currentStatus === "approved" && currentType === "Non-returnable")) && (
                                                        <span className="text-xs text-gray-400 italic">Processed</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-20 text-gray-400 italic font-medium">
                                        No assets matching your request found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyAssets;