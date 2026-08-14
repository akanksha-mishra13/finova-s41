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
} from "lucide-react";

const mainNavigation = [
  {
    name: "Overview",
    icon: Home,
  },
  {
    name: "Money",
    icon: Wallet,
  },
  {
    name: "Financial Health",
    icon: HeartPulse,
  },
  {
    name: "Goals",
    icon: Target,
  },
  {
    name: "Decision Lab",
    icon: FlaskConical,
  },
  {
    name: "Credit Readiness",
    icon: CreditCard,
  },
  {
    name: "Alternatives",
    icon: HandCoins,
  },
  {
    name: "AI Copilot",
    icon: Bot,
  },
];

const bottomNavigation = [
  {
    name: "Consent Center",
    icon: ShieldCheck,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col bg-[#123C35] px-4 py-6 text-white">

      {/* Logo */}
      <div className="mb-8 flex items-center justify-between px-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            FINOVA
          </h1>

          <p className="mt-1 text-xs text-[#B9E8D0]">
            Financial intelligence
          </p>
        </div>

        <button className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white">
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1">

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
          Workspace
        </p>

        <nav className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  item.name === "Overview"
                    ? "bg-[#B9E8D0] font-semibold text-[#123C35]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-white/10 pt-4">

        <nav className="space-y-1">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <Icon size={19} strokeWidth={1.8} />

                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B9E8D0] text-sm font-bold text-[#123C35]">
            AM
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Akanksha
            </p>

            <p className="truncate text-xs text-white/40">
              Personal account
            </p>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;