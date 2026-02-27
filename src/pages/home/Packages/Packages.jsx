import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Packages = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axios.get("/packages");
      return Array.isArray(res.data) ? res.data : [];
    },
  });


  const handlePurchase = (planId) => {
    if (!user) {

      navigate("/login", { state: { from: location } });
    } else {

      navigate("/dashboard/upgrade-package-hr");
    }
  };

  if (isLoading) return <Loading />;

  return (

    <section className="py-10 bg-white dark:bg-[#030712] border-none -my-1 relative z-10">
      <div className="max-w-7xl mx-auto px-6">


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-3"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            Flexible <span className="text-[#6366f1]">Pricing</span> for Every Business
          </h2>
          <div className="w-20 h-1.5 bg-[#6366f1] mx-auto rounded-full"></div>
        </motion.div>

        {/* Pricing Grid - */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto pb-4">
          {packages.slice(0, 3).map((plan, index) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              /* min-h-[520px] */
              className={`relative flex flex-col p-7 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl transition-all duration-300 border-2 min-h-[520px] ${index === 1 ? "border-[#6366f1] md:scale-105 z-10" : "border-gray-100 dark:border-gray-700"
                }`}
            >
              {/* Best Value Tag */}
              {index === 1 && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6366f1] text-white px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
                  Best Value
                </span>
              )}

              {/* Price Header */}
              <div className="mb-6 mt-2">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 uppercase tracking-wide">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#6366f1]">${plan.price}</span>
                  <span className="text-gray-400 text-sm font-medium">/lifetime</span>
                </div>
              </div>

              {/* Limit Display */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-4 mb-8">
                <p className="text-[#6366f1] dark:text-indigo-400 text-sm font-extrabold text-center uppercase">
                  Up to {plan.employeeLimit} Employees
                </p>
              </div>

              {/* Features List - */}
              <ul className="flex-1 space-y-4 mb-8">
                {(plan.features || ["Admin Dashboard", "Asset Tracking", "Real-time Reports"]).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm leading-snug">
                    <FaCheckCircle className="text-[#6366f1] mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Purchase Button */}
              <button
                onClick={() => handlePurchase(plan._id)}
                className={`btn h-12 rounded-xl text-sm font-black transition-all border-none uppercase tracking-wider ${index === 1
                  ? "bg-[#6366f1] text-white shadow-lg hover:bg-[#4f46e5] active:scale-95"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
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