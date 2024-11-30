import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PageHeader = ({ title, subtitle }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      className={`navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-10 text-[#FAFAFA] z-10 transition-all duration-300 ${
        scrolled ? "bg-[#15172E]" : "bg-transparent"
      }`}
    >
      <div>
        <div className="text-2xl">
          {title}
          <div className="text-xs text-gray-400">{subtitle}</div>
        </div>
      </div>
      <div className="nav-end">
        {/* You can add any additional buttons or links here */}
        {/* For example, you can add a sign-in button here */}
      </div>
    </div>
  );
};

export default PageHeader;
