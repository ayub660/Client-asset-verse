// src/pages/employee/Team.jsx
import React from "react";

const Team = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">My Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                <div className="card bg-white shadow p-4 rounded">
                    <img src="/src/assets/images/feature1.png" alt="Employee 1" className="mb-4 rounded-full w-24 h-24 mx-auto" />
                    <h2 className="font-bold text-xl mb-1 text-center">John Doe</h2>
                    <p className="text-center text-gray-600">Developer</p>
                </div>
                <div className="card bg-white shadow p-4 rounded">
                    <img src="/src/assets/images/feature2.png" alt="Employee 2" className="mb-4 rounded-full w-24 h-24 mx-auto" />
                    <h2 className="font-bold text-xl mb-1 text-center">Jane Smith</h2>
                    <p className="text-center text-gray-600">Designer</p>
                </div>
                {/* আরও Employee cards */}
            </div>
        </div>
    );
};

export default Team; 
