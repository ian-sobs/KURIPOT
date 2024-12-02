import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import AddTransaction from "./pages/AddTransaction";
import AddBudget from "./pages/AddBudget";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import GettingStarted from "./pages/GettingStartedPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />{" "}
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />{" "}
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        <Route path="/dashboard/transactions" element={<Transactions />} />{" "}
        <Route path="/dashboard/budgets" element={<Budgets />} />{" "}
        <Route path="/dashboard/reports" element={<Reports />} />{" "}
        <Route path="/dashboard/addTransaction" element={<AddTransaction />} />{" "}
        <Route path="/dashboard/budgets/addBudget" element={<AddBudget />} />{" "}
      </Routes>
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
