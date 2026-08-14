import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Money from "./pages/Money";
import FinancialHealth from "./pages/FinancialHealth";
import Goals from "./pages/Goals";
import DecisionLab from "./pages/DecisionLab";
import CreditReadiness from "./pages/CreditReadiness";
import Alternatives from "./pages/Alternatives";
import AICopilot from "./pages/AICopilot";
import Consent from "./pages/Consent";
import Settings from "./pages/Settings";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      <Sidebar />

      <main className="min-h-screen ml-[260px] p-6 lg:p-8">

        <Routes>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/money"
            element={<Money />}
          />

          <Route
            path="/health"
            element={<FinancialHealth />}
          />

          <Route
            path="/goals"
            element={<Goals />}
          />

          <Route
            path="/decision-lab"
            element={<DecisionLab />}
          />

          <Route
            path="/credit"
            element={<CreditReadiness />}
          />

          <Route
            path="/alternatives"
            element={<Alternatives />}
          />

          <Route
            path="/ai"
            element={<AICopilot />}
          />

          <Route
            path="/consent"
            element={<Consent />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />

        </Routes>

      </main>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/*"
          element={<DashboardLayout />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;