import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaSignOutAlt, FaUserCircle, FaHome, FaChevronDown, FaUserPlus, FaBuilding, FaBars, FaTimes } from "react-icons/fa";
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


  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


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
    setIsMobileMenuOpen(false);
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

        {/* START: Mobile Toggle & Logo */}
        <div className="navbar-start gap-1">
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-xs btn-circle text-lg"
            >
              {isMobileMenuOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
            </button>
          </div>
          <div className="scale-90 md:scale-100">
            <Logo />
          </div>
        </div>

        {/* CENTER: Desktop Nav */}
        <div className="navbar-center hidden lg:flex !overflow-visible">
          <ul className="menu menu-horizontal gap-1 font-bold items-center text-sm">
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
            {!user && (
              <div className="relative" ref={joinRef}>
                <button onClick={() => setIsJoinOpen(!isJoinOpen)} className="px-4 py-2 flex items-center gap-1 cursor-pointer hover:bg-base-200 rounded-lg text-sm font-bold transition-all">
                  Join Us <FaChevronDown className={`text-[10px] transition-transform ${isJoinOpen ? 'rotate-180' : ''}`} />
                </button>
                {isJoinOpen && (
                  <ul className="absolute left-0 mt-3 p-2 shadow-2xl bg-base-100 rounded-xl w-52 border border-base-200 z-[1100]">
                    <li><Link to="/register-hr" onClick={() => setIsJoinOpen(false)} className="flex items-center gap-3 py-2 px-3 group rounded-lg hover:bg-base-200 font-bold text-xs"><FaBuilding className="text-orange-500" /> Join as HR</Link></li>
                    <li><Link to="/register-employee" onClick={() => setIsJoinOpen(false)} className="flex items-center gap-3 py-2 px-3 group rounded-lg hover:bg-base-200 font-bold text-xs"><FaUserPlus className="text-emerald-500" /> Join as Employee</Link></li>
                  </ul>
                )}
              </div>
            )}
          </ul>
        </div>

        {/* END: Actions */}
        <div className="navbar-end gap-1 !overflow-visible">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm sm:btn-md">
            {theme === "dark" ? <FaSun className="text-orange-400 text-sm md:text-xl" /> : <FaMoon className="text-indigo-500 text-sm md:text-xl" />}
          </button>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="btn btn-ghost btn-circle avatar online shadow-sm border border-indigo-500/10">
                <div className="w-8 md:w-10 rounded-full"><img src={profileImage || "https://i.ibb.co/mJR9Q19/user.png"} alt="profile" /></div>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 p-3 shadow-2xl bg-base-100 rounded-2xl w-56 border border-base-200 z-[1100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 mb-2 border-b border-base-200 text-center">
                    <p className="font-bold text-xs truncate">{displayName}</p>
                    <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">{role}</p>
                  </div>
                  <Link to="/" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 py-2 font-bold hover:text-orange-500 rounded-lg px-2 transition-colors text-xs"><FaHome className="text-orange-500" /> Home Page</Link>
                  <Link to="/dashboard/my-profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 py-2 font-bold hover:text-emerald-600 rounded-lg px-2 transition-colors text-xs"><FaUserCircle className="text-emerald-500" /> My Profile</Link>
                  <div className="divider my-1 opacity-50"></div>
                  <button onClick={() => { handleLogOut(); setIsProfileOpen(false); }} className="flex items-center gap-3 py-2 font-bold text-red-500 hover:bg-red-50 w-full rounded-lg px-2 text-xs text-left"><FaSignOutAlt /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-lg text-[10px] md:text-sm uppercase transition-all">Login</Link>
          )}
        </div>
      </nav>

      {/* --- MOBILE MENU DRAWER (Small Text Fix) --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-4 right-4 bg-base-100 shadow-2xl rounded-2xl border border-base-200 p-3 z-[999] animate-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col gap-0.5">
            {[...baseLinks, ...dashboardLinks].map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block px-4 py-2 text-xs font-bold rounded-lg ${isActive ? "bg-indigo-600 text-white" : "hover:bg-base-200"}`}>{link.label}</NavLink>
              </li>
            ))}
            {!user && (
              <div className="mt-2 pt-2 border-t border-base-200 flex flex-col gap-1.5">
                <Link to="/register-hr" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 bg-orange-50 rounded-lg text-orange-700 text-[11px] font-bold"><FaBuilding className="text-xs" /> Join as HR</Link>
                <Link to="/register-employee" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-lg text-emerald-700 text-[11px] font-bold"><FaUserPlus className="text-xs" /> Join as Employee</Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;