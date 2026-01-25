// src/components/home/About.jsx
import React from "react";

const About = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6 text-indigo-900">Why AssetVerse?</h2>
                <p className="text-gray-700 mb-12">
                    AssetVerse helps companies efficiently manage assets, prevent loss, and streamline operations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-2">Prevent Asset Loss</h3>
                        <p className="text-gray-600">Keep track of all assets and their assignments.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-2">Streamline Assignments</h3>
                        <p className="text-gray-600">Automate asset requests and approvals.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-2">Improve Visibility</h3>
                        <p className="text-gray-600">Monitor inventory in real-time and generate reports.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-2">Reduce Admin Overhead</h3>
                        <p className="text-gray-600">Simplify HR tasks and asset tracking efficiently.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
