import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import MyAssets from "../MyAssets/MyAssets";
import RequestAnAsset from "../RequestAnAsset/RequestAnAsset";
import MyProfile from "../MyProfile/MyProfile";
import MyTeam from "../MyTeam/MyTeam";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("home"); // home, myAssets, requestAsset, myTeam, myProfile

  const renderContent = () => {
    switch (activeTab) {
      case "myAssets":
        return <MyAssets />;
      case "requestAsset":
        return <RequestAnAsset />;
      case "myTeam":
        return <MyTeam />;
      case "myProfile":
        return <MyProfile />;
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Employee Dashboard</h2>
            <p>Welcome, {user.name || user.email}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-60 bg-base-200 p-4 rounded-lg space-y-3">
        <button
          className={`btn w-full ${activeTab === "home" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("home")}
        >
          Dashboard Home
        </button>
        <button
          className={`btn w-full ${activeTab === "myAssets" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("myAssets")}
        >
          My Assets
        </button>
        <button
          className={`btn w-full ${activeTab === "requestAsset" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("requestAsset")}
        >
          Request An Asset
        </button>
        <button
          className={`btn w-full ${activeTab === "myTeam" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("myTeam")}
        >
          My Team
        </button>
        <button
          className={`btn w-full ${activeTab === "myProfile" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("myProfile")}
        >
          My Profile
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default EmployeeDashboard;
