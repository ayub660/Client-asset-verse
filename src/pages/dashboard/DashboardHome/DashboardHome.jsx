import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import EmployeeDashboard from "./EmployeeDashboard";
import HRDashboard from "./HRDashboard"; // আমি এটি ইমপোর্ট করে দিয়েছি

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  // ১. যদি ইউজার HR হয় তবে সরাসরি চার্ট ও স্ট্যাটাস কার্ডওয়ালা ড্যাশবোর্ড দেখাবে
  if (role === "hr") {
    return <HRDashboard />;
  }

  // ২. যদি ইউজার Employee হয়
  if (role === "employee") {
    return <EmployeeDashboard />;
  }

  // ৩. কোনো রোল না পাওয়া গেলে
  return (
    <div className="p-10 text-center text-error font-semibold">
      Role not identified. Please login again or contact support.
    </div>
  );
};

export default DashboardHome;