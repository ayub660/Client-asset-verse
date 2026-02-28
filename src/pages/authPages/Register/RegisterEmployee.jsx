import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaImage, FaLock, FaCalendarDays } from "react-icons/fa6";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // ✅ SweetAlert Import

const RegisterEmployee = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { registerWithEmail } = useAuth();
  const [passType, setPassType] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ SweetAlert Helper Function
  const showAlert = (title, text, icon = "error") => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#6366f1",
    });
  };

  // ✅ Form Validation Error Handler (for SweetAlert popups)
  const onValidationError = (formErrors) => {
    if (formErrors.password) {
      showAlert("Security Notice", formErrors.password.message, "warning");
    } else if (formErrors.email) {
      showAlert("Validation Error", "Please provide a valid email address.", "warning");
    } else if (Object.keys(formErrors).length > 0) {
      showAlert("Missing Fields", "Please fill in all required fields correctly.", "info");
    }
  };

  const handleRegistration = async (data) => {
    // ✅  8 character check)
    if (data.password.length < 8) {
      showAlert("Weak Password!", "Password must be at least 8 characters long.", "warning");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Firebase + AuthProvider register
      const result = await registerWithEmail(
        data.name,
        data.email,
        data.password,
        data.photoURL,
        "employee"
      );

      if (!result?.user) throw new Error("Firebase registration failed");

      // 2️⃣ MongoDB Payload
      const employeeInfo = {
        name: data.name,
        email: data.email.toLowerCase().trim(),
        role: "employee",
        photo: data.photoURL,
        dateOfBirth: data.dateOfBirth,
        createdAt: new Date(),
      };

      // 3️⃣ Save in backend
      const res = await axios.post("/register/employee", employeeInfo);

      if (res.data?.token) {
        localStorage.setItem("access-token", res.data.token);
        toast.success("Welcome to AssetVerse 🎉");
        navigate("/dashboard");
      } else {
        throw new Error("Token not received from server");
      }

    } catch (error) {
      console.error("Employee Register Error:", error);
      setLoading(false);

      // ✅ Firebase নির্দিষ্ট এরর হ্যান্ডলিং (SweetAlert দিয়ে)
      if (error.code === "auth/email-already-in-use") {
        showAlert("Registration Failed", "This email is already in use. Please try logging in.");
      } else if (error.code === "auth/weak-password") {
        showAlert("Weak Password", "The password is too weak.");
      } else {
        showAlert("Error!", error?.response?.data?.message || error.message || "Registration failed");
      }
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

        {/* ✅ handleSubmit এ onValidationError ফাংশনটি যোগ করা হয়েছে */}
        <form onSubmit={handleSubmit(handleRegistration, onValidationError)} className="space-y-4">

          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("name", { required: "Name is Required" })}
                type="text"
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none text-black dark:text-white"
              />
            </div>
            {errors.name && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email", { required: "Email is Required" })}
                type="email"
                placeholder="email@example.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none text-black dark:text-white"
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Photo URL</label>
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("photoURL", { required: "Photo URL is Required" })}
                type="text"
                placeholder="https://image-link.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none text-black dark:text-white"
              />
            </div>
            {errors.photoURL && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.photoURL.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("password", {
                  required: "Password is Required",
                  minLength: { value: 8, message: "Password must be at least 8 characters long" }
                })}
                type={passType ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none text-black dark:text-white"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6366f1]"
                onClick={() => setPassType(!passType)}
              >
                {passType ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.password.message}</p>}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Date of Birth</label>
            <div className="relative">
              <FaCalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("dateOfBirth", { required: "Date of Birth is Required" })}
                type="date"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none text-black dark:text-white"
              />
            </div>
            {errors.dateOfBirth && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.dateOfBirth.message}</p>}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-[#6366f1] text-white font-black rounded-2xl shadow-xl hover:bg-[#4f46e5] active:scale-[0.98] transition-all mt-4 flex justify-center items-center gap-2 disabled:bg-indigo-400"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-md"></span>
                REGISTERING...
              </>
            ) : (
              "REGISTER"
            )}
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