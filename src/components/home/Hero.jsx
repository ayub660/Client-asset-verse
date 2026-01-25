// src/components/home/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/hero.png";

const Hero = () => {
    return (
        <div className="hero min-h-[90vh] bg-indigo-100">
            <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                <img
                    src={HeroImg}
                    alt="Hero"
                    className="max-w-lg rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold leading-tight mb-4 text-indigo-900">
                        Smart Asset Management <br /> for Modern Companies
                    </h1>
                    <p className="py-6 text-indigo-700">
                        Track, manage, and optimize all company assets with full control and insights.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/login" className="btn btn-outline btn-lg">
                            Login
                        </Link>
                        <Link to="/register-employee" className="btn btn-primary btn-lg">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
