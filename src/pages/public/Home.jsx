// src/pages/public/Home.jsx
import React from "react";
import Hero from "../../components/home/Hero";
import About from "../../components/home/About";
import Features from "../../components/home/Features";
import Packages from "../../components/home/Packages";

const Home = () => {
    return (
        <div className="bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
            <Hero />
            <About />
            <Features />
            <Packages />
        </div>
    );
};

export default Home;
