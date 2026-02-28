import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "Thanks for joining our newsletter.",
        timer: 2000,
        showConfirmButton: false,
      });
      setEmail("");
    }
  };

  const socialLinks = [
    { id: 1, icon: <FaXTwitter />, url: "https://x.com" },
    { id: 2, icon: <FaYoutube />, url: "https://youtube.com" },
    { id: 3, icon: <FaFacebookF />, url: "https://facebook.com" },
    { id: 4, icon: <FaLinkedinIn />, url: "https://linkedin.com" },
  ];

  return (
    // bg-[#111827] ব্যবহার করা হয়েছে যাতে ফুটার সবসময় ডার্ক থাকে, লাইট মোডেও।
    <footer className="bg-[#111827] !text-white pt-12 mt-0">
      <div className="footer max-w-7xl mx-auto px-6 md:px-10 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ১. লোগো ও বর্ণনা */}
        <aside className="flex flex-col gap-5">
          <div className="p-2 bg-white rounded-xl w-fit shadow-md">
            <Logo />
          </div>
          <p className="font-black text-2xl tracking-tight italic !text-white">Asset Verse</p>
          {/* !text-gray-300 ব্যবহার করা হয়েছে যাতে এটি সব মোডে দৃশ্যমান হয় */}
          <p className="max-w-xs text-[15px] leading-relaxed !text-gray-300 opacity-100">
            Professional B2B HR & Asset Management solution.
            Track equipment and manage your team in one place.
          </p>
          <div className="flex gap-5 mt-2 text-2xl">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-gray-400 hover:!text-indigo-500 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </aside>

        {/* ২. কুইক নেভিগেশন */}
        <nav>
          <h6 className="font-bold !text-white text-sm mb-6 uppercase tracking-widest border-b-2 border-indigo-600 pb-1 inline-block">
            Quick Links
          </h6>
          <div className="flex flex-col gap-4 font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "Join as Employee", path: "/register-employee" },
              { name: "Join as HR Manager", path: "/register-hr" },
              { name: "Login", path: "/login" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                className="!text-gray-300 hover:!text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* ৩. কন্টাক্ট ইনফো */}
        <nav>
          <h6 className="font-bold !text-white text-sm mb-6 uppercase tracking-widest border-b-2 border-indigo-600 pb-1 inline-block">
            Contact Us
          </h6>
          <div className="flex flex-col gap-5 text-[15px] font-medium">
            <a href="mailto:support@assetverse.com" className="flex items-center gap-3 !text-gray-300 hover:!text-white transition-all">
              <span className="text-indigo-500 text-xl font-bold">✉</span>
              md.ayub0070@gmail.com
            </a>
            <a href="tel:+880123456789" className="flex items-center gap-3 !text-gray-300 hover:!text-white transition-all">
              <span className="text-indigo-500 text-xl font-bold">📞</span>
              +880 1701000467
            </a>
            <p className="flex items-center gap-3 !text-gray-300">
              <span className="text-indigo-500 text-xl font-bold">📍</span>
              Tech City, Corporate Zone, Dhaka
            </p>
          </div>
        </nav>

        {/* ৪. নিউজলেটার */}
        <div>
          <h6 className="font-bold !text-white text-sm mb-6 uppercase tracking-widest border-b-2 border-indigo-600 pb-1 inline-block">
            Newsletter
          </h6>
          <p className="text-sm !text-gray-300 mb-4">Get the latest updates and features.</p>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-sm rounded-xl overflow-hidden border border-gray-700">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-full bg-gray-800 !text-white focus:outline-none focus:bg-gray-700 transition-all placeholder:!text-gray-500"
              placeholder="Your Email"
            />
            <button type="submit" className="bg-indigo-600 px-5 py-2 font-bold hover:bg-indigo-700 transition-all !text-white border-none cursor-pointer">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* ৫. কপিরাইট অংশ */}
      <div className="bg-[#0a0f1a] border-t border-gray-800 py-6 px-10 mt-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <p className="text-xs sm:text-sm font-bold !text-gray-500 uppercase tracking-widest text-center">
            Copyright © {new Date().getFullYear()} - All right reserved by
            <span className="text-indigo-500 ml-1">Asset Verse Ltd.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;