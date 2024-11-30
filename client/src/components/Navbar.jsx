import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
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

  const isLandingPage = location.pathname === "/";

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div
      className={`navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-10 text-[#FAFAFA] z-10 transition-all duration-300 ${
        scrolled ? "bg-[#15172E]" : "bg-transparent"
      }`}
    >
      <div
        className="nav-start flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <img
          src="/images/kuripot-logo.png"
          alt="kuripot-logo"
          className="h-10"
        />
        <div className="logo-font text-xl font-extrabold">Kuripot</div>
      </div>
      <div className="nav-end">
        {isLandingPage && (
          <button className="font-normal" onClick={handleSignInClick}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
