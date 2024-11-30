import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <Router>
      <div className="app-container pt-6 sm:pt-8 md:pt-10">
        {" "}
        {/* Adjust this value to match your navbar height */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
