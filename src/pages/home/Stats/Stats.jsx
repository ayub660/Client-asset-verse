import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaBoxOpen, FaUserCheck } from "react-icons/fa";

const stats = [
  {
    icon: <FaBuilding />,
    value: "100+",
    label: "Active Organizations",
    description: "Empowering businesses globally with smart asset solutions.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: <FaBoxOpen />,
    value: "5,000+",
    label: "Assets Managed",
    description: "Successfully tracking inventory across multiple departments.",
    color: "from-indigo-500 to-purple-600"
  },
  {
    icon: <FaUserCheck />,
    value: "99%",
    label: "Accuracy Rate",
    description: "Minimizing loss and ensuring precision in every assignment.",
    color: "from-emerald-500 to-teal-600"
  },
];

const Stats = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Trusted by <span className="text-[#6366f1]">Growing</span> Organizations
            </h2>
            <p className="text-gray-600 text-lg font-medium max-w-xl mx-auto lg:mx-0">
              AssetVerse helps organizations manage assets efficiently with accuracy,
              transparency, and the confidence to scale.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4 text-sm font-bold text-gray-400">
              <span className="px-4 py-2 border border-gray-200 rounded-xl">✓ ISO Certified</span>
              <span className="px-4 py-2 border border-gray-200 rounded-xl">✓ SOC2 Ready</span>
            </div>
          </motion.div>

          {/* Right Side: Stats Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-8 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center ${index === 2 ? 'sm:col-span-2 sm:max-w-xs sm:mx-auto' : ''}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#6366f1] flex items-center justify-center text-3xl mb-6 shadow-inner">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-[#6366f1] font-bold text-sm uppercase tracking-widest mb-3">{stat.label}</p>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">{stat.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;