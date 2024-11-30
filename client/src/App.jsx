import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import GettingStarted from "./pages/GettingStarted";

const App = () => {
  return (
    <Router>
      {/* padding-top to take into account size of navbar */}
      <div className="app-container pt-16 sm:pt-8 md:pt-10 min-h-screen">
        {" "}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/getting-started" element={<GettingStarted />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
