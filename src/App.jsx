import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState } from "react";

import { Menu } from "lucide-react";

import Sidebar from "./components/Sidebar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

import Signup from "./pages/Signup";

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

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";


function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9F8]">

        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#DCE8E2] border-t-[#123C35]" />

          <p className="mt-4 text-sm text-slate-500">
            Loading Finova...
          </p>

        </div>

      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


function DashboardLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />

      {/* MOBILE HEADER */}

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">

        <button
          type="button"
          onClick={() =>
            setMobileOpen(true)
          }
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>

        <div className="text-lg font-bold text-[#123C35]">
          FINOVA
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B9E8D0] text-sm font-bold text-[#123C35]">
          U
        </div>

      </header>


      {/* CONTENT */}

      <main className="min-h-screen px-4 py-5 sm:px-6 lg:ml-[260px] lg:p-8">

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
            path="/transactions"
            element={<Transactions />}
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


function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* LANDING */}

      <Route
        path="/"
        element={<Landing />}
      />

      {/* LOGIN */}

      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      {/* SIGNUP */}

      <Route
        path="/signup"
        element={
          user ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <Signup />
          )
        }
      />

      {/* PROTECTED APP */}

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}


function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <AppRoutes />

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;