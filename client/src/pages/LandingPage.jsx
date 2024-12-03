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

      <div className="landing-container pt-12 backdrop:w-full flex-col justify-center items-center overflow-hidden">
        <div className="slogan-container w-full bg-center-vertical h-[250px] pl-6 pr-2 flex items-center justify-between">
          <div className="slogan-container-left">
            <h1 className="text-xl text-white">
              "It's not the amount, <br /> but the habit."
            </h1>
            <button
              onClick={handleSignUpClick}
              className="mt-4 px-4 py-2 bg-[#9747FF] text-white text-sm font-semibold rounded-lg"
            >
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

        <div className="review-container flex flex-col justify-center items-center pt-10 m-6 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-semibold mb-4">
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
                    <svg
                      key={`filled-${starIndex}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-star-fill text-yellow-400 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  ))}
                  {Array.from({ length: 5 - review.stars }).map(
                    (_, starIndex) => (
                      <svg
                        key={`hollow-${starIndex}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-star text-yellow-400 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    )
                  )}
                </div>

                <div className="reviewer-name text-sm text-slate-400">
                  {review.name}
                </div>
                <div className="reviewer-desc text-center pt-6 pb-8">
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
