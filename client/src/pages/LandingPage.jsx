import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);
  const navigate = useNavigate();

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

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <Navbar />

      <div className="landing-container pt-12 w-full flex-col justify-center items-center overflow-hidden">
        <div className="slogan-container page-with-navhead w-full bg-center-vertical h-[250px] md:h-[350px] lg:h-[450px] pl-6 pr-2 flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
          <div className="slogan-container-left">
            <h1 className="text-xl font-medium md:text-2xl md:font-semibold lg:text-3xl text-white">
              "It's not the amount, <br className="md:hidden" /> but the habit."
            </h1>
            <button
              onClick={handleSignUpClick}
              className="mt-4 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-[#9747FF] text-white text-sm md:text-base lg:text-lg font-semibold rounded-lg"
            >
              Get Started
            </button>
          </div>
          <div className="slogan-container-right max-w-56 md:max-w-72 lg:max-w-96">
            <img
              src="/images/landing-iphones.png"
              alt=""
              className="min-h-48 md:min-h-64 lg:min-h-80"
            />
          </div>
        </div>

        <div className="carousel-container mt-14 lg:mt-24 w-full flex justify-start lg:justify-center overflow-x-auto lg:overflow-x-hidden snap-x snap-mandatory scrollbar-hide space-x-4 px-6">
          {[0, 1, 2, 3].map((_, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className="carousel-item flex-shrink-0 snap-center flex justify-center items-center w-[250px] h-[350px] md:w-[300px] md:h-[400px] overflow-hidden"
            >
              <img
                src={`/images/Carousel-${index + 1}.png`}
                className="rounded-box object-contain w-[250px] h-[350px] md:w-[300px] md:h-[400px]"
                alt={`carousel-item-${index}`}
              />
            </div>
          ))}
        </div>

        <div className="dot-container flex justify-center items-center space-x-2 mt-4 mb-4 md:hidden">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`dot w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
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

        <div className="review-container flex flex-col justify-center items-center pt-10 m-6 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Feedback that matters.
          </h2>
          <div className="review-content flex flex-col justify-center items-center space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="review flex flex-col justify-center items-center pt-2 px-12"
              >
                <div className="stars flex justify-center space-x-1 pt-4 pb-2">
                  {Array.from({ length: review.stars }).map((_, starIndex) => (
                    <i className="bi bi-star-fill text-2xl md:text-3xl lg:text-4xl text-yellow-400"></i>
                  ))}
                  {Array.from({ length: 5 - review.stars }).map(
                    (_, starIndex) => (
                      <i className="bi bi-star text-2xl md:text-3xl lg:text-4xl text-yellow-400"></i>
                    )
                  )}
                </div>

                <div className="reviewer-name text-sm md:text-base lg:text-lg text-slate-400">
                  {review.name}
                </div>
                <div className="reviewer-desc text-center pt-6 pb-8 lg:w-1/2 text-sm md:text-base lg:text-lg">
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
