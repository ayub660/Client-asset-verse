import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch profile data - এখান থেকেই আমরা packageLimit এবং currentEmployees পাবো
  const { data: profile = {}, isLoading, refetch } = useQuery({
    queryKey: ["my-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Fetch total assets (for HR)
  const { data: totalAssets = [], isLoading: assetsLoading } = useQuery({
    queryKey: ["totalAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dateOfBirth = e.target.dateOfBirth.value;
    const imageUrl = e.target.imageUrl.value;

    const updateInfo = { name, dateOfBirth };

    if (profile.role === "hr") {
      updateInfo.companyLogo = imageUrl;
    } else {
      updateInfo.photo = imageUrl;
    }

    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, updateInfo);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Profile updated successfully!", "success");
        document.getElementById("edit_profile_modal").close();
        refetch();
      }
    } catch (err) {
      Swal.fire("Error!", "Update failed", "error");
    }
  };

  if (isLoading || assetsLoading) return <Loading />;

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-base-200 py-10">
      <div className="w-full max-w-6xl bg-base-100 rounded-2xl shadow-xl p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* প্রোফাইল ইমেজ সেকশন */}
          <div className="flex flex-col items-center">
            <img
              src={profile.role === "hr" ? profile.companyLogo : (profile.photo || "https://i.ibb.co/PNG-placeholder.png")}
              alt="Profile"
              className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full border-4 border-primary shadow-2xl mb-4"
              onError={(e) => { e.target.src = "https://i.ibb.co/PNG-placeholder.png" }}
            />
            <div className="flex flex-col items-center gap-2">
              <span className="badge badge-primary p-3 uppercase font-bold">{profile.role}</span>
              {profile.role === "hr" && (
                <span className="badge badge-outline badge-success font-bold uppercase">
                  Plan: {profile.packageName || "Basic"}
                </span>
              )}
            </div>
          </div>

          <div className="card-body p-0">
            <h1 className="text-3xl font-bold mb-6 text-primary">{profile.name}</h1>

            <div className="space-y-4 text-sm sm:text-base">
              <InfoRow label="Email" value={profile.email} />
              {profile.role === "hr" && <InfoRow label="Company" value={profile.companyName} />}
              <InfoRow label="Date of Birth" value={profile.dateOfBirth || "Not Set"} />
              <InfoRow label="Joined On" value={new Date(profile.createdAt).toLocaleDateString()} />

              {/* ✅ মেম্বার লিমিট এবং স্ট্যাটাস সেকশন (শুধুমাত্র HR-এর জন্য) */}
              {profile.role === "hr" ? (
                <>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm mt-4">
                    <h3 className="text-blue-800 font-bold mb-2">Subscription & Limits</h3>
                    <div className="space-y-2">
                      <InfoRow label="Employees Limit" value={`${profile.currentEmployees || 0} / ${profile.packageLimit || 5}`} to="/dashboard/my-employees" />
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${Math.min(((profile.currentEmployees || 0) / (profile.packageLimit || 5)) * 100, 100)}%` }}>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-right mt-1">
                        {(profile.packageLimit || 5) - (profile.currentEmployees || 0)} slots remaining
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <InfoRow label="Assigned Assets" value={profile.assets?.length || 0} to="/dashboard/my-assetes" />
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById("edit_profile_modal").showModal()}
                className="btn btn-primary flex-1 sm:flex-none"
              >
                Update Profile & Picture
              </button>

              {profile.role === "hr" && (
                <Link to="/dashboard/upgrade-package-hr" className="btn btn-outline btn-secondary flex-1 sm:flex-none">
                  Upgrade Plan
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      <dialog id="edit_profile_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-primary mb-6 text-center">Update Information</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Full Name</label>
              <input name="name" defaultValue={profile.name} className="input input-bordered w-full" required />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Date of Birth</label>
              <input name="dateOfBirth" type="date" defaultValue={profile.dateOfBirth} className="input input-bordered w-full" required />
            </div>

            <div className="form-control">
              <label className="label font-semibold">{profile.role === "hr" ? "Company Logo URL" : "Profile Photo URL"}</label>
              <input
                name="imageUrl"
                defaultValue={profile.role === "hr" ? profile.companyLogo : profile.photo}
                className="input input-bordered w-full"
                placeholder="Paste Image URL here"
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary px-8">Save Changes</button>
              <button type="button" className="btn" onClick={() => document.getElementById("edit_profile_modal").close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

const InfoRow = ({ label, value, to }) => {
  const content = (
    <div className={`flex justify-between items-center border-b pb-2 ${to ? 'hover:text-primary transition-colors cursor-pointer' : ''}`}>
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
};

export default MyProfile;