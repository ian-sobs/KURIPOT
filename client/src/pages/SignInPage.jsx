import React from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import SignInUpLayout from "../components/SignInUpLayout";
import Navbar from "../components/Navbar";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <SignInUpLayout>
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
        <h2 className="text-center text-3xl font-bold text-white mb-4 mt-6">
          Sign In
        </h2>
        <SignInForm />
      </SignInUpLayout>
    </>
  );
};

export default SignInPage;
