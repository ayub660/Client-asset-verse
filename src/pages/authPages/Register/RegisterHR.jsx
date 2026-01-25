import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUser, FaBuilding, FaImage, FaEnvelope, FaLock, FaCalendarDays } from "react-icons/fa6";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const RegisterHR = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const { registerUser, updateUserProfile } = useAuth();
  const [passType, setPassType] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    try {
      // 1. Firebase create
      const result = await registerUser(data.email, data.password);
      if (!result?.user) throw new Error("Firebase registration failed");

      // 2. Firebase profile update
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.companyLogo,
      });

      // 3. MongoDB payload
      const hrInfo = {
        name: data.name,
        email: data.email.toLowerCase().trim(),
        role: "hr",
        companyName: data.companyName,
        companyLogo: data.companyLogo,
        dateOfBirth: data.dateOfBirth,
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
        createdAt: new Date(),
      };

      // 4. MongoDB save
      const res = await axios.post("/register/hr", hrInfo);

      if (res.data?.token) {
        localStorage.setItem("access-token", res.data.token);
        toast.success("Welcome HR! Redirecting to Dashboard...");

        // ✅ মেইন ফিক্স: হার্ড রিফ্রেশ দিয়ে ড্যাশবোর্ডে পাঠানো
        // এটি করলে 'Loading' এ আটকে থাকার সুযোগ থাকবে না
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 1200);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("HR Register Error:", error);
      toast.error(error?.response?.data?.message || error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950 px-4 py-10">
      <Helmet><title>HR Register | AssetVerse</title></Helmet>

      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            HR <span className="text-[#6366f1]">Register</span>
          </h2>
          <p className="text-gray-500 font-medium mt-1 text-sm italic">Join as an HR Manager</p>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input {...register("name", { required: true })} type="text" placeholder="Full Name" className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Company</label>
              <div className="relative">
                <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input {...register("companyName", { required: true })} type="text" placeholder="Company Name" className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Logo URL</label>
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input {...register("companyLogo", { required: true })} type="text" placeholder="Logo Link" className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input {...register("email", { required: true })} type="email" placeholder="hr@mail.com" className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input {...register("password", { required: true })} type={passType ? "text" : "password"} placeholder="••••••••" className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none" />
                <button type="button" onClick={() => setPassType(!passType)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {passType ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">DOB</label>
              <div className="relative">
                <FaCalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input {...register("dateOfBirth", { required: true })} type="date" className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none" />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-[#6366f1] text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all mt-4 uppercase">
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Already registered? <Link to="/login" className="text-[#6366f1] font-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterHR;