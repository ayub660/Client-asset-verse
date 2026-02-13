import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all HR requests
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["hr-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/asset-requests/hr");
      // Newest requests first (Sorting)
      return res.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
    },
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  // Approve request
  const handleApprove = async (id) => {
    try {
      // Backend should check stock and decrement quantity
      const res = await axiosSecure.post(`/requests/${id}/approve`);
      if (res.data) {
        toast.success("Request approved and stock updated!");
        queryClient.invalidateQueries(["hr-requests"]);
        queryClient.invalidateQueries(["assets"]); // Refresh asset list stock
        refetch();
      }
    } catch (err) {
      // Handles the 400 Bad Request / No Stock error
      const msg = err.response?.data?.message || "Approve failed";
      toast.error(msg);
      console.error("Approve Error:", err);
    }
  };

  // Reject request
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/requests/${id}/reject`);
      toast.success("Request rejected");
      queryClient.invalidateQueries(["hr-requests"]);
      refetch();
    } catch (err) {
      toast.error("Reject failed");
    }
  };

  // Delete request
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/requests/${id}`);
          toast.success("Deleted successfully");
          queryClient.invalidateQueries(["hr-requests"]);
          refetch();
        } catch (err) {
          toast.error("Delete failed");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Manage All Asset Requests ({requests.length})
        </h2>

        {requests.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium">No requests found at the moment.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Asset Info</th>
                  <th>Requester</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((req, index) => (
                  <tr key={req._id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 bg-gray-200">
                            {/* Handled potential placeholder DNS error */}
                            <img
                              src={req.assetImage || "https://placehold.co/100x100?text=Asset"}
                              alt={req.assetName}
                              onError={(e) => { e.target.src = "https://placehold.co/100x100?text=No+Image" }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{req.assetName}</div>
                          <div className="text-xs badge badge-ghost">{req.assetType || "Product"}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm font-medium">{req.requesterName || "Employee"}</div>
                      <div className="text-xs opacity-60">{req.requesterEmail}</div>
                    </td>
                    <td className="text-sm">{new Date(req.requestDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge badge-sm font-bold p-3 uppercase ${req.requestStatus === "pending" ? "badge-warning" :
                          req.requestStatus === "approved" ? "badge-success text-white" : "badge-error text-white"
                        }`}>
                        {req.requestStatus}
                      </span>
                    </td>
                    <td className="flex gap-2 justify-center">
                      {req.requestStatus === "pending" ? (
                        <>
                          <button onClick={() => handleApprove(req._id)} className="btn btn-xs btn-success text-white px-3">Approve</button>
                          <button onClick={() => handleReject(req._id)} className="btn btn-xs btn-error text-white px-3">Reject</button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No Actions</span>
                      )}
                      <button onClick={() => handleDelete(req._id)} className="btn btn-xs btn-ghost text-error ml-2" title="Delete Request">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Improved Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="join border border-primary/20">
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setCurrentPage(num + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
                  }}
                  className={`join-item btn btn-sm px-4 ${currentPage === num + 1 ? "btn-primary text-white" : "btn-ghost"}`}
                >
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