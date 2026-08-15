import {
  Home,
  Wallet,
  HeartPulse,
  Target,
  FlaskConical,
  CreditCard,
  HandCoins,
  Bot,
  ShieldCheck,
  Settings,
  ChevronLeft,
  X,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const mainNavigation = [
  {
    name: "Overview",
    icon: Home,
    path: "/dashboard",
  },
  {
    name: "Money",
    icon: Wallet,
    path: "/money",
  },
  {
    name: "Financial Health",
    icon: HeartPulse,
    path: "/health",
  },
  {
    name: "Goals",
    icon: Target,
    path: "/goals",
  },
  {
    name: "Decision Lab",
    icon: FlaskConical,
    path: "/decision-lab",
  },
  {
    name: "Credit Readiness",
    icon: CreditCard,
    path: "/credit",
  },
  {
    name: "Alternatives",
    icon: HandCoins,
    path: "/alternatives",
  },
  {
    name: "AI Copilot",
    icon: Bot,
    path: "/ai",
  },
];

const bottomNavigation = [
  {
    name: "Consent Center",
    icon: ShieldCheck,
    path: "/consent",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar({
  mobileOpen = false,
  onClose = () => {},
}) {
  const { user, logout } = useAuth();

  /*
    Get initials from user's name.

    Example:
    Akanksha Mishra → AM
    Rahul Sharma → RS
    Priya → P
  */
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* =========================
          MOBILE OVERLAY
      ========================== */}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[260px]
          flex-col
          bg-[#123C35]
          px-4 py-6
          text-white
          transition-transform duration-300
          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =========================
            LOGO
        ========================== */}

        <div className="mb-8 flex items-center justify-between px-3">

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              FINOVA
            </h1>

            <p className="mt-1 text-xs text-[#B9E8D0]">
              Financial intelligence
            </p>
          </div>

          {/* Desktop collapse button */}

          <button
            type="button"
            className="hidden rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:block"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Mobile close button */}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>

        </div>


        {/* =========================
            MAIN NAVIGATION
        ========================== */}

        <div className="flex-1 overflow-y-auto">

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
            Workspace
          </p>

          <nav className="space-y-1">

            {mainNavigation.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group flex w-full items-center
                    gap-3 rounded-xl px-3 py-3
                    text-sm transition

                    ${
                      isActive
                        ? "bg-[#B9E8D0] font-semibold text-[#123C35]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }
                    `
                  }
                >

                  <Icon
                    size={19}
                    strokeWidth={1.8}
                  />

                  <span>
                    {item.name}
                  </span>

                </NavLink>
              );
            })}

          </nav>

        </div>


        {/* =========================
            BOTTOM NAVIGATION
        ========================== */}

        <div className="border-t border-white/10 pt-4">

          <nav className="space-y-1">

            {bottomNavigation.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex w-full items-center
                    gap-3 rounded-xl px-3 py-3
                    text-sm transition

                    ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    }
                    `
                  }
                >

                  <Icon
                    size={19}
                    strokeWidth={1.8}
                  />

                  <span>
                    {item.name}
                  </span>

                </NavLink>
              );
            })}

          </nav>


          {/* =========================
              USER PROFILE
          ========================== */}

          <div className="mt-5 rounded-xl bg-white/5 p-3">

            <div className="flex items-center gap-3">

              {/* Avatar */}

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B9E8D0] text-sm font-bold text-[#123C35]">
                {getInitials(user?.name)}
              </div>


              {/* User information */}

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium">
                  {user?.name || "User"}
                </p>

                <p className="truncate text-xs text-white/40">
                  {user?.email || "Personal account"}
                </p>

              </div>

            </div>


            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/50 transition hover:bg-white/10 hover:text-white"
            >

              <LogOut size={15} />

              <span>
                Sign out
              </span>

            </button>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;