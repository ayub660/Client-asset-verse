import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Stats from "../Stats/Stats";
import RoleBasedBenefits from "../RoleBasedBenefits/RoleBasedBenefits";
import Packages from "../Packages/Packages";

const Home = () => {
  return (
    /* bg-white সরিয়ে bg-base-100 করা হয়েছে যাতে থিম অনুযায়ী কালার বদলায় */
    <div className="bg-base-100 text-base-content transition-colors duration-300">
      <Helmet><title>Home | AssetVerse</title></Helmet>

      {/* Hero & Stats */}
      <Banner />
      <div className="mt-[-20px] pb-10">
        <Stats />
      </div>

      {/* About Section */}
      <About />

      {/* Benefits - bg-base-200 যোগ করা যেতে পারে হালকা ডিফারেন্সের জন্য */}
      <section className="py-12 bg-base-200/50">
        <RoleBasedBenefits />
      </section>

      {/* Pricing - এটি অলরেডি gray-900 তাই ডার্ক মোডেও ঠিক থাকবে, 
          তবে rounded লুকটা বজায় রাখতে bg-gray-900 রাখা হয়েছে */}
      <section className="py-12 bg-gray-900 dark:bg-black text-white rounded-t-[3rem]">
        <Packages />
      </section>
    </div>
  );
};

export default Home;