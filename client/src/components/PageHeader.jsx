import React, { useState, useEffect } from "react";

const PageHeader = ({ title, subtitle }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar fixed w-full flex justify-between items-center px-6 sm:px-8 md:px-10 text-[#FAFAFA] z-10 transition-all duration-300 ${
        scrolled ? "bg-[#15172E]" : "bg-transparent"
      }`}
    >
      <div className="flex items-center">
        <i className="bi bi-arrow-left text-xl cursor-pointer"></i>
      </div>

      {/* Centered Title */}
      <div className="flex items-center justify-center w-full">
        <div className="text-2xl font-bold text-center">
          {title}
          {/* if w subtitle */}
          {/* <div className="text-xs text-gray-400">{subtitle}</div> */}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
