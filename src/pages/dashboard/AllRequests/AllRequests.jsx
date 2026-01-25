import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all HR requests
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["hr-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/asset-requests/hr"); // backend route
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Approve request
  const handleApprove = async (id) => {
    try {
      await axiosSecure.post(`/requests/${id}/approve`);
      toast.success("Request approved");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Approve failed");
    }
  };

  // Reject request
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/requests/${id}/reject`);
      toast.success("Request rejected");
      queryClient.invalidateQueries(["hr-requests"]);
    } catch (err) {
      console.log(err);
      toast.error("Reject failed");
    }
  };

  // Delete request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this request?")) return;

    try {
      await axiosSecure.delete(`/requests/${id}`);
      toast.success("Request deleted");
      queryClient.invalidateQueries(["hr-requests"]);
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Asset Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Asset</th>
                <th>Employee</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <th>{index + 1}</th>
                  <td className="flex items-center gap-2">
                    {req.assetImage && (
                      <img
                        src={req.assetImage}
                        alt={req.assetName}
                        className="h-12 w-12 rounded-lg"
                      />
                    )}
                    <span>{req.assetName}</span>
                  </td>
                  <td>{req.requesterEmail}</td>
                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td>
                    {req.requestStatus === "pending" && (
                      <span className="badge badge-warning">Pending</span>
                    )}
                    {req.requestStatus === "approved" && (
                      <span className="badge badge-success">Approved</span>
                    )}
                    {req.requestStatus === "rejected" && (
                      <span className="badge badge-error">Rejected</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    {req.requestStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(req._id)}
                          className="btn btn-xs btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-xs btn-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRequests;
