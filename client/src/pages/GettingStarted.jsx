import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const GettingStarted = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [currency, setCurrency] = useState("");

  const handleBackClick = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep(step - 1);
    }
  };

  const handleNextClick = () => {
    if (step === 1 && !username.trim()) {
      alert("Please enter a username before proceeding.");
      return;
    }
    if (step === 2 && !currency) {
      alert("Please select a currency before proceeding.");
      return;
    }
    setStep(step + 1);
  };

  // using a switch case since we wont be using these components again
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="username-container pt-24 pb-32 flex flex-col justify-center items-center">
            <h1 className="font-normal text-md text-center">
              Give us a nickname to call you by:
            </h1>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              className="p-2 mt-8 mb-2 w-52 focus:outline-none placeholder-white font-light text-sm text-white rounded-lg bg-slate-500 bg-opacity-90"
            />
            <button
              onClick={handleNextClick}
              className="signup-submit w-52 bg-[#9747FF] text-white text-sm font-medium rounded-md p-2"
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="currency-container pt-24 pb-32 flex flex-col justify-center items-center">
            <h1 className="font-normal text-3xl">Hi {username},</h1>
            <h2 className="font-normal text-lg">Let's get you set up.</h2>
            <select
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 mt-8 mb-2 w-52 focus:outline-none placeholder-white font-light text-sm text-white rounded-lg bg-slate-500 bg-opacity-90"
            >
              <option value="">Select Currency</option>

              <option value="php">PHP - Philippine Peso</option>
            </select>
            <button
              onClick={handleNextClick}
              className="signup-submit w-52 bg-[#9747FF] text-white text-sm font-medium rounded-md p-2"
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className="confirmation-container pt-24 pb-32 flex flex-col justify-center items-center">
            <h1 className="font-normal text-md">
              Almost there! Confirm your details
            </h1>
            <div className="mt-8">
              <p className="text-white">Username: {username}</p>
              <p className="text-white">
                Currency: {currency ? currency.toUpperCase() : "Not Selected"}
              </p>
            </div>
            <button
              onClick={handleBackClick}
              className="signup-submit w-52 bg-[#9747FF] text-white text-sm font-medium rounded-md p-2 mt-8"
            >
              Finish
            </button>
          </div>
        );
      default:
        return <h1 className="text-center">Unexpected step</h1>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="getting-started-container min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
        <div className="getting-started-content m-8 max-w-2xl w-full bg-gradient-to-b from-[#2F81AE33] to-[#00000033] p-8 rounded-badge shadow-lg overflow-hidden">
          <button
            onClick={handleBackClick}
            className="text-white flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bi bi-arrow-left-short w-10 h-10"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </button>
          {renderStep()}
        </div>
      </div>
    </>
  );
};

export default GettingStarted;
