import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { unprotectedRoute } from "../apiClient/axiosInstance.js";
import { TokenContext } from "../auth/TokenContext.jsx";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
  });
  const { accessToken, setAccessToken } = useContext(TokenContext);
  useEffect(() => {
    console.log("React-context access token updated:", accessToken);
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors on change
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    console.log("Form Submitted:", formData);
    // API logic here
    unprotectedRoute
      .post("/entry/signUp", formData)
      .then((response) => {
        if (response.status === 201) {
          let { message, user, accessToken, isFirstLogin } = response.data;
          console.log("message: ", message);
          console.log("user: ", user);
          console.log("Access token: ", accessToken);
          setAccessToken(accessToken);
          navigate("/getting-started", {
            state: { fromProgrammatically: true },
          });
        } else {
          console.log(response);
          console.error("Failed to submit form");

          // Handle server response error
        }
      })
      .catch((err) => {
        console.error("Error during submission:", err);
        // Handle network or request error
      });
  };

  return (
    <div className="signupform-container flex flex-col items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="input-container mb-5 flex flex-col text-sm items-center w-[80%]">
          <div className="email-input w-full">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="p-2 w-full focus:outline-none placeholder-white font-light text-white rounded-t-lg bg-slate-500 bg-opacity-90"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>
          <div className="password-input w-full mt-1">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="p-2 w-full focus:outline-none placeholder-white font-light text-white rounded-b-lg bg-slate-500 bg-opacity-90"
            />
          </div>
        </div>
        <button className="signup-submit w-[80%] bg-[#9747FF] text-white text-sm font-medium rounded-md p-2">
          SIGN UP
        </button>
      </form>

      {/* Social Sign-In Section */}
      <div className="social-signin space-y-3 mt-16 flex flex-col text-sm text-gray-500 font font-medium justify-center items-center w-full">
        <button className="connect-google w-[80%] pl-5 bg-white rounded-md p-2 flex items-center justify-start space-x-2">
          <i class="bi bi-google"></i>
          <span>Connect with Google</span>
        </button>
        <button className="connect-apple w-[80%] pl-5 bg-white rounded-md p-2 flex items-center justify-start space-x-2">
          <i class="bi bi-apple"></i>
          <span>Connect with Apple</span>
        </button>
      </div>

      <div className="signin-menu mt-6 text-xxs underline">
        <Link to="/signin" className="">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
