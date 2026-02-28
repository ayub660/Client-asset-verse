import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaBuilding, FaUserTie } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Login = () => {
  const axios = useAxios();
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [passType, setPassType] = useState(false);


  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ✅ SweetAlert Utility for reuse
  const showAlert = (title, text, icon = "error") => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#6366f1",
    });
  };

  // ✅ Space Validation logic with SweetAlert
  const handleSpaceCheck = (e) => {
    const value = e.target.value;
    if (/\s/.test(value)) {
      showAlert("Space Detected!", "Space detected! Please remove any spaces from your email।", "warning");
    }
  };

  // ✅ JWT Handling Logic (Unchanged)
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
          setLoading(false);
        }, 500);
      }
    } catch (err) {
      console.error("JWT Error:", err);
      showAlert("Auth Error", "Authentication failed. User might not be in DB yet.");
      setLoading(false);
    }
  };

  // ✅ Email / Password Login Logic
  const handleLogin = async (data) => {

    if (data.password.length < 8) {
      showAlert("Weak Password!", "Password must be at least 8 characters long.", "warning");
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithEmail(data.email, data.password);
      toast.success(`Welcome Back ${result.user.displayName || "User"}`);
      await handleAuthSuccess(result.user);
    } catch (err) {
      console.error(err);
      setLoading(false);


      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        showAlert("Login Failed!", "Invalid email or password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        showAlert("User Not Found!", "No account found with this email.");
      } else {
        showAlert("Error!", err.message);
      }
    }
  };

  // ✅ Google Login Logic
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      toast.success("Login Successful with Google!");
      await handleAuthSuccess(user);
    } catch (err) {
      console.error("Google Login Error:", err);
      showAlert("Google Login Error", err.message);
      setLoading(false);
    }
  };

  // ✅ Demo Login Logic
  const handleDemoLogin = (role) => {
    if (role === "hr") {
      setValue("email", "Hr@assetverse.com");
      setValue("password", "Hr@assetverse.com");
    } else {
      setValue("email", "em@asssetverse.com");
      setValue("password", "emp12345678");
    }
    toast.info(`${role.toUpperCase()} credentials filled!`);
  };

  // ✅ React Hook Form 
  const onValidationError = (errors) => {
    if (errors.password) {
      showAlert("Security Notice", errors.password.message, "warning");
    } else if (errors.email) {
      showAlert("Email Required", errors.email.message, "warning");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 dark:bg-gray-950 px-4 py-10 transition-colors duration-300">
      <Helmet>
        <title>Login | AssetVerse</title>
      </Helmet>

      <div className="w-full max-w-md bg-base-100 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-100/50 dark:shadow-none p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-base-content dark:text-white">
            Welcome <span className="text-[#6366f1]">Back</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
            Login to manage your assets
          </p>
        </div>

        {/* ✅ Demo Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleDemoLogin("hr")}
            className="flex items-center justify-center gap-2 py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30 rounded-2xl font-bold hover:bg-orange-600 hover:text-white transition-all text-sm shadow-sm"
          >
            <FaBuilding /> HR Demo
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("employee")}
            className="flex items-center justify-center gap-2 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all text-sm shadow-sm"
          >
            <FaUserTie /> Employee Demo
          </button>
        </div>

        {/* Google Login */}
        <button
          disabled={loading}
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-base-content dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 mb-6 group disabled:opacity-50"
        >
          <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
          <span>Continue with Google</span>
        </button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100 dark:border-gray-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-base-100 dark:bg-gray-900 px-4 text-gray-400 font-bold tracking-widest">
              Or Email Login
            </span>
          </div>
        </div>

        {/* ✅ handleSubmit এ onValidationError ফাংশন*/}
        <form onSubmit={handleSubmit(handleLogin, onValidationError)} className="space-y-5">
          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-base-content/80 dark:text-gray-300 ml-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email", {
                  required: "Email is Required",
                  validate: (v) => !/\s/.test(v) || "Email cannot contain spaces"
                })}
                onBlur={handleSpaceCheck}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none text-black dark:text-white placeholder-gray-400 transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs ml-2 font-bold italic">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-base-content/80 dark:text-gray-300">
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
                {...register("password", {
                  required: "Password is Required",
                  minLength: { value: 8, message: "Password must be at least 8 characters long" }
                })}
                type={passType ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-[#6366f1] outline-none text-black dark:text-white placeholder-gray-400 transition-all"
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
              <p className="text-red-500 text-xs ml-2 font-bold italic">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ✅ Sign In Button with Loading Spinner */}
          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-[#6366f1] text-white font-black rounded-2xl shadow-xl hover:bg-[#4f46e5] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:bg-indigo-400"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-md"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium pt-4">
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