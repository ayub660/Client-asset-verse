import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginWithEmail, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const { role } = await loginWithEmail(email, password);
            // Redirect based on role
            if (role === "hr") navigate("/hr");
            else navigate("/employee");
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = async (role) => {
        try {
            const result = await loginWithGoogle(role);
            if (role === "hr") navigate("/hr");
            else navigate("/employee");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleEmailLogin} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <label className="block mb-2">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="mb-4 w-full border p-2 rounded"
                    required
                />
                <label className="block mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="mb-4 w-full border p-2 rounded"
                    required
                />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mb-4">
                    Login
                </button>
                <button type="button" onClick={() => handleGoogleLogin("employee")} className="w-full bg-red-600 text-white py-2 rounded mb-2">
                    Login with Google as Employee
                </button>
                <button type="button" onClick={() => handleGoogleLogin("hr")} className="w-full bg-red-600 text-white py-2 rounded">
                    Login with Google as HR
                </button>
            </form>
        </div>
    );
};

export default Login;
