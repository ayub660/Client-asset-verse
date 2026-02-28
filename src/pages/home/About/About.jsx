import React from "react";
import feature6 from "../../../assets/images/feature6.png"
import { FaCheckCircle, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  const points = [
    { text: "Real-time Inventory Management", icon: <FaChartLine /> },
    { text: "Automated Asset Assignment", icon: <FaRocket /> },
    { text: "Detailed Performance Analytics", icon: <FaCheckCircle /> },
    { text: "Secure Role-Based Access", icon: <FaShieldAlt /> }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#030712] overflow-hidden relative">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-16">

          {/* Left Side: Animated Image with Card effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#6366f1] to-purple-500 rounded-[2rem] opacity-20 blur-2xl"></div>
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-[2rem] p-4 shadow-2xl border border-white dark:border-gray-700">
              <img
                src={feature6}
                alt="Asset Management Illustration"
                className="w-full h-auto rounded-[1.5rem] transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Small Floating Stat Card */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 hidden md:block">
              <p className="text-3xl font-black text-[#6366f1]">99%</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Accuracy Rate</p>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-[#6366f1] text-xs font-black uppercase tracking-[0.2em] rounded-full">
                Our Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                Why Choose <span className="text-[#6366f1]">AssetVerse?</span>
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                We empower businesses by providing a seamless, automated way to track and manage physical assets. No more lost laptops or ghost inventory.
              </p>
            </div>

            {/* Grid Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {points.map((p, i) => (
                <div key={i} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <div className="text-[#6366f1] text-xl mt-1 group-hover:scale-125 transition-transform duration-300">
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-bold text-sm leading-tight">
                      {p.text}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">Efficiently manage your resources.</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn h-14 px-10 bg-[#6366f1] hover:bg-[#4f46e5] text-white border-none rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none font-bold text-lg transition-all active:scale-95">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;