import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading/Loading";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import Logo from "../components/Logo/Logo";

import { MdAssignmentAdd } from "react-icons/md";
import { FaListOl, FaUsers, FaBars, FaHome, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { VscGitPullRequestNewChanges, VscRequestChanges } from "react-icons/vsc";
import { AiFillProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiTeamLine } from "react-icons/ri";
import { GiArmorUpgrade } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["my-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleLogOut = async () => {
    await logout();
    localStorage.removeItem("access-token");
    navigate("/login");
  };

  const profileImage = profile.companyLogo || profile.photo || user?.photoURL;
  const displayName = profile.name || user?.displayName || "User";

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

      <div className="drawer-content flex flex-col min-h-screen bg-base-100 !overflow-visible">

        {/* --- TOP NAVBAR --- */}
        <nav className="navbar bg-base-100/80 backdrop-blur-md shadow-sm px-6 md:px-10 pt-4 pb-2 sticky top-0 z-[1000] border-b border-base-200">
          <div className="navbar-start gap-2">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost lg:hidden">
              <FaBars className="text-2xl md:text-3xl text-indigo-600" />
            </label>

            <div className="flex items-center gap-3">
              <div className="p-1 bg-base-200 rounded-xl shadow-inner scale-95">
                <Logo />
              </div>
              <span className="font-black text-xl text-indigo-600 italic tracking-tighter hidden md:inline uppercase">
                Dashboard Panel
              </span>
            </div>
          </div>

          <div className="navbar-end flex items-center gap-4 !overflow-visible">
            <ThemeToggle />
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="btn btn-ghost btn-circle avatar online border border-indigo-500/10 shadow-sm"
              >
                <div className="w-10 rounded-full ring ring-indigo-500 ring-offset-base-100 ring-offset-2">
                  <img src={profileImage || "https://i.ibb.co/mJR9Q19/user.png"} alt="User" />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-6 p-3 shadow-2xl bg-base-100 rounded-2xl w-60 border border-base-200 z-[1100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 mb-2 border-b border-base-200 text-center">
                    <p className="font-bold text-xs truncate">{displayName}</p>
                    <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">{role} Panel</p>
                  </div>
                  <Link to="/" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 py-2.5 font-bold hover:text-orange-500 rounded-lg px-2 transition-colors text-xs">
                    <FaHome className="text-orange-500 text-sm" /> Home Page
                  </Link>
                  <Link to="/dashboard/my-profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 py-2.5 font-bold hover:text-emerald-600 rounded-lg px-2 transition-colors text-xs">
                    <FaUserCircle className="text-emerald-500 text-sm" /> My Profile
                  </Link>
                  <div className="divider my-1 opacity-50"></div>
                  <button onClick={() => { handleLogOut(); setIsProfileOpen(false); }} className="flex items-center gap-3 py-2.5 font-bold text-red-500 hover:bg-red-50 w-full rounded-lg px-2 text-xs text-left">
                    <FaSignOutAlt className="text-sm" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <main className="p-4 md:p-6 lg:p-8 flex-1 !overflow-visible">
          <Outlet />
        </main>
      </div>

      {/* --- SIDEBAR (Width: w-64, Font: text-sm) --- */}
      <div className="drawer-side z-[2000]">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-64 flex flex-col justify-between min-h-screen p-4 border-r border-base-300">
          <div>
            <div className="mt-4 mb-8 px-4 text-center">
              <h2 className="text-xl font-black text-indigo-600 tracking-tighter uppercase italic">AssetVerse</h2>
            </div>

            <ul className="menu gap-1 p-0">
              <li>
                <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center gap-3 p-3 text-sm font-bold rounded-xl transition-all ${isActive ? "bg-indigo-600 text-white shadow-md" : "hover:bg-indigo-100"}`}>
                  <FaHome className="text-lg" /> Dashboard Home
                </NavLink>
              </li>

              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => `flex items-center gap-3 p-3 text-sm font-bold rounded-xl transition-all ${isActive ? "bg-indigo-600 text-white shadow-md" : "hover:bg-indigo-100"}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}

              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className={({ isActive }) => `flex items-center gap-3 p-3 text-sm font-bold rounded-xl transition-all ${isActive ? "bg-indigo-600 text-white shadow-md" : "hover:bg-indigo-100"}`}>
                  <CgProfile className="text-lg" /> My Profile
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="mt-auto pt-4 border-t border-base-300">
            <button
              onClick={handleLogOut}
              className="flex items-center gap-3 p-3 w-full text-sm font-bold rounded-xl text-red-500 hover:bg-red-50 transition-all"
            >
              <IoLogOut className="text-xl" /> Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;