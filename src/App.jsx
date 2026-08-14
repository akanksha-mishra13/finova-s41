import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

// Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Money from "./pages/Money";
import Transactions from "./pages/Transactions";
import FinancialHealth from "./pages/FinancialHealth";
import Goals from "./pages/Goals";
import DecisionLab from "./pages/DecisionLab";
import CreditReadiness from "./pages/CreditReadiness";
import Alternatives from "./pages/Alternatives";
import AICopilot from "./pages/AICopilot";
import Consent from "./pages/Consent";
import Settings from "./pages/Settings";


// --------------------------------------------------
// DASHBOARD LAYOUT
// --------------------------------------------------

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-h-screen ml-[260px] p-6 lg:p-8">

        <Routes>

          {/* ---------------------------------------- */}
          {/* OVERVIEW */}
          {/* ---------------------------------------- */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* ---------------------------------------- */}
          {/* MONEY */}
          {/* ---------------------------------------- */}

          <Route
            path="/money"
            element={<Money />}
          />


          {/* ---------------------------------------- */}
          {/* TRANSACTIONS */}
          {/* ---------------------------------------- */}

          <Route
            path="/transactions"
            element={<Transactions />}
          />


          {/* ---------------------------------------- */}
          {/* FINANCIAL HEALTH */}
          {/* ---------------------------------------- */}

          <Route
            path="/health"
            element={<FinancialHealth />}
          />


          {/* ---------------------------------------- */}
          {/* GOALS */}
          {/* ---------------------------------------- */}

          <Route
            path="/goals"
            element={<Goals />}
          />


          {/* ---------------------------------------- */}
          {/* DECISION LAB */}
          {/* ---------------------------------------- */}

          <Route
            path="/decision-lab"
            element={<DecisionLab />}
          />


          {/* ---------------------------------------- */}
          {/* CREDIT READINESS */}
          {/* ---------------------------------------- */}

          <Route
            path="/credit"
            element={<CreditReadiness />}
          />


          {/* ---------------------------------------- */}
          {/* ALTERNATIVES */}
          {/* ---------------------------------------- */}

          <Route
            path="/alternatives"
            element={<Alternatives />}
          />


          {/* ---------------------------------------- */}
          {/* AI COPILOT */}
          {/* ---------------------------------------- */}

          <Route
            path="/ai"
            element={<AICopilot />}
          />


          {/* ---------------------------------------- */}
          {/* CONSENT CENTER */}
          {/* ---------------------------------------- */}

          <Route
            path="/consent"
            element={<Consent />}
          />


          {/* ---------------------------------------- */}
          {/* SETTINGS */}
          {/* ---------------------------------------- */}

          <Route
            path="/settings"
            element={<Settings />}
          />


          {/* ---------------------------------------- */}
          {/* UNKNOWN DASHBOARD ROUTE */}
          {/* ---------------------------------------- */}

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

        </Routes>

      </main>

    </div>
  );
}


// --------------------------------------------------
// MAIN APP
// --------------------------------------------------

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ---------------------------------------- */}
        {/* LANDING PAGE */}
        {/* ---------------------------------------- */}

        <Route
          path="/"
          element={<Landing />}
        />


        {/* ---------------------------------------- */}
        {/* FINOVA APPLICATION */}
        {/* ---------------------------------------- */}

        <Route
          path="/*"
          element={<DashboardLayout />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;