// src/components/home/Packages.jsx
import React from "react";

const packagesData = [
    { name: "Basic", limit: 5, price: 5, features: ["Asset Tracking", "Employee Management", "Basic Support"] },
    { name: "Standard", limit: 10, price: 8, features: ["All Basic features", "Advanced Analytics", "Priority Support"] },
    { name: "Premium", limit: 20, price: 15, features: ["All Standard features", "Custom Branding", "24/7 Support"] },
];

const Packages = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12 text-indigo-900">Our Packages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packagesData.map((pkg, idx) => (
                        <div key={idx} className="bg-indigo-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                            <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                            <p className="text-gray-700 mb-4">Employees: {pkg.limit}</p>
                            <p className="text-gray-900 text-3xl font-semibold mb-4">${pkg.price}</p>
                            <ul className="mb-4">
                                {pkg.features.map((f, i) => (
                                    <li key={i} className="text-gray-600 mb-1">• {f}</li>
                                ))}
                            </ul>
                            <button className="btn btn-primary w-full">Select</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;
