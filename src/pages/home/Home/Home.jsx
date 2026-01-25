import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Stats from "../Stats/Stats";
import RoleBasedBenefits from "../RoleBasedBenefits/RoleBasedBenefits";
import Packages from "../Packages/Packages";

const Home = () => {
  return (
    <div className="bg-white">
      <Helmet><title>Home | AssetVerse</title></Helmet>

      {/* Hero & Stats - Combined for space saving */}
      <Banner />
      <div className="mt-[-20px] pb-10">
        <Stats />
      </div>

      {/* Feature Section with feature2 */}
      <About />

      {/* Benefits - Reduced Padding */}
      <section className="py-12">
        <RoleBasedBenefits />
      </section>

      {/* Pricing - Compact Look */}
      <section className="py-12 bg-gray-900 text-white rounded-t-[3rem]">
        <Packages />
      </section>
    </div>
  );
};

export default Home;