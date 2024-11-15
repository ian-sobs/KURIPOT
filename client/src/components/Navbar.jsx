import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        //lesser = smaller scroll
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
          <a href="#" className="flex items-center space-x-2">
            {/* place holder for logo */}
            <div className="logo text-xl font-bold">LOGO</div>
            <div className="logo-font text-lg font-extrabold">Kuripot</div>
          </a>
        </div>
        <div className="nav-end">
          <button className="font-normal">Login</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
