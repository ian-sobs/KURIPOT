// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Profile from "./pages/Profile";
import AddTransaction from "./pages/AddTransaction";
import AddBudget from "./pages/AddBudget";

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
        <Route path="/dashboard/profile" element={<Profile />} />{" "}
        <Route path="/dashboard/addTransaction" element={<AddTransaction />} />{" "}
        <Route path="/dashboard/budgets/addBudget" element={<AddBudget />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
