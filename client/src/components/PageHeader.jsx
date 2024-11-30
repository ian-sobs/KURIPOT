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
    <>
      <div
        className={`navbar sticky top-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-10 text-[#FAFAFA] z-10 transition-all duration-300 ${
          scrolled ? "bg-[#15172E]" : "bg-transparent"
        }`}
      >
        <div className="nav-start flex items-center">
          <div className="text-2xl">
            {title}
            <div className="text-xs text-gray-400">{subtitle}</div>
          </div>
        </div>
        <div className="nav-end">
          <button className="font-normal">Notif??</button>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
