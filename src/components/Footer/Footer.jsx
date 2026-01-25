import React from "react";
import Logo from "../Logo/Logo";
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // bg-neutral ব্যাকগ্রাউন্ড এবং সরাসরি !text-white ফোর্স করা হয়েছে
    <footer className="bg-neutral !text-white pt-16">
      <div className="footer max-w-7xl mx-auto px-10 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ১. ব্র্যান্ডিং ও পরিচিতি - এখানে সব টেক্সট white */}
        <aside className="flex flex-col gap-4">
          <Logo />
          {/* text-white !important স্টাইল দিয়ে কনফার্ম করা হলো */}
          <p className="font-black text-2xl !text-white tracking-tight mt-2">Asset Verse</p>
          <p className="max-w-xs text-[15px] leading-relaxed !text-white opacity-100">
            Professional B2B HR & Asset Management solution.
            Efficiently track equipment and manage your team in one place.
          </p>
          <div className="flex gap-5 mt-4 text-2xl">
            <a href="#" className="!text-white hover:text-primary transition-all"><FaXTwitter /></a>
            <a href="#" className="!text-white hover:text-primary transition-all"><FaYoutube /></a>
            <a href="#" className="!text-white hover:text-primary transition-all"><FaFacebookF /></a>
            <a href="#" className="!text-white hover:text-primary transition-all"><FaLinkedinIn /></a>
          </div>
        </aside>

        {/* ২. কুইক নেভিগেশন - সব লিঙ্ক এখন Pure White */}
        <nav>
          <h6 className="footer-title opacity-100 font-bold !text-white text-sm mb-6 uppercase tracking-widest border-b border-primary pb-1 inline-block">
            Quick Links
          </h6>
          <div className="flex flex-col gap-4 font-medium">
            <Link to="/" className="!text-white hover:text-primary transition-colors">Home</Link>
            <Link to="/join-employee" className="!text-white hover:text-primary transition-colors">Join as Employee</Link>
            <Link to="/join-hr" className="!text-white hover:text-primary transition-colors">Join as HR Manager</Link>
            <Link to="/login" className="!text-white hover:text-primary transition-colors">Login</Link>
          </div>
        </nav>

        {/* ৩. কন্টাক্ট ইনফো - সব টেক্সট Pure White */}
        <nav>
          <h6 className="footer-title opacity-100 font-bold !text-white text-sm mb-6 uppercase tracking-widest border-b border-primary pb-1 inline-block">
            Contact Us
          </h6>
          <div className="flex flex-col gap-5 text-[15px] font-medium">
            <p className="flex items-center gap-3 !text-white">
              <span className="text-primary text-xl font-bold">✉</span>
              support@assetverse.com
            </p>
            <p className="flex items-center gap-3 !text-white">
              <span className="text-primary text-xl font-bold">📞</span>
              +880 123 456 789
            </p>
            <p className="flex items-center gap-3 !text-white">
              <span className="text-primary text-xl font-bold">📍</span>
              Tech City, Corporate Zone, Dhaka
            </p>
          </div>
        </nav>
      </div>

      {/* কপিরাইট সেকশন */}
      <div className="footer footer-center p-8 bg-black/20 !text-white border-t border-white/10">
        <aside>
          <p className="text-sm font-bold !text-white uppercase tracking-wide">
            Copyright © {new Date().getFullYear()} - All right reserved by
            <span className="text-primary ml-1">Asset Verse Ltd.</span>
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;