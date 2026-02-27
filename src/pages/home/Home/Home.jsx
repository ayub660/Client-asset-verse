import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

// Image import
import feature4 from "../../../assets/images/feature4.png";
import feature5 from "../../../assets/images/feature5.png";
import feature6 from "../../../assets/images/feature6.png"

//Component import
import About from "../About/About";
import Stats from "../Stats/Stats";
import SecurityTrust from "../SecurityTrust/SecurityTrust";
import HowItWorks from "../HowItWorks/HowItWorks";
import RoleBasedBenefits from "../RoleBasedBenefits/RoleBasedBenefits";
import Packages from "../Packages/Packages";
import Features from "../../../components/home/Features";
import Loader from "../../../components/common/Loader";

const Home = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);

  const sliderData = [
    { id: 4, img: feature4 },
    { id: 5, img: feature5 },
    { id: 6, img: feature6 },

  ];


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (!isPageLoading) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === sliderData.length ? 1 : prev + 1));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPageLoading, sliderData.length]);


  useEffect(() => {
    const element = document.getElementById(`slide${currentSlide}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }, [currentSlide]);

  if (isPageLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-gray-950">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-base-100 text-base-content transition-colors duration-300">
      <Helmet>
        <title>Home | AssetVerse</title>
      </Helmet>

      {/* --- Auto Slider Section --- */}
      <section className="container mx-auto px-4 mt-6 md:mt-8">
        <div className="carousel w-full h-[50vh] md:h-[60vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
          {sliderData.map((slide) => (
            <div
              key={slide.id}
              id={`slide${slide.id}`}
              className="carousel-item relative w-full h-full"
            >
              <img
                src={slide.img}
                className="w-full h-full object-cover"
                alt="Banner"
              />


              <div className="absolute inset-0 bg-black/60 flex items-center justify-start text-left px-10 md:px-24">
                <div className="max-w-2xl space-y-4 md:space-y-6">
                  <h1
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-2xl"
                    style={{ color: '#ffffff' }}
                  >
                    Smart Asset Management for <br />
                    <span className="font-normal" style={{ color: '#ffffff' }}>Modern Companies</span>
                  </h1>

                  <p
                    className="text-sm md:text-base lg:text-lg font-medium leading-relaxed drop-shadow-md"
                    style={{ color: '#ffffff' }}
                  >
                    Track, manage, and optimize all company assets with full control, security, and real-time insights in one unified platform.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      to="/login"
                      className="btn btn-primary border-none text-white bg-indigo-600 hover:bg-indigo-700 px-8 rounded-lg font-bold"
                    >
                      Join as HR
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-outline border-white text-white hover:bg-white hover:text-black px-8 rounded-lg transition-all duration-300 font-bold"
                    >
                      Join as Employee
                    </Link>
                  </div>
                </div>
              </div>


              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
                <button
                  onClick={() => setCurrentSlide(slide.id === 1 ? 3 : slide.id - 1)}
                  className="btn btn-circle btn-sm md:btn-md bg-white/10 border-none text-white hover:bg-white/30"
                >
                  ❮
                </button>
                <button
                  onClick={() => setCurrentSlide(slide.id === 3 ? 1 : slide.id + 1)}
                  className="btn btn-circle btn-sm md:btn-md bg-white/10 border-none text-white hover:bg-white/30"
                >
                  ❯
                </button>
              </div>
            </div>
          ))}
        </div>


        <div className="flex justify-center w-full py-2 gap-2">
          {sliderData.map((s) => (
            <div
              key={s.id}
              className={`h-2 w-2 rounded-full transition-all ${currentSlide === s.id ? "bg-indigo-600 w-6" : "bg-gray-300"}`}
            ></div>
          ))}
        </div>
      </section>

      {/* --- Baki section--- */}
      <div className="mt-[-20px] md:mt-[-30px] pb-10 relative z-30">
        <Stats />
      </div>
      <About />
      <div className="py-10">
        <Features />
      </div>
      <RoleBasedBenefits />
      <SecurityTrust />
      <HowItWorks />

      <section className="py-16 bg-gray-900 dark:bg-black text-white rounded-t-[3rem] md:rounded-t-[5rem] mt-10">
        <Packages />
      </section>
    </div>
  );
};

export default Home;