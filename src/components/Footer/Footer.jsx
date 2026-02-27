import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");

  // নিউজলেটার সাবস্ক্রিপশন হ্যান্ডেলার
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
    <footer className="bg-neutral !text-white pt-10 mt-0">
      <div className="footer max-w-7xl mx-auto px-10 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ১. লোগো ও বর্ণনা */}
        <aside className="flex flex-col gap-4">
          <Logo />
          <p className="font-black text-2xl !text-white tracking-tight mt-2 italic">Asset Verse</p>
          <p className="max-w-xs text-[15px] leading-relaxed !text-white opacity-100">
            Professional B2B HR & Asset Management solution.
            Track equipment and manage your team in one place.
          </p>
          <div className="flex gap-5 mt-4 text-2xl">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-white hover:text-[#6366f1] transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </aside>

        {/* ২. কুইক নেভিগেশন */}
        <nav>
          <h6 className="footer-title opacity-100 font-bold !text-white text-sm mb-6 uppercase tracking-widest border-b border-[#6366f1] pb-1 inline-block">
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
                className="!text-white hover:text-[#6366f1] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
        {/* ৩. কন্টাক্ট ইনফো (ঠিকানা সহ) */}
        <nav>
          <h6 className="footer-title opacity-100 font-bold !text-white text-sm mb-6 uppercase tracking-widest border-b border-[#6366f1] pb-1 inline-block">
            Contact Us
          </h6>
          <div className="flex flex-col gap-5 text-[15px] font-medium">
            <a href="mailto:support@assetverse.com" className="flex items-center gap-3 !text-white hover:text-[#6366f1]">
              <span className="text-[#6366f1] text-xl font-bold">✉</span>
              support@assetverse.com
            </a>
            <a href="tel:+880123456789" className="flex items-center gap-3 !text-white hover:text-[#6366f1]">
              <span className="text-[#6366f1] text-xl font-bold">📞</span>
              +880 123 456 789
            </a>
            {/* আপনার টেক সিটি ঠিকানাটি এখানে যোগ করা হলো */}
            <p className="flex items-center gap-3 !text-white">
              <span className="text-[#6366f1] text-xl font-bold">📍</span>
              Tech City, Corporate Zone, Dhaka
            </p>
          </div>
        </nav>

        {/* ৪. নিউজলেটার */}
        <div>
          <h6 className="footer-title opacity-100 font-bold !text-white text-sm mb-6 uppercase tracking-widest border-b border-[#6366f1] pb-1 inline-block">
            Newsletter
          </h6>
          <p className="text-sm !text-white mb-4 opacity-90">Get the latest updates and features.</p>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-sm shadow-xl rounded-xl overflow-hidden border border-white/10">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-full bg-white/5 !text-white focus:outline-none focus:bg-white/10 transition-all placeholder:text-gray-400"
              placeholder="Your Email"
            />
            <button type="submit" className="bg-[#6366f1] px-5 py-2 font-bold hover:bg-[#4f46e5] transition-all text-white border-none">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="bg-black/20 !text-white border-t border-white/10 py-4 px-10">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <aside>
            <p className="text-xs sm:text-sm font-bold !text-white uppercase tracking-wide opacity-80">
              Copyright © {new Date().getFullYear()} - All right reserved by
              <span className="text-[#330ddd] ml-1">Asset Verse Ltd.</span>
            </p>
          </aside>
        </div>
      </div>
    </footer>
  );
};

export default Footer;