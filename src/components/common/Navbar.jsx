// src/components/common/Navbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, role, logout } = useAuth();
    const navigate = useNavigate(); // navigate for logout redirect

    const activeClass = "text-primary font-semibold";

    const handleLogout = async () => {
        await logout(); // logout from auth context
        navigate("/login"); // redirect to login page
    };

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gray-800">
                AssetVerse
            </Link>

            {/* Public Links */}
            {!user && (
                <div className="flex gap-6 absolute left-1/2 transform -translate-x-1/2">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? activeClass : "text-gray-600")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/register-employee"
                        className={({ isActive }) => (isActive ? activeClass : "text-gray-600")}
                    >
                        Join as Employee
                    </NavLink>
                    <NavLink
                        to="/register-hr"
                        className={({ isActive }) => (isActive ? activeClass : "text-gray-600")}
                    >
                        Join as HR
                    </NavLink>
                </div>
            )}

            {/* User Dropdown */}
            <div className="ml-auto">
                {!user ? (
                    <Link to="/login" className="btn btn-primary btn-sm">
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="cursor-pointer flex items-center gap-2">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
                            ) : (
                                <FaUserCircle className="w-8 h-8 text-gray-500" />
                            )}
                            {/* Show user name instead of role */}
                            <span className="ml-1">{user.displayName || "User"}</span>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 mt-2"
                        >
                            {role === "employee" && (
                                <>
                                    <li>
                                        <Link to="/employee">My Assets</Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/team">My Team</Link>
                                    </li>
                                    <li>
                                        <Link to="/employee/request">Request Asset</Link>
                                    </li>
                                </>
                            )}
                            {role === "hr" && (
                                <>
                                    <li>
                                        <Link to="/hr">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/hr/assets">Asset List</Link>
                                    </li>
                                    <li>
                                        <Link to="/hr/requests">All Requests</Link>
                                    </li>
                                    <li>
                                        <Link to="/hr/employees">Employee List</Link>
                                    </li>
                                    <li>
                                        <Link to="/hr/upgrade">Upgrade Package</Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button className="w-full text-left" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
