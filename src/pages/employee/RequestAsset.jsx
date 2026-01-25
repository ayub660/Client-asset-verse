// src/pages/employee/RequestAsset.jsx
import React from "react";

const RequestAsset = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Request an Asset</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                <div className="card bg-white shadow p-4 rounded">
                    <img src="/src/assets/images/feature1.png" alt="Asset 1" className="mb-4 rounded" />
                    <h2 className="font-bold text-xl mb-2">Laptop</h2>
                    <p className="mb-4">Available: 5</p>
                    <button className="btn btn-primary w-full">Request</button>
                </div>
                <div className="card bg-white shadow p-4 rounded">
                    <img src="/src/assets/images/feature2.png" alt="Asset 2" className="mb-4 rounded" />
                    <h2 className="font-bold text-xl mb-2">Keyboard</h2>
                    <p className="mb-4">Available: 10</p>
                    <button className="btn btn-primary w-full">Request</button>
                </div>
                {/* আরো asset cards */}
            </div>
        </div>
    );
};

export default RequestAsset; // ✅ Default export
