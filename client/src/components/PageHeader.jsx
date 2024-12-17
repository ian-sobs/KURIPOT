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
      className={`navbar fixed w-screen flex justify-between items-center px-8 pr-12 text-[#FAFAFA] z-10 transition-all duration-300 ${
        scrolled ? "bg-[#15172E]" : "bg-transparent"
      }`}
    >
      <div>
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
        <div className="text-2xl md:mr-40 lg:mr-60 font-bold text-center">
          {title}
          {/* {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>} */}
        </div>
      </div>
      <div>
        <HamburgerIcon />
      </div>
    </div>
  );
};

export default PageHeader;
