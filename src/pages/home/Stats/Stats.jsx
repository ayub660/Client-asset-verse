import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaBoxOpen, FaUserCheck } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CountUp from "react-countup";
import Loader from "../../../components/common/Loader";

const Stats = () => {
  const axiosPublic = useAxiosPublic();

  //backend data fetch
  const { data: publicStats = {}, isLoading } = useQuery({

    queryKey: ['public-stats'],
    queryFn: async () => {
      const res = await axiosPublic.get('/public-stats');
      return res.data;
    }
  });

  const statsData = [
    {
      icon: <FaBuilding />,
      value: publicStats.totalCompanies || 0,
      label: "Organizations",
      suffix: "+",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <FaBoxOpen />,
      value: publicStats.totalAssets || 0,
      label: "Assets Tracked",
      suffix: "",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <FaUserCheck />,
      value: publicStats.totalUsers || 0,
      label: "Active Users",
      suffix: "+",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  if (isLoading) return <Loader></Loader>;

  return (
    <section className="py-10 bg-transparent relative z-30">
      <div className="max-w-7xl mx-auto px-6">

        {/* --- SHORT & CLEAN HEADER --- */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white"
          >
            AssetVerse <span className="text-[#6366f1]">in Numbers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium"
          >
            Real-time statistics of our growing community.
          </motion.p>
        </div>

        {/* --- STATS CARDS CONTAINER --- */}
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-12 border border-white/20 dark:border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="flex items-center gap-6 p-4 rounded-3xl transition-all duration-500">

                  {/* Icon with Gradient */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center text-2xl md:text-3xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                    {stat.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col text-left">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                      <CountUp end={stat.value} duration={2.5} separator="," />{stat.suffix}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 font-bold text-[11px] md:text-xs uppercase tracking-widest mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>

                {/* Vertical Divider for Desktop */}
                {index !== 2 && (
                  <div className="hidden md:block absolute right-[-15px] top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gray-200 dark:bg-gray-800"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;