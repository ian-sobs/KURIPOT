import React, { useState, useEffect } from "react";
import HamburgerIcon from "./HamburgerIcon";

const PageHeader = ({ title, subtitle, onBackClick }) => {
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
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="text-xl cursor-pointer focus:outline-none"
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        )}
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="text-2xl font-bold text-center">
          {title}
          {/* {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>} */}
        </div>
      </div>
      <HamburgerIcon />
    </div>
  );
};

export default PageHeader;
