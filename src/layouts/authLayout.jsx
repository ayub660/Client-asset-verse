import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <header className="sticky top-0 z-50 shadow-sm bg-base-100">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-base-200 border-t mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;
