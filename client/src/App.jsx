import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/DashboardPage";
import Transactions from "./pages/TransactionsPage";
import Budgets from "./pages/BudgetsPage";
import Reports from "./pages/ReportsPage";
import AddTransaction from "./components/transactions/AddTransaction";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import GettingStarted from "./pages/GettingStartedPage";
import ViewAccounts from "./components/accounts/ViewAccounts";
import Expense from "./components/transactions/Expense";
import Income from "./components/transactions/Income";
import Transfer from "./components/transactions/Transfer";
import Categories from "./components/categories/Categories";

import PrivateRoutes from "./auth/PrivateRoutes";
import PublicRoutes from "./auth/PublicRoutes";
import SemiProtectedRoute from "./auth/SemiProtectedRoute";

const App = () => {
  return (
    <Router>
      {/* padding-top to take into account size of navbar */}
      <div className="app-container min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* <Route element={<PublicRoutes/>}> */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          {/* </Route> */}

          <Route path="/getting-started" element={
            <SemiProtectedRoute>
              <GettingStarted />
            </SemiProtectedRoute>
            } />
          
          <Route element={<PrivateRoutes />}>
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/transactions" element={<Transactions />} />
            <Route path="/dashboard/budgets" element={<Budgets />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route
              path="/dashboard/addTransaction"
              element={<AddTransaction />}
            />
            <Route path="/dashboard/addIncome" element={<Income />} />
            <Route path="/dashboard/addExpense" element={<Expense />} />
            <Route path="/dashboard/transferMoney" element={<Transfer />} />
            <Route path="/dashboard/categories" element={<Categories />} />

            
              <Route path="/dashboard/viewAccounts" element={<ViewAccounts />} />
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
