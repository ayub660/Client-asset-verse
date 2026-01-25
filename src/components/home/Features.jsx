// src/components/home/Features.jsx
import React from "react";
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

const Features = () => {
    return (
        <section className="py-20 bg-indigo-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-8 text-indigo-900">Powerful Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {featuresData.map(f => (
                        <div key={f.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                            <img src={f.img} alt={f.title} className="w-32 h-32 mx-auto mb-4 object-contain" />
                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                            <p className="text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
