import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import EmployeeDashboard from "./EmployeeDashboard";
import HRDashboard from "./HRDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }


  if (role === "hr") {
    return <HRDashboard />;
  }


  if (role === "employee") {
    return <EmployeeDashboard />;
  }


  return (
    <div className="p-10 text-center text-error font-semibold">
      Role not identified. Please login again or contact support.
    </div>
  );
};

export default DashboardHome;