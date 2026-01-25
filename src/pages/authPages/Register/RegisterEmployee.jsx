import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router"; // তোমার অরিজিনাল ইমপোর্ট
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaImage, FaLock, FaCalendarDays } from "react-icons/fa6";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const RegisterEmployee = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { registerUser, updateUserProfile } = useAuth();
  const [passType, setPassType] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    try {
      // 1️⃣ Firebase Registration
      const result = await registerUser(data.email, data.password);
      if (!result?.user) throw new Error("Firebase registration failed");

      // 2️⃣ Firebase Profile Update
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });

      // 3️⃣ MongoDB Payload
      const employeeInfo = {
        name: data.name,
        email: data.email,
        role: "employee",
        photo: data.photoURL,
        dateOfBirth: data.dateOfBirth,
        createdAt: new Date(),
      };

      // 4️⃣ MongoDB Save
      const res = await axios.post("/register/employee", employeeInfo);

      if (!res.data?.token) throw new Error("MongoDB user save failed");

      toast.success("Welcome to AssetVerse 🎉");
      // তোমার অরিজিনাল নেভিগেশন
      navigate(location?.state || "/");
    } catch (error) {
      console.error("Employee Register Error:", error);
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950 px-4 py-10 font-sans">
      <Helmet>
        <title>Register | AssetVerse</title>
      </Helmet>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase">
            Employee <span className="text-[#6366f1]">Join</span>
          </h2>
          <p className="text-gray-500 font-medium mt-1 italic text-sm">
            Create your account to start
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none"
              />
            </div>
            {errors.name && <p className="text-red-500 text-[10px] font-bold ml-2">Name is Required</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email@example.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none"
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10px] font-bold ml-2">Email is Required</p>}
          </div>

          {/* Photo URL */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Photo URL</label>
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("photoURL", { required: true })}
                type="text"
                placeholder="https://image-link.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none"
              />
            </div>
            {errors.photoURL && <p className="text-red-500 text-[10px] font-bold ml-2">Photo URL is Required</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("password", { required: true })}
                type={passType ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setPassType(!passType)}
              >
                {passType ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] font-bold ml-2">Password is Required</p>}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Date of Birth</label>
            <div className="relative">
              <FaCalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("dateOfBirth", { required: true })}
                type="date"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none"
              />
            </div>
            {errors.dateOfBirth && <p className="text-red-500 text-[10px] font-bold ml-2">Date is Required</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#6366f1] text-white font-black rounded-2xl shadow-xl hover:bg-[#4f46e5] active:scale-[0.98] transition-all mt-4"
          >
            REGISTER
          </button>

          <p className="text-center text-sm text-gray-500 font-medium pt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6366f1] font-bold hover:underline italic">
              Login
            </Link>
          </p>

          <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest pt-2 border-t border-gray-100 dark:border-gray-800">
            or Register as <Link to="/register-hr" className="font-bold text-indigo-400 underline">HR Manager</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmployee;