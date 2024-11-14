import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const container = event.target;
    const itemWidth = container.firstChild.offsetWidth + 20; // Adjust the width calculation
    const scrollPosition = container.scrollLeft;

    const newActiveIndex = Math.round(scrollPosition / itemWidth);
    setActiveIndex(newActiveIndex);
  };

  return (
    <>
      <Navbar />

      <div className="landing-container w-full flex-col justify-center items-center overflow-hidden">
        <div className="slogan-container w-full bg-center-vertical p-6">
          <div className="slogan-container-content h-[250px] w-full flex items-center justify-between">
            <div className="slogan-container-slogan text-2xl text-[#FAFAFA]">
              "It's not the amount, <br /> but the habit."
            </div>
            <div className="slogan-container-media w-56">
              <img src="/images/landing-iphones.png" alt="" />
            </div>
          </div>
        </div>

        <div
          className="carousel-container mt-4 w-full flex justify-start overflow-x-auto overflow-hidden snap-x snap-mandatory px-[7.5%] scrollbar-hide"
          onScroll={handleScroll}
        >
          {/* Updated height to 350px for each item */}
          <div className="carousel-item flex-shrink-0 snap-center flex justify-center items-center w-[272px] h-[350px] overflow-hidden">
            <img
              src="/images/Carousel-first.png"
              className="rounded-box object-contain w-full h-full"
              alt="carousel-item"
            />
          </div>
          <div className="carousel-item flex-shrink-0 snap-center flex justify-center items-center w-[250px] h-[350px] mr-5 overflow-hidden">
            <img
              src="/images/Carousel-second.png"
              className="rounded-box object-contain w-full h-full"
              alt="carousel-item"
            />
          </div>
          <div className="carousel-item flex-shrink-0 snap-center flex justify-center items-center w-[250px] h-[350px] mr-5 overflow-hidden">
            <img
              src="/images/Carousel-third.png"
              className="rounded-box object-contain w-full h-full"
              alt="carousel-item"
            />
          </div>
          <div className="carousel-item flex-shrink-0 snap-center flex justify-center items-center w-[250px] h-[350px] mr-5 overflow-hidden">
            <img
              src="/images/Carousel-fourth.png"
              className="rounded-box object-contain w-full h-full"
              alt="carousel-item"
            />
          </div>
        </div>

        <div className="dot-container flex justify-center items-center space-x-2 mt-4 mb-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`dot w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                activeIndex === index ? "bg-[#9747FF]" : "bg-[#FAFAFA]"
              }`}
              onClick={() => {
                setActiveIndex(index);
                const container = document.querySelector(".carousel-container");
                const itemWidth = container.firstChild.offsetWidth + 20;
                container.scrollTo({
                  left: itemWidth * index,
                  behavior: "smooth",
                });
              }}
            ></div>
          ))}
        </div>

        <div className="description-container items-center text-center p-16 text-xl text-[#9747FF] font-bold">
          Your Personal Finance
          <br /> Tracker Application
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
