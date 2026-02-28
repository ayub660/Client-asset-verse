import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaSignOutAlt, FaUserCircle, FaCog, FaHome, FaChevronDown, FaUserPlus, FaBuilding } from "react-icons/fa";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { role } = useRole();
  const { user, logout, theme, toggleTheme } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // ড্রপডাউন স্টেট
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // বাইরের ক্লিকে মেনু বন্ধ করার রেফারেন্স
  const joinRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (joinRef.current && !joinRef.current.contains(event.target)) setIsJoinOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    await logout();
    localStorage.removeItem("access-token");
    navigate("/login");
  };

  const { data: profile = {} } = useQuery({
    queryKey: ["my-profile", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const profileImage = profile?.companyLogo || profile?.photo || user?.photoURL;
  const displayName = profile?.name || user?.displayName || user?.email?.split("@")[0] || "User";

  const baseLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/help", label: "Help" },
  ];

  const getDashboardLinks = () => {
    if (!user) return [];
    const links = [{ to: "/dashboard", label: "Dashboard" }];
    if (role === "hr") links.push({ to: "/dashboard/my-employees", label: "My Employees" });
    if (role === "employee") links.push({ to: "/dashboard/my-team", label: "My Team" });
    return links;
  };

  const dashboardLinks = getDashboardLinks();

  return (
    <div className="sticky top-0 z-[1000] w-full px-2 lg:px-6 pt-2">
      <nav className="navbar bg-base-100/95 backdrop-blur-md shadow-xl rounded-[2rem] px-4 md:px-8 border border-base-200 !overflow-visible">

        {/* START: Logo */}
        <div className="navbar-start">
          <Logo />
        </div>

        {/* CENTER: Navigation */}
        <div className="navbar-center hidden lg:flex !overflow-visible">
          <ul className="menu menu-horizontal gap-1 font-bold items-center">
            {baseLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => `px-3 py-2 rounded-lg transition-all ${isActive ? "bg-indigo-600 text-white shadow-md" : "hover:bg-base-200"}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}

            {user && dashboardLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => `px-3 py-2 rounded-lg transition-all ${isActive ? "bg-indigo-600 text-white shadow-md" : "hover:bg-base-200"}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* --- JOIN US DROPDOWN (Click Based) --- */}
            {!user && (
              <div className="relative" ref={joinRef}>
                <button
                  onClick={() => setIsJoinOpen(!isJoinOpen)}
                  className="px-4 py-2 flex items-center gap-1 cursor-pointer hover:bg-base-200 rounded-lg text-sm font-bold transition-all"
                >
                  Join Us <FaChevronDown className={`text-[10px] transition-transform ${isJoinOpen ? 'rotate-180' : ''}`} />
                </button>
                {isJoinOpen && (
                  <ul className="absolute left-0 mt-3 p-2 shadow-2xl bg-base-100 rounded-xl w-60 border border-base-200 z-[1100] animate-in fade-in slide-in-from-top-2 duration-200">
                    <li>
                      <Link to="/register-hr" onClick={() => setIsJoinOpen(false)} className="flex items-center gap-4 py-3 group rounded-lg hover:bg-base-200">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-all">
                          <FaBuilding className="text-xl" />
                        </div>
                        <span className="font-bold">Join as HR</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/register-employee" onClick={() => setIsJoinOpen(false)} className="flex items-center gap-4 py-3 group rounded-lg hover:bg-base-200">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          <FaUserPlus className="text-xl" />
                        </div>
                        <span className="font-bold">Join as Employee</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </ul>
        </div>

        {/* END: Actions */}
        <div className="navbar-end gap-2 !overflow-visible">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl">
            {theme === "dark" ? <FaSun className="text-orange-400" /> : <FaMoon className="text-indigo-500" />}
          </button>

          {user ? (
            /* --- PROFILE DROPDOWN --- */
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="btn btn-ghost btn-circle avatar online shadow-md border-2 border-indigo-500/20"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <img src={profileImage || "https://i.ibb.co/mJR9Q19/user.png"} alt="profile" />
                </div>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 p-4 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200 z-[1100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 mb-2 border-b border-base-200 text-center">
                    <p className="font-black text-sm truncate">{displayName}</p>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{role}</p>
                  </div>
                  <Link to="/" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 py-3 font-bold hover:text-orange-500 rounded-lg px-3 transition-colors text-sm">
                    <FaHome className="text-orange-500" /> Home Page
                  </Link>
                  <Link to="/dashboard/my-profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 py-3 font-bold hover:text-emerald-600 rounded-lg px-3 transition-colors text-sm">
                    <FaUserCircle className="text-emerald-500" /> My Profile
                  </Link>
                  <Link to="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 py-3 font-bold hover:text-gray-600 rounded-lg px-3 transition-colors text-sm">
                    <FaCog className="text-gray-500" /> Settings
                  </Link>
                  <div className="divider my-1 opacity-50"></div>
                  <button onClick={() => { handleLogOut(); setIsProfileOpen(false); }} className="flex items-center gap-3 py-3 font-black text-red-500 hover:bg-red-50 w-full rounded-lg px-3 text-sm text-left">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-sm">
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;