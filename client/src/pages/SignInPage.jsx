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
          <i class="bi bi-arrow-left-short text-4xl"></i>
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
