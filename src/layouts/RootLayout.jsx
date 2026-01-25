import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* SEO / Title */}
            <Helmet>
                <title>AssetVerse | Manage Assets Smarter</title>
            </Helmet>

            {/* Navbar - এক জায়গায় থাকবে, সব পেজে কাজ করবে */}
            <Navbar />

            {/* Main content - Home, Assets, Profile সব এখানে লোড হবে */}
            <main className="flex-1 w-full max-w-[1920px] mx-auto overflow-x-hidden">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RootLayout;