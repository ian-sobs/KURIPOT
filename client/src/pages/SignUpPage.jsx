import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import SignUpLayout from "../components/SignInUpLayout";
import Navbar from "../components/Navbar";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <SignUpLayout>
        <button
          onClick={handleBackClick}
          className="text-white flex items-center space-x-2"
        >
          <i class="bi bi-arrow-left-short text-4xl"></i>
        </button>
        <h2 className="text-center text-3xl font-bold text-white mb-4">
          Sign Up
        </h2>
        <SignUpForm />
      </SignUpLayout>
    </>
  );
};

export default SignUpPage;
