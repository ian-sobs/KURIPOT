import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        root: document.querySelector(".carousel-container"), // Only observe within the carousel container
        threshold: 0.5, // At least 50% of the item should be visible
      }
    );

    itemRefs.current.forEach((item) => observer.observe(item));

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

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

        <div className="carousel-container mt-4 w-full flex justify-start overflow-x-auto snap-x snap-mandatory px-[7.5%] scrollbar-hide">
          {[0, 1, 2, 3].map((_, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className="carousel-item flex-shrink-0 snap-center flex justify-center items-center w-[250px] h-[350px] mr-5 overflow-hidden"
            >
              <img
                src={`/images/Carousel-${index + 1}.png`}
                className="rounded-box object-contain w-[250px] h-[350]px"
                alt={`carousel-item-${index}`}
              />
            </div>
          ))}
        </div>

        <div className="dot-container flex justify-center items-center space-x-2 mt-4 mb-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`dot w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                activeIndex === index ? "bg-[#9747FF]" : "bg-[#FAFAFA]"
              }`}
              onClick={() => {
                itemRefs.current[index].scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
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
