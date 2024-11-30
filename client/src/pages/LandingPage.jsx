import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  const reviews = [
    {
      name: "Katrina Ventura on AppStore",
      stars: 5,
      description:
        "Great app! Definitely helped me with my Valorant skills. I went from Iron 1 to Iron 31.6! GG Guys! Yawa yawa yawa!! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      name: "Ian Sobrecaray on AppStore",
      stars: 4,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae facere ut consequuntur eos eius dolorum possimus aliquid hic vero dolorem optio, vitae totam illum. Quod, cumque. Id nobis autem eum?",
    },
    {
      name: "Christian Abay-abay on AppStore",
      stars: 5,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae facere ut consequuntur eos eius dolorum possimus aliquid hic vero dolorem optio, vitae totam illum. Quod, cumque. Id nobis autem eum?",
    },
  ];

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
        root: document.querySelector(".carousel-container"),
        threshold: 0.5,
      }
    );

    itemRefs.current.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <div className="landing-container pt-12 backdrop:w-full flex-col justify-center items-center overflow-hidden">
        <div className="slogan-container w-full bg-center-vertical h-[250px] pl-6 pr-2 flex items-center justify-between">
          <div className="slogan-container-left">
            <h1 className="text-xl text-white">
              "It's not the amount, <br /> but the habit."
            </h1>
            <button className="mt-4 px-4 py-2 bg-[#9747FF] text-white text-sm font-semibold rounded-lg">
              Get Started
            </button>
          </div>
          <div className="slogan-container-right max-w-56">
            <img
              src="/images/landing-iphones.png"
              alt=""
              className="min-h-48"
            />
          </div>
        </div>

        <div className="carousel-container mt-14 w-full flex justify-start overflow-x-auto snap-x snap-mandatory px-[22%] scrollbar-hide">
          {[0, 1, 2, 3].map((_, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className="carousel-item flex-shrink-0 snap-center flex justify-center items-center w-[250px] h-[350px] mr-5 overflow-hidden"
            >
              <img
                src={`/images/Carousel-${index + 1}.png`}
                className="rounded-box object-contain w-[250px] h-[350px]"
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

        <div className="review-container flex flex-col justify-center items-center pt-10 bg-gradient-to-r from-[#442D8F] via-[#180655] to-[#442D8F] bg-opacity-25 text-white rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-semibold">Feedback that matters.</h2>
          <div className="review-content flex flex-col justify-center items-center space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="review flex flex-col justify-center items-center pt-2 px-12"
              >
                <div className="stars pt-4">
                  {"★".repeat(review.stars)} {"☆".repeat(5 - review.stars)}{" "}
                </div>
                <div className="reviewer-name text-sm text-slate-400">
                  {review.name}
                </div>
                <div className="reviewer-desc text-center pt-6 pb-6">
                  {review.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
