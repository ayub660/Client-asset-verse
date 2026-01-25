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
    <section className="py-24 bg-[#0f172a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

        {/* Header with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6366f1]/20 text-[#6366f1] text-xs font-bold tracking-[0.2em] uppercase">
            Enterprise Security
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Security You Can <span className="text-[#6366f1]">Trust</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            AssetVerse is built with enterprise-grade security practices to protect
            your organization’s assets and sensitive data.
          </p>
        </motion.div>

        {/* Security Cards Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -12 }}
              className="group p-10 bg-[#1e293b] rounded-[2.5rem] border border-white/5 hover:border-[#6366f1]/50 transition-all duration-500 shadow-2xl relative"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#6366f1]/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Icon Container */}
              <div className="w-20 h-20 bg-[#6366f1] text-white rounded-2xl flex items-center justify-center text-4xl mb-8 mx-auto shadow-lg shadow-[#6366f1]/30 group-hover:rotate-[360deg] transition-transform duration-700">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-[#6366f1] transition-colors uppercase tracking-tight">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-10 opacity-30 grayscale"
        >
          <div className="flex items-center gap-2 font-bold text-xl uppercase tracking-widest italic">SSL Secured</div>
          <div className="flex items-center gap-2 font-bold text-xl uppercase tracking-widest italic">256-Bit AES</div>
          <div className="flex items-center gap-2 font-bold text-xl uppercase tracking-widest italic">GDPR Ready</div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityTrust;