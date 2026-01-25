import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Packages = () => {
  const axios = useAxios();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axios.get("/packages");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Flexible <span className="text-[#6366f1]">Pricing</span> for Every Business
          </h2>
          <div className="w-24 h-1.5 bg-[#6366f1] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Choose the perfect plan to manage your assets efficiently and scale your team without limits.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.slice(0, 3).map((plan, index) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-8 bg-white rounded-[2.5rem] shadow-xl transition-all duration-300 hover:shadow-2xl border-2 ${index === 1 ? "border-[#6366f1] md:scale-110 z-10" : "border-transparent"
                }`}
            >
              {/* Most Popular Tag */}
              {index === 1 && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#6366f1] text-white px-6 py-1.5 rounded-full text-sm font-black tracking-widest uppercase">
                  Best Value
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#6366f1]">${plan.price}</span>
                  <span className="text-gray-500 font-bold">/lifetime</span>
                </div>
              </div>

              {/* Limit Display */}
              <div className="bg-indigo-50 rounded-2xl p-4 mb-8">
                <p className="text-[#6366f1] font-bold text-center">
                  Up to {plan.employeeLimit} Employees
                </p>
              </div>

              {/* Features List */}
              <ul className="flex-1 space-y-4 mb-10">
                {(plan.features || ["Admin Dashboard", "Asset Tracking", "Real-time Reports"]).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium text-[15px]">
                    <FaCheckCircle className="text-[#6366f1] flex-shrink-0 text-lg" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`btn h-14 rounded-2xl text-lg font-black transition-all border-none ${index === 1
                    ? "bg-[#6366f1] text-white shadow-lg shadow-indigo-200 hover:bg-[#4f46e5]"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                Purchase Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;