import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/DashboardPage";
import Transactions from "./pages/TransactionsPage";
import Budgets from "./pages/BudgetsPage";
import Reports from "./pages/ReportsPage";
import AddTransaction from "./components/AddTransaction";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import GettingStarted from "./pages/GettingStartedPage";
import ViewAccounts from "./components/ViewAccounts";


const App = () => {
  return (
    <Router>
      {/* padding-top to take into account size of navbar */}
      <div className="app-container min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="/dashboard/budgets" element={<Budgets />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route
            path="/dashboard/addTransaction"
            element={<AddTransaction />}
          />
          <Route path="/dashboard/viewAccounts" element={<ViewAccounts />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
