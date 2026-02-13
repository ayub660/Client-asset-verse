import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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

    // --- PDF Print Function ---
    const handlePrintPDF = (req) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Asset Request Report", 14, 20);

        doc.setFontSize(10);
        doc.text(`Company: AssetVerse`, 14, 28);
        doc.text(`Employee: ${user?.displayName || user?.email}`, 14, 34);
        doc.text(`Date: ${new Date().toLocaleString()}`, 14, 40);

        const tableColumn = ["Field", "Details"];
        const tableRows = [
            ["Asset Name", req.assetName || req.productName],
            ["Asset Type", req.assetType || req.productType],
            ["HR Email", req.hrEmail || "Company HR"],
            ["Request Date", new Date(req.requestDate).toLocaleDateString()],
            ["Status", req.status || req.requestStatus || "pending"],
        ];

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 45,
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] }, // Indigo color
        });

        doc.save(`Asset_Report_${req._id}.pdf`);
        toast.success("PDF generated successfully!");
    };

    const handleCancelRequest = async (id) => {
        try {
            const res = await axiosSecure.delete(`/requests/${id}`);
            // ব্যাকএন্ডে ডুপ্লিকেট রুট রিমুভ করার পর এটি পারফেক্টলি কাজ করবে
            if (res.data.deletedCount > 0 || res.status === 200) {
                toast.success("Request cancelled successfully!");
                refetch();
            }
        } catch (err) {
            toast.error("Failed to cancel request.");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-10 bg-gray-50 min-h-screen font-sans">
            <Helmet><title>My Assets | AssetVerse</title></Helmet>

            <div className="max-w-7xl mx-auto bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-gray-800">
                    My Requested Assets
                </h2>

                {/* --- Search and Filter Bar (Responsive Grid) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    <div className="form-control">
                        <label className="label text-sm font-bold text-gray-600">Search Assets</label>
                        <input
                            type="text"
                            placeholder="Asset name..."
                            className="input input-bordered w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label text-sm font-bold text-gray-600">Filter Status</label>
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

                    <div className="form-control sm:col-span-2 lg:col-span-1">
                        <label className="label text-sm font-bold text-gray-600">Asset Type</label>
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

                {/* --- Responsive Table Section --- */}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="table w-full">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-4">Asset Name</th>
                                <th className="hidden md:table-cell">Type</th>
                                <th className="hidden lg:table-cell">HR Email</th>
                                <th className="hidden sm:table-cell">Date</th>
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
                                        <tr key={req._id} className="hover:bg-gray-50 transition-all border-b">
                                            <td className="font-bold text-gray-800">
                                                {req.assetName || req.productName}
                                                {/* মোবাইল ভিউতে ছোট করে টাইপ দেখাবে */}
                                                <div className="md:hidden text-[10px] font-normal text-gray-500 uppercase">
                                                    {currentType}
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <span className="badge badge-ghost badge-sm">{currentType}</span>
                                            </td>
                                            <td className="hidden lg:table-cell text-sm text-blue-600">
                                                {req.hrEmail}
                                            </td>
                                            <td className="hidden sm:table-cell text-sm">
                                                {new Date(req.requestDate).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <span className={`badge badge-xs md:badge-sm ${currentStatus === 'approved' ? 'badge-success' :
                                                        currentStatus === 'rejected' ? 'badge-error' : 'badge-warning'
                                                    }`}>
                                                    {currentStatus || "pending"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {currentStatus === "pending" && (
                                                        <button
                                                            onClick={() => handleCancelRequest(req._id)}
                                                            className="btn btn-xs btn-error text-white lowercase"
                                                        >
                                                            cancel
                                                        </button>
                                                    )}

                                                    {currentStatus === "approved" && (
                                                        <button
                                                            onClick={() => handlePrintPDF(req)}
                                                            className="btn btn-xs btn-info text-white"
                                                        >
                                                            PDF
                                                        </button>
                                                    )}

                                                    {currentStatus === "approved" && currentType === "Returnable" && (
                                                        <button className="btn btn-xs btn-primary">
                                                            Return
                                                        </button>
                                                    )}

                                                    {(currentStatus === "rejected" || (currentStatus === "approved" && currentType === "Non-returnable")) && (
                                                        <span className="text-[10px] text-gray-400 italic">Done</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-20 text-gray-400 italic">
                                        No assets found.
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