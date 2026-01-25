import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const Login = () => {
  const axios = useAxios();
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [passType, setPassType] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAuthSuccess = async (user) => {
    try {
      const res = await axios.post("/jwt", {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });

      if (res.data.token) {
        localStorage.setItem("access-token", res.data.token);


        setTimeout(() => {

          const destination = location?.state || "/dashboard";
          navigate(destination, { replace: true });
        }, 500);
      }
    } catch (err) {
      console.error("JWT Error:", err);
      toast.error("Authentication failed. User might not be in DB yet.");
    }
  };

  // ✅ Email / Password Login
  const handleLogin = async (data) => {
    try {
      const result = await loginUser(data.email, data.password);
      toast.success(`Welcome Back ${result.user.displayName || "User"}`);
      await handleAuthSuccess(result.user);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // ✅ Google Login (FIXED)
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      toast.success("Login Successful with Google!");
      await handleAuthSuccess(user);

    } catch (err) {
      console.error("Google Login Error:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950 px-4 py-10">
      <Helmet>
        <title>Login | AssetVerse</title>
      </Helmet>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-100/50 dark:shadow-none p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            Welcome <span className="text-[#6366f1]">Back</span>
          </h2>
          <p className="text-gray-500 font-medium mt-2">
            Login to manage your assets
          </p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 mb-6 group"
        >
          <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
          <span>Continue with Google</span>
        </button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100 dark:border-gray-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-4 text-gray-400 font-bold tracking-widest">
              Or Email Login
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email", { required: "Email is Required" })}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs ml-2 font-bold">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-[#6366f1] hover:underline"
              >
                Forgot?
              </Link>
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("password", { required: "Password is Required" })}
                type={passType ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6366f1]"
                onClick={() => setPassType(!passType)}
              >
                {passType ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs ml-2 font-bold">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#6366f1] text-white font-black rounded-2xl shadow-xl hover:bg-[#4f46e5] active:scale-[0.98] transition-all"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-500 font-medium pt-4">
            New here?{" "}
            <Link
              to="/register-employee"
              className="text-[#6366f1] font-bold hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
