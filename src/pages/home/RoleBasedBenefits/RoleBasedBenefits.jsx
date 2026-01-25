import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsersCog, FaLaptop, FaChartLine, FaUserCheck } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const RoleBasedBenefits = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const benefits = {
    hr: [
      {
        icon: <FaUsersCog />,
        title: "Centralized Asset Control",
        desc: "Manage all company assets from one dashboard with full visibility and control.",
        accent: "text-blue-500",
      },
      {
        icon: <FaChartLine />,
        title: "Real-time Asset Tracking",
        desc: "Track availability, assignments, and returns with accurate real-time data.",
        accent: "text-indigo-500",
      },
      {
        icon: <FaUserCheck />,
        title: "Employee Management",
        desc: "Assign, approve, and monitor assets issued to employees effortlessly.",
        accent: "text-purple-500",
      },
    ],
    employee: [
      {
        icon: <FaLaptop />,
        title: "Easy Asset Requests",
        desc: "Request company assets quickly without paperwork or long approval chains.",
        accent: "text-emerald-500",
      },
      {
        icon: <FaUserCheck />,
        title: "Clear Asset Ownership",
        desc: "View assigned assets, return status, and request history in one place.",
        accent: "text-sky-500",
      },
      {
        icon: <FaChartLine />,
        title: "Transparent Process",
        desc: "Track your request status with complete transparency and notifications.",
        accent: "text-amber-500",
      },
    ],
    guest: [
      {
        icon: <FaUsersCog />,
        title: "Corporate Management",
        desc: "A modern platform to manage organizational assets efficiently.",
        accent: "text-indigo-500",
      },
      {
        icon: <FaChartLine />,
        title: "Smart Tracking System",
        desc: "Gain insights into asset usage, availability, and lifecycle status.",
        accent: "text-indigo-500",
      },
      {
        icon: <FaUserCheck />,
        title: "Role-Based Access",
        desc: "Designed for both HR teams and employees with secure access control.",
        accent: "text-indigo-500",
      },
    ],
  };

  const activeBenefits = user
    ? role === "hr"
      ? benefits.hr
      : benefits.employee
    : benefits.guest;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          key={role || 'guest'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-indigo-50 text-[#6366f1] text-sm font-bold tracking-wide uppercase">
            {user ? `${role === 'hr' ? 'For HR Managers' : 'For Employees'}` : "For Everyone"}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Role-Based <span className="text-[#6366f1]">Benefits</span>
          </h2>
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            {user
              ? role === "hr"
                ? "Empower your HR team with total oversight and advanced administrative tools."
                : "Simplify your work life with easy asset acquisition and clear tracking."
              : "Discover a smart, scalable solution for modern corporate asset management."}
          </p>
        </motion.div>

        {/* Benefits Grid with Animation */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {activeBenefits.map((item, index) => (
              <motion.div
                key={`${role}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 text-center flex flex-col items-center"
              >
                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 bg-gray-50 group-hover:bg-[#6366f1] group-hover:text-white transition-all duration-500 shadow-inner ${item.accent}`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {item.desc}
                </p>

                {/* Visual Accent Line */}
                <div className="w-12 h-1 bg-gray-100 mt-8 rounded-full group-hover:w-24 group-hover:bg-[#6366f1] transition-all duration-500"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RoleBasedBenefits;