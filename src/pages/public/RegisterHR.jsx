// src/pages/public/RegisterHR.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const RegisterHR = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const { registerWithEmail } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await registerWithEmail(name, email, password, companyLogo, "hr");
            if (user) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "You have registered as an HR!",
                });
                navigate("/hr");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register as HR Manager</h2>

                <label className="block mb-2">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mb-4 w-full border p-2 rounded" required />

                <label className="block mb-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mb-4 w-full border p-2 rounded" required />

                <label className="block mb-2">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4 w-full border p-2 rounded" required />

                <label className="block mb-2">Company Name</label>
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="mb-4 w-full border p-2 rounded" required />

                <label className="block mb-2">Company Logo URL</label>
                <input type="text" value={companyLogo} onChange={e => setCompanyLogo(e.target.value)} className="mb-4 w-full border p-2 rounded" />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
            </form>
        </div>
    );
};

export default RegisterHR;
