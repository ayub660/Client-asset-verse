import React from "react";
import feature2 from "../../../assets/feature2.png"; // Apnar assets path onujayi check korun
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
  const points = [
    "Real-time Inventory Management",
    "Automated Asset Assignment",
    "Detailed Performance Analytics",
    "Secure Role-Based Access"
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-12">
        <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
          <img src={feature2} alt="Features" className="w-full max-w-sm rounded-2xl shadow-xl border-2 border-white" />
        </div>
        <div className="order-1 lg:order-2 space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Why Choose <span className="text-[#6366f1]">AssetVerse?</span></h2>
          <p className="text-gray-500 font-medium">Our platform simplifies the way you handle company assets, reducing loss and increasing productivity.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                <FaCheckCircle className="text-[#6366f1]" /> {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;