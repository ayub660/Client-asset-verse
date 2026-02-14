import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: hrProfile, refetch: refetchProfile } = useQuery({
    queryKey: ['hr-profile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/check-hr/${user?.email}`);
      return res.data;
    }
  });

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["hr-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/asset-requests/hr");
      return res.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
    },
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.post(`/requests/${id}/approve`);
      if (res.data.success) {
        Swal.fire({
          title: "Approved!",
          text: "Asset request has been approved.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["hr-requests"]);
        refetch();
        refetchProfile();
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Approve failed";

      // যদি লিমিট শেষ হয়ে যাওয়ার এরর আসে
      if (msg.toLowerCase().includes("limit")) {
        Swal.fire({
          title: "<strong>Limit Reached!</strong>",
          icon: "warning",
          html: `Your employee limit is over. Please <b>Upgrade</b> your package to approve more members.`,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: "Upgrade Now",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "Cancel",       // cancell button
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            // User ke upgrade packagre e niye jabe
            navigate("/dashboard/upgrade-package-hr");
          }
        });
      } else {
        Swal.fire("Error!", msg, "error");
      }
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/requests/${id}/reject`);
      toast.success("Request rejected");
      refetch();
    } catch (err) { toast.error("Reject failed"); }
  };

  const handleDelete = async (id) => {
    Swal.fire({ title: "Are you sure?", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Delete" }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/requests/${id}`);
          if (res.data.deletedCount > 0) {
            toast.success("Deleted");
            queryClient.invalidateQueries(["hr-requests", "hr-profile"]);
            refetch();
          }
        } catch (err) { toast.error("Error"); }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-3 sm:p-6 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">
          Asset Requests ({requests.length})
        </h2>

        {/* Limit Status Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-gray-500 text-sm">Member Limit Status</p>
            <p className="font-bold text-lg">{hrProfile?.currentEmployees || 0} / {hrProfile?.packageLimit || 0}</p>
          </div>
          <progress className="progress progress-primary w-full sm:w-64" value={hrProfile?.currentEmployees || 0} max={hrProfile?.packageLimit || 1}></progress>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl">No requests.</div>
        ) : (
          <>
            {/* Desktop Table - Hidden on Mobile */}
            <div className="hidden lg:block overflow-hidden bg-white rounded-xl shadow-sm border">
              <table className="table w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th>Asset</th>
                    <th>Requester</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.assetName}</td>
                      <td>{req.requesterEmail}</td>
                      <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                      <td><span className="badge badge-ghost uppercase font-bold text-xs">{req.requestStatus}</span></td>
                      <td className="flex justify-center gap-2">
                        {req.requestStatus === "pending" && (
                          <>
                            <button onClick={() => handleApprove(req._id)} className="btn btn-xs btn-success text-white">Approve</button>
                            <button onClick={() => handleReject(req._id)} className="btn btn-xs btn-error text-white">Reject</button>
                          </>
                        )}
                        <button onClick={() => handleDelete(req._id)} className="btn btn-xs btn-ghost text-error">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List View - Hidden on Desktop */}
            <div className="lg:hidden space-y-4">
              {currentRequests.map((req) => (
                <div key={req._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-primary">{req.assetName}</h4>
                      <p className="text-xs text-gray-500">{new Date(req.requestDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`badge badge-sm font-bold uppercase ${req.requestStatus === 'pending' ? 'badge-warning' : 'badge-success text-white'}`}>
                      {req.requestStatus}
                    </span>
                  </div>
                  <div className="text-sm mb-4">
                    <p><strong>By:</strong> {req.requesterName}</p>
                    <p className="text-gray-500 text-xs truncate">{req.requesterEmail}</p>
                  </div>
                  <div className="flex gap-2">
                    {req.requestStatus === "pending" ? (
                      <>
                        <button onClick={() => handleApprove(req._id)} className="btn btn-sm btn-success flex-1 text-white">Approve</button>
                        <button onClick={() => handleReject(req._id)} className="btn btn-sm btn-error flex-1 text-white">Reject</button>
                      </>
                    ) : null}
                    <button onClick={() => handleDelete(req._id)} className="btn btn-sm btn-ghost text-error border border-error/20 px-4">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="join">
              {[...Array(totalPages).keys()].map((num) => (
                <button key={num} onClick={() => setCurrentPage(num + 1)} className={`join-item btn btn-sm ${currentPage === num + 1 ? "btn-primary" : "btn-ghost"}`}>
                  {num + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;