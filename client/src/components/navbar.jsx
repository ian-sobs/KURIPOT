import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navbar flex justify-between items-center px-6 sm:px-8 md:px-10 text-[#FAFAFA]">
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
