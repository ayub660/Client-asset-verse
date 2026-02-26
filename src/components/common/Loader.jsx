import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative w-20 h-20">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-full h-full border-4 border-t-[#6366f1] border-r-transparent border-b-indigo-200 border-l-transparent rounded-full shadow-lg"
                ></motion.div>

                {/* Inner Pulsing Circle */}
                <motion.div
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-4 bg-[#6366f1] rounded-full blur-[2px]"
                ></motion.div>
            </div>

            {/* Loading Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                className="text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em] text-xs uppercase"
            >
                Loading AssetVerse...
            </motion.p>
        </div>
    );
};

export default Loader;