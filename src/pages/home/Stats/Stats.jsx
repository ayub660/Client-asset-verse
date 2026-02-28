import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaBoxOpen, FaUserCheck, FaArrowTrendUp } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CountUp from "react-countup";
import Loader from "../../../components/common/Loader";

const Stats = () => {
  const axiosPublic = useAxiosPublic();

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
      value: publicStats.totalCompanies || 17,
      label: "Partner Companies",
      color: "#3b82f6",
      trend: "+12% this month"
    },
    {
      icon: <FaBoxOpen />,
      value: publicStats.totalAssets || 19,
      label: "Managed Assets",
      color: "#6366f1",
      trend: "Real-time sync"
    },
    {
      icon: <FaUserCheck />,
      value: publicStats.totalUsers || 47,
      label: "System Users",
      color: "#10b981",
      trend: "Active now"
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <section className="py-20 bg-white dark:bg-[#030712] relative overflow-hidden">
      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-[#6366f1]"></span>
              <span className="text-xs font-black uppercase tracking-widest text-[#6366f1]">Platform Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              AssetVerse <span className="text-gray-400 dark:text-gray-600">Metrics</span>
            </h2>
          </div>
          <div className="bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tighter">Live Database Connection: Stable</span>
          </div>
        </div>

        {/* --- MAIN STATS BOARD --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800 rounded-[3rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-[#0b0f1a] p-10 md:p-14 flex flex-col items-start hover:bg-gray-50 dark:hover:bg-[#0f1525] transition-colors duration-500 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
                    <CountUp end={stat.value} duration={3} />
                  </span>
                  <FaArrowTrendUp className="text-green-500 text-xl" />
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">{stat.label}</p>
                <div className="inline-block px-3 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                  {stat.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;