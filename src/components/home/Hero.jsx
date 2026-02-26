import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImg from "../../assets/images/hero.png";

const Hero = () => {
    return (
        <div className="relative min-h-[90vh] flex items-center bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 dark:bg-indigo-900/10 blur-[120px] rounded-full -mr-40 -mt-20"></div>

            <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center lg:text-left space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide uppercase">
                            🚀 Efficiency Redefined
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1]">
                            Smart <span className="text-[#6366f1]">Asset</span> <br />
                            Management for <br />
                            Modern Companies
                        </h1>

                        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                            Track, manage, and optimize all company assets with full control, security, and real-time insights in one unified platform.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                            <Link to="/register-hr">
                                <button className="px-8 py-4 bg-[#6366f1] text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
                                    Join as HR
                                </button>
                            </Link>

                            <Link to="/register-employee">
                                <button className="px-8 py-4 bg-white dark:bg-gray-900 text-[#6366f1] border-2 border-[#6366f1] font-bold rounded-2xl hover:bg-indigo-50 transition-all">
                                    Join as Employee
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Image with Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 relative"
                    >
                        <div className="relative group">
                            {/* Image Glow Effect */}
                            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <img
                                src={HeroImg}
                                alt="Smart Asset Management"
                                className="relative w-full max-w-2xl mx-auto rounded-[2rem] drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Hero;