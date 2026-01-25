import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const HRDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ employees: 0, assets: 0, requests: 0 });

  useEffect(() => {
    // Example: fetch stats from backend
    const fetchStats = async () => {
      const res = await fetch(`http://localhost:3500/hr/stats`, {
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">HR Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded shadow">Employees: {stats.employees}</div>
        <div className="p-4 border rounded shadow">Assets: {stats.assets}</div>
        <div className="p-4 border rounded shadow">Requests: {stats.requests}</div>
      </div>
    </div>
  );
};

export default HRDashboard;
