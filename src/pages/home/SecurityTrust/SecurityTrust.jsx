import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaUserShield, FaDatabase } from "react-icons/fa";

const securityItems = [
  {
    icon: <FaUserShield />,
    title: "Role-Based Access Control",
    description:
      "Ensure that HR, Admins, and Employees only access what they are authorized to view or manage.",
  },
  {
    icon: <FaLock />,
    title: "Secure Authentication",
    description:
      "Protected login system with secure authentication to keep organizational data safe.",
  },
  {
    icon: <FaDatabase />,
    title: "Data Integrity & Protection",
    description:
      "All asset records are securely stored and maintained with accuracy and consistency.",
  },
];

const SecurityTrust = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide uppercase">
            Enterprise Security
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            Security You Can <span className="text-[#6366f1]">Trust</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#6366f1] mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            AssetVerse is built with enterprise-grade security practices to protect
            your organization’s assets and sensitive data.
          </p>
        </motion.div>

        {/* Security Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 text-center"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-white dark:bg-gray-800 text-[#6366f1] rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto shadow-md group-hover:bg-[#6366f1] group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#6366f1] transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-900 dark:text-white font-black text-xl italic uppercase tracking-tighter">SSL Secured</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Encryption Protocol</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-900 dark:text-white font-black text-xl italic uppercase tracking-tighter">256-Bit AES</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Bank-Grade Safety</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-900 dark:text-white font-black text-xl italic uppercase tracking-tighter">GDPR Ready</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Privacy Compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityTrust;