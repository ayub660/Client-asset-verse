import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import feature1 from "../../../assets/feature1.png"; // Apnar assets path onujayi check korun

const Banner = () => {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h1 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight">
            Next-Gen <span className="text-[#6366f1]">Asset Tracking</span> <br /> for Your Business
          </h1>
          <p className="text-gray-500 text-base lg:text-lg max-w-md font-medium">
            Take  full control of your company resources with AssetVerse. Simple, automated, and secure.
          </p>
          <div className="flex gap-4 pt-2">
            <Link to="/register-hr" className="btn bg-[#6366f1] text-white border-none px-6 h-12 rounded-xl shadow-lg shadow-indigo-100 font-bold">Get Started</Link>
            <Link to="/register-employee" className="btn btn-outline border-[#6366f1] text-[#6366f1] px-6 h-12 rounded-xl font-bold">Join Team</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center lg:justify-end">
          <img src={feature1} alt="Hero" className="w-full max-w-md rounded-2xl shadow-2xl border-2 border-gray-100" />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;