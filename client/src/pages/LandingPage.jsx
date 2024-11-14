import React from "react";
import Navbar from "../components/navbar";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="landing-container w-full h-screen flex-col justify-center items-center">
        <div className="description-container items-center text-center p-16 text-xl text-[#9747FF] font-bold">
          Your Personal Finance
          <br /> Tracker Application
        </div>
        <div className="slogan-container w-full h-56 bg-center-vertical p-6">
          <div className="slogan-container-content h-full w-full flex items-center justify-between">
            <div className="slogan-container-slogan text-2xl text-[#FAFAFA]">
              "It's not the amount, <br /> but the habit."
            </div>
            <div className="slogan-container-media-placeholder">
              placeholder
            </div>
          </div>
        </div>
        <div className="carousel-container w-full h-64 flex justify-center overflow-x-auto snap-x snap-mandatory p-4 space-x-4">
          <div className="carousel-item h-full w-[85%] flex-shrink-0 snap-center flex justify-center items-center m-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="rounded-box bg-red-500 h-full w-full object-cover"
              alt="carousel-item"
            />
          </div>
          <div className="carousel-item h-full w-[85%] flex-shrink-0 snap-center flex justify-center items-center m-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="rounded-box bg-red-500 h-full w-full object-cover"
              alt="carousel-item"
            />
          </div>
          <div className="carousel-item h-full w-[85%] flex-shrink-0 snap-center flex justify-center items-center m-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="rounded-box bg-red-500 h-full w-full object-cover"
              alt="carousel-item"
            />
          </div>
          <div className="carousel-item h-full w-[85%] flex-shrink-0 snap-center flex justify-center items-center m-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="rounded-box bg-red-500 h-full w-full object-cover"
              alt="carousel-item"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
