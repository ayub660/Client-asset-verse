import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { role, roleLoading } = useRole();
  const { user, LogOut, theme, toggleTheme } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {} } = useQuery({
    queryKey: ["my-profile", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
      } catch (err) {
        return {};
      }
    },
    retry: false,
  });

  const profileImage = profile?.companyLogo || profile?.photo || user?.photoURL;

  // Indigo Theme Classes
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
      ? "bg-indigo-50 text-[#6366f1] shadow-sm font-bold underline underline-offset-4"
      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 hover:text-[#6366f1]"
    }`;

  const buttonClass =
    "px-4 py-2 bg-[#6366f1] text-white text-[12px] md:text-sm font-bold rounded-xl shadow-md hover:bg-[#4f46e5] active:scale-95 transition-all duration-200 flex items-center justify-center whitespace-nowrap";

  const navLinks = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>

      {!user && (
        <>
          <li>
            <NavLink to="/register-hr" className={buttonClass}>
              Join as HR
            </NavLink>
          </li>
          <li>
            <NavLink to="/register-employee" className={buttonClass}>
              Join as Employee
            </NavLink>
          </li>
        </>
      )}

      {user && <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>}

      {role === "hr" && (
        <>
          <li><NavLink to="/dashboard/asset-list" className={navLinkClass}>Asset List</NavLink></li>
          <li><NavLink to="/dashboard/add-asset" className={navLinkClass}>Add Asset</NavLink></li>
          <li><NavLink to="/dashboard/all-requests" className={navLinkClass}>All Requests</NavLink></li>
          <li><NavLink to="/dashboard/my-employees" className={navLinkClass}>My Employees</NavLink></li>
          <li><NavLink to="/dashboard/upgrade-package-hr" className={navLinkClass}>Upgrade</NavLink></li>
        </>
      )}

      {role === "employee" && (
        <>
          <li><NavLink to="/dashboard/my-assets" className={navLinkClass}>My Assets</NavLink></li>
          <li><NavLink to="/dashboard/request-asset" className={navLinkClass}>Request Asset</NavLink></li>
          <li><NavLink to="/dashboard/my-team" className={navLinkClass}>My Team</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full px-2 lg:px-6 pt-2">
      <nav className="navbar bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-800 shadow-xl rounded-[2rem] px-4 md:px-8 transition-all duration-300">

        <div className="navbar-start gap-2">
          {/* Mobile dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-4 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-64 gap-2 z-[100] border border-gray-100">
              {navLinks}
              <div className="divider my-1"></div>
              {user && (
                <li>
                  <button onClick={LogOut} className="text-red-500 font-bold hover:bg-red-50">
                    <FaSignOutAlt /> Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
          <Logo />
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-lg hover:bg-indigo-50"
          >
            {theme === "dark" ? <FaSun className="text-orange-400" /> : <FaMoon className="text-indigo-500" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard/my-profile"
                className="group relative flex items-center"
                title={profile?.name || user?.displayName}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full ring-2 ring-indigo-500 object-cover shadow-md transition-transform group-hover:scale-105"
                />
              </Link>
              <button onClick={LogOut} className="hidden lg:flex px-4 py-2 border-2 border-red-100 text-red-500 text-sm font-bold rounded-xl hover:bg-red-50 transition-all">
                Logout
              </button>
            </div>
          ) : (
            <Link className={`${buttonClass} bg-indigo-100 !text-indigo-600 hover:bg-indigo-200 shadow-none border-none`} to="/login">
              Log in
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;