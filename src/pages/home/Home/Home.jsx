import React from "react";
import { Helmet } from "react-helmet";

import About from "../About/About";
import Stats from "../Stats/Stats";
import SecurityTrust from "../SecurityTrust/SecurityTrust";
import HowItWorks from "../HowItWorks/HowItWorks";
import RoleBasedBenefits from "../RoleBasedBenefits/RoleBasedBenefits";
import Packages from "../Packages/Packages";
import Features from "../../../components/home/Features";
import Hero from "../../../components/home/Hero";


const Home = () => {
  return (

    <div className="bg-base-100 text-base-content transition-colors duration-300">
      <Helmet><title>Home | AssetVerse</title></Helmet>



      {/* <Banner /> */}
      <Hero></Hero>
      <div className="mt-[-20px] pb-10">
        <Stats />
      </div>
      <About />
      <Features></Features>
      <RoleBasedBenefits></RoleBasedBenefits>
      <SecurityTrust></SecurityTrust>
      <HowItWorks></HowItWorks>

      <section className="py-12 bg-gray-900 dark:bg-black text-white rounded-t-[3rem]">
        <Packages />
      </section>
    </div>
  );
};

export default Home;