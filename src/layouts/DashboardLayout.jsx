import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading/Loading";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import Logo from "../components/Logo/Logo";

import {
  MdAssignmentAdd,
} from "react-icons/md";
import {
  FaListOl,
  FaUsers,
} from "react-icons/fa6";
import { VscGitPullRequestNewChanges, VscRequestChanges } from "react-icons/vsc";
import { AiFillProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiTeamLine } from "react-icons/ri";
import { GiArmorUpgrade } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";

const DashboardLayout = () => {
  const { user, LogOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["my-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleLogOut = () => LogOut();

  // Sidebar menu items based on role
  const menuItems = role === "hr" ? [
    { name: "Asset List", icon: <FaListOl />, link: "/dashboard/asset-list" },
    { name: "Add Asset", icon: <MdAssignmentAdd />, link: "/dashboard/add-asset" },
    { name: "All Requests", icon: <VscGitPullRequestNewChanges />, link: "/dashboard/all-requests" },
    { name: "My Employees", icon: <FaUsers />, link: "/dashboard/my-employees" },
    { name: "Upgrade Package", icon: <GiArmorUpgrade />, link: "/dashboard/upgrade-package-hr" },
  ] : [
    { name: "My Assets", icon: <AiFillProduct />, link: "/dashboard/my-assets" },
    { name: "Request Asset", icon: <VscRequestChanges />, link: "/dashboard/request-asset" },
    { name: "My Team", icon: <RiTeamLine />, link: "/dashboard/my-team" },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        {/* Navbar */}
        <nav className="navbar bg-base-200 shadow-md px-4 md:px-8 lg:px-12">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost lg:hidden"
            aria-label="Open Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-lg hidden md:inline">Dashboard</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/dashboard"
              className="tooltip tooltip-bottom"
              data-tip={profile.name || "User"}
            >
              {profile.companyLogo || profile.photo ? (
                <img
                  src={profile.companyLogo || profile.photo}
                  alt="User"
                  className="w-10 h-10 rounded-full ring-2 ring-primary/30 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                  {profile?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </Link>
          </div>
        </nav>

        {/* Page Outlet */}
        <main className="p-4 md:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-64 flex flex-col justify-between min-h-screen p-4">
          <ul className="menu gap-1">
            <li>
              <NavLink to="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
                </svg>
                Dashboard Home
              </NavLink>
            </li>

            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.link}
                  className="flex items-center gap-3 p-2 rounded hover:bg-primary/10"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}

            <li>
              <NavLink
                to="/dashboard/my-profile"
                className="flex items-center gap-3 p-2 rounded hover:bg-primary/10"
              >
                <CgProfile />
                My Profile
              </NavLink>
            </li>

            <li>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 p-2 rounded hover:bg-red-100 text-red-600"
              >
                <IoLogOut />
                Logout
              </button>
            </li>
          </ul>

          <div className="mt-4 hidden md:block">
            <ThemeToggle />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
