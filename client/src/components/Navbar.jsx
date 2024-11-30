import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Initialize the navigate function

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

  // Check if the current route is the landing page
  const isLandingPage = location.pathname === "/";

  // Handle Sign In button click
  const handleSignInClick = () => {
    navigate("/signup"); // Navigate to the Sign Up page
  };

  return (
    <div
      className={`navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 sm:px-8 md:px-10 text-[#FAFAFA] z-10 transition-all duration-300 ${
        scrolled ? "bg-[#15172E]" : "bg-transparent"
      }`}
    >
      <div className="nav-start flex items-center">
        <a href="/" className="flex items-center space-x-2">
          {/* place holder for logo */}
          <div className="logo text-xl font-bold">LOGO</div>
          <div className="logo-font text-lg font-extrabold">Kuripot</div>
        </a>
      </div>
      <div className="nav-end">
        {/* Conditionally render the "Sign In" button */}
        {isLandingPage && (
          <button className="font-normal" onClick={handleSignInClick}>
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
