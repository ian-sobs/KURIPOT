import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { protectedRoute } from "../apiClient/axiosInstance";
import { useToken } from "../auth/TokenContext";

const GettingStarted = () => {
  const {isFirstLogin, setIsFirstLogin} = useToken()
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

  const handleFinish = () => {
    const formData = {
      username: username,
      // currency: currency
    }
    protectedRoute
      .patch("/user/finalizeUser", formData)
      .then((response) => {
        let { message } = response.data;
        console.log("message: ", message);
        setIsFirstLogin(false)
        navigate('/dashboard')
      })
      .catch((err) => {
        console.error("Error during submission:", err);
        // Handle network or request error
      });
  }

  // using a switch case since we wont be using these components again
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="username-container pt-24 pb-32 flex flex-col justify-center items-center">
            <h1 className="font-normal text-2xl text-center">
              Give us a nickname to call you by:
            </h1>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only letters, numbers, hyphens, and underscores, and limit to 15 characters
                if (/^[A-Za-z0-9_-]*$/.test(value) && value.length <= 15) {
                  setUsername(value);
                }
              }}
              maxLength={15}
              required
              placeholder="Username"
              className="p-2 mt-6 mb-2 w-full focus:outline-none placeholder-white font-light text-md text-white rounded-lg bg-slate-500 bg-opacity-90"
            />

            <button
              onClick={handleNextClick}
              className="signup-submit w-full bg-[#9747FF] text-white text-md font-semibold rounded-md p-2"
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
              className="p-2 mt-6 mb-2 w-full focus:outline-none placeholder-white font-light text-md text-white rounded-lg bg-slate-500 bg-opacity-90"
            >
              <option value="">Select Currency</option>

              <option value="php">PHP - Philippine Peso</option>
            </select>
            <button
              onClick={handleNextClick}
              className="signup-submit w-full bg-[#9747FF] text-white text-md font-semibold rounded-md p-2"
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className="confirmation-container pt-24 pb-32 flex flex-col items-center">
            <h1 className="font-bold text-4xl">Almost there!</h1>
            <h2 className="mt-6 font-normal text-lg">Confirm your details:</h2>
            <div className="input-summary mt-2 p-4 bg-slate-700 rounded-lg w-full max-w-md text-left">
              <p className="text-white">Username: {username}</p>
              <p className="text-white">
                Currency: {currency ? currency.toUpperCase() : "Not Selected"}
              </p>
            </div>
            <button
              onClick={handleFinish}
              className="signup-submit mt-2 w-full bg-[#9747FF] text-white text-sm font-medium rounded-md p-2"
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
            <i class="bi bi-arrow-left-short text-4xl"></i>
          </button>
          {renderStep()}
        </div>
      </div>
    </>
  );
};

export default GettingStarted;
