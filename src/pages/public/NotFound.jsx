// src/pages/public/NotFound.jsx
import React from "react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl mt-4">Page Not Found</p>
        </div>
    );
};

export default NotFound;  // ✅ default export
