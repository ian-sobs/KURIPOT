import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-[#15172E]/50 text-base-content px-8 py-12 block">
      <h2 className="text-2xl text-[#9747FF] font-bold">Connect With Us</h2>
      <p className="text-md mt-4 text-md">
        Subscribe to our newsletter for the latest tips, updates, and insights
        on managing your finances effectively. Get expert advice directly to
        your inbox!
      </p>
      <div className="email-button items-center mt-8 block">
        <input
          type="text"
          name="email"
          placeholder="Enter Your Email"
          className="px-4 py-2 border border-gray-500 border-r-0 bg-transparent rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#9747FF]"
        />
        <button className="px-4 py-2 bg-[#9747FF] text-white font-light rounded-r-md hover:bg-[#7c36cc] transition-all">
          Join Now
        </button>
      </div>
      <div className="footer-divider h-1 w-full bg-[#9747FF] rounded-md mt-8 mb-4"></div>
      <p>2024. All rights reserved.</p>
      <div className="socials-container flex flex-row justify-center pt-6 space-x-2">
        <i class="bi bi-facebook text-xl"></i>
        <i class="bi bi-linkedin text-xl"></i>
        <i class="bi bi-github text-xl"></i>
      </div>
    </footer>
  );
};

export default Footer;
