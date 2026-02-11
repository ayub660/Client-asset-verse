import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import EmployeeDashboard from "./EmployeeDashboard";
// import HRDashboard from "./HRDashboard"; // যদি HRDashboard বানানো থাকে তবে এটি আনকমেন্ট করুন

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  // রোল অনুযায়ী সঠিক ড্যাশবোর্ড কন্টেন্ট রিটার্ন করা
  if (role === "hr") {
    // return <HRDashboard />; 
    return (
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold">Welcome HR Manager</h2>
        <p>Use the sidebar to manage company assets.</p>
      </div>
    );
  }

  if (role === "employee") {
    return <EmployeeDashboard />;
  }

  return (
    <div className="p-10 text-center text-error">
      Role not identified. Please contact support.
    </div>
  );
};

export default DashboardHome;