import React from "react";
import useAuth from "../../../hooks/useAuth";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] text-center p-4">
      <div className="max-w-2xl w-full bg-base-100 p-10 rounded-3xl shadow-xl border border-primary/10">
        <div className="mb-6 inline-block p-4 rounded-full bg-primary/10 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-4xl font-extrabold text-primary mb-2 uppercase tracking-tight">
          Welcome Back!
        </h2>
        <h3 className="text-2xl font-bold text-base-content mb-4">
          {user?.displayName || user?.email?.split("@")[0]}
        </h3>

        <div className="divider opacity-50"></div>

        <p className="text-lg text-base-content/70 italic leading-relaxed">
          Manage your assigned assets and team requests efficiently.
          Use the left sidebar menu to navigate through your dashboard.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <div className="badge badge-primary badge-outline p-4 font-bold">Role: Employee</div>
          <div className="badge badge-success badge-outline p-4 font-bold">Status: Active</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;