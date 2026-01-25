import React from "react";
import { motion } from "framer-motion";
import { FaPlusCircle, FaUserCheck, FaTasks, FaChartBar } from "react-icons/fa";

const steps = [
  {
    icon: <FaPlusCircle />,
    title: "Add Your Assets",
    description: "Easily register and categorize company assets for complete visibility and organization.",
    stepNumber: "01"
  },
  {
    icon: <FaUserCheck />,
    title: "Assign to Employees",
    description: "Allocate assets to employees with clear tracking, approvals, and assignment history.",
    stepNumber: "02"
  },
  {
    icon: <FaTasks />,
    title: "Track & Manage",
    description: "Monitor asset usage, status, and lifecycle in real time with complete transparency.",
    stepNumber: "03"
  },
  {
    icon: <FaChartBar />,
    title: "Analyze & Optimize",
    description: "Generate reports and gain actionable insights to optimize asset utilization.",
    stepNumber: "04"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            How <span className="text-[#6366f1]">AssetVerse</span> Works
          </h2>
          <div className="w-24 h-1.5 bg-[#6366f1] mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Streamline your organizational management in four simple, powerful steps.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">

          {/* Decorative Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-indigo-200 -z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 group"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#6366f1] w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg border border-indigo-100 group-hover:bg-[#6366f1] group-hover:text-white transition-colors duration-300">
                {step.stepNumber}
              </div>

              <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-50 hover:border-[#6366f1]/30 transition-all duration-300 group-hover:-translate-y-2">

                {/* Icon Wrapper */}
                <div className="w-20 h-20 bg-indigo-50 text-[#6366f1] rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-[#6366f1] group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;