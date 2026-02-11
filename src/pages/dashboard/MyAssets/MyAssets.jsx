import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

import Pagination from "../../../components/common/Pagination"
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const MyAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterType, setFilterType] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;

    const { data: requestData = { requests: [], total: 0 }, isLoading, refetch } = useQuery({
        queryKey: ["my-assets", user?.email, searchText, filterStatus, filterType, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-requests?email=${user?.email}&search=${searchText}&status=${filterStatus}&type=${filterType}&limit=${limit}&skip=${currentPage * limit}`
            );
            return res.data;
        },
    });

    const requests = requestData.requests || [];
    const totalPages = Math.ceil((requestData.total || 0) / limit);

    // ১. রিকোয়েস্ট ক্যানসেল করা
    const handleCancel = async (id) => {
        if (!window.confirm("আপনি কি নিশ্চিত যে এটি ক্যানসেল করতে চান?")) return;
        try {
            const res = await axiosSecure.delete(`/requests/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("সফলভাবে ক্যানসেল করা হয়েছে!");
                refetch();
            }
        } catch (err) {
            toast.error("ক্যানসেল করা যায়নি।");
        }
    };

    // ২. অ্যাসেট রিটার্ন করা
    const handleReturn = async (id) => {
        try {
            const res = await axiosSecure.patch(`/requests/return/${id}`);
            if (res.data.modifiedCount > 0) {
                toast.success("অ্যাসেটটি রিটার্ন করা হয়েছে!");
                refetch();
            }
        } catch (err) {
            toast.error("রিটার্ন প্রসেস ব্যর্থ হয়েছে।");
        }
    };

    // ৩. পিডিএফ জেনারেট করা (অ্যাসাইনমেন্টের বোনাস/মাস্ট কাজ)
    const generatePDF = (req) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Asset Trust - Asset Receipt", 14, 22);

        doc.setFontSize(11);
        doc.text(`Company: ${req.companyName || "AssetVerse"}`, 14, 32);
        doc.text(`Employee Name: ${user?.displayName}`, 14, 38);
        doc.text(`Print Date: ${new Date().toLocaleDateString()}`, 14, 44);

        autoTable(doc, {
            startY: 50,
            head: [['Field', 'Details']],
            body: [
                ['Asset Name', req.assetName],
                ['Asset Type', req.assetType],
                ['Request Date', new Date(req.requestDate).toLocaleDateString()],
                ['Approval Date', req.approvalDate ? new Date(req.approvalDate).toLocaleDateString() : 'N/A'],
                ['Status', req.status],
            ],
        });

        doc.text("Note: This is a computer-generated document.", 14, doc.lastAutoTable.finalY + 10);
        doc.save(`${req.assetName}_receipt.pdf`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">আমার রিকোয়েস্ট করা অ্যাসেটসমূহ</h2>

            {/* ফিল্টার সেকশন */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="নাম দিয়ে সার্চ..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <select className="select select-bordered" onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="">সব স্ট্যাটাস</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full shadow-md border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>নাম</th>
                            <th>টাইপ</th>
                            <th>স্ট্যাটাস</th>
                            <th>অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td>{req.assetName}</td>
                                <td>{req.assetType}</td>
                                <td>
                                    <span className={`badge ${req.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {req.status === 'pending' && (
                                        <button onClick={() => handleCancel(req._id)} className="btn btn-error btn-xs text-white">Cancel</button>
                                    )}
                                    {req.status === 'approved' && (
                                        <button onClick={() => generatePDF(req)} className="btn btn-neutral btn-xs">Print PDF</button>
                                    )}
                                    {req.status === 'approved' && req.assetType === 'Returnable' && (
                                        <button
                                            disabled={req.isReturned}
                                            onClick={() => handleReturn(req._id)}
                                            className="btn btn-primary btn-xs"
                                        >
                                            {req.isReturned ? "Returned" : "Return"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default MyAssets;