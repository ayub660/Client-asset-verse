import React, { useState } from "react";
import { motion } from "framer-motion";
import Feature1 from "../../assets/images/feature1.png";
import Feature2 from "../../assets/images/feature2.png";
import Feature3 from "../../assets/images/feature3.png";
import Feature4 from "../../assets/images/feature4.png";

const featuresData = [
    { id: 1, title: "Asset Tracking", desc: "Monitor all assets in real-time.", img: Feature1 },
    { id: 2, title: "Smart Requests", desc: "Efficient request and approval workflow.", img: Feature2 },
    { id: 3, title: "Analytics", desc: "Visualize usage trends and asset stats.", img: Feature3 },
    { id: 4, title: "Team Management", desc: "Manage employees and their assigned assets.", img: Feature4 },
];

const FeatureCard = ({ f }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-indigo-100 dark:hover:border-gray-800">
            <div className="relative w-32 h-32 mx-auto mb-4">
                {/* Image Skeleton / Loader */}
                {!isLoaded && (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <img
                    src={f.img}
                    alt={f.title}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-32 h-32 mx-auto object-contain transition-all duration-500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{f.desc}</p>
        </div>
    );
};

const Features = () => {
    return (
        <section className="py-20 bg-indigo-50/50 dark:bg-transparent">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-black mb-12 text-indigo-950 dark:text-white"
                >
                    Powerful <span className="text-[#6366f1]">Features</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresData.map(f => (
                        <FeatureCard key={f.id} f={f} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;