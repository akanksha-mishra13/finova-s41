import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  HeartPulse,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FlaskConical,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const userName = user?.name || "User";

  /*
    Temporary demo financial data.

    IMPORTANT:
    This is frontend demo data for the SIH prototype.
    Later this can be replaced with API/database data.
  */

  const financialData = {
    balance: 84250,
    income: 65000,
    expenses: 38420,
    savings: 26580,
    healthScore: 82,
    savingsRate: 40.9,
    emergencyFund: 68,
    goalProgress: 62,
    monthlyChange: 8.4,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getFirstName = () => {
    return userName.split(" ")[0];
  };

  return (
    <div className="space-y-6">

      {/* =========================================
          HEADER
      ========================================== */}

      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <p className="text-sm font-medium text-[#123C35]">
            Financial overview
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Good morning, {getFirstName()} 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's how your financial life is looking today.
          </p>

        </div>


        <Link
          to="/decision-lab"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123C35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0F172A]"
        >
          Simulate a decision
          <ArrowRight size={16} />
        </Link>

      </section>


      {/* =========================================
          FINANCIAL HEALTH BANNER
      ========================================== */}

      <section className="overflow-hidden rounded-2xl bg-[#123C35] p-6 text-white shadow-sm sm:p-7">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B9E8D0] text-[#123C35]">
                <HeartPulse size={18} />
              </div>

              <p className="text-sm font-medium text-[#B9E8D0]">
                Financial Health
              </p>

            </div>


            <div className="mt-4 flex items-end gap-3">

              <span className="text-5xl font-bold">
                {financialData.healthScore}
              </span>

              <span className="mb-2 text-sm text-white/50">
                / 100
              </span>

            </div>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
              Your financial position is looking healthy.
              Keep building your emergency fund and stay
              consistent with your savings goals.
            </p>

          </div>


          {/* SCORE RING */}

          <div className="flex items-center justify-center">

            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-white/10">

              <div
                className="absolute inset-[-10px] rounded-full border-[10px] border-[#B9E8D0]"
                style={{
                  clipPath: "inset(0 18% 0 0)",
                }}
              />

              <div className="text-center">

                <p className="text-2xl font-bold">
                  Good
                </p>

                <p className="mt-1 text-xs text-white/50">
                  Keep it up
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          MONEY CARDS
      ========================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Balance */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Wallet size={19} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              Current
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Total balance
          </p>

          <p className="mt-1 text-2xl font-bold text-[#0F172A]">
            {formatCurrency(financialData.balance)}
          </p>

        </div>


        {/* Income */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F7F0] text-[#123C35]">
              <ArrowUpRight size={19} />
            </div>

            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              +{financialData.monthlyChange}%
              <TrendingUp size={13} />
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Monthly income
          </p>

          <p className="mt-1 text-2xl font-bold text-[#0F172A]">
            {formatCurrency(financialData.income)}
          </p>

        </div>


        {/* Expenses */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <ArrowDownRight size={19} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              This month
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Monthly expenses
          </p>

          <p className="mt-1 text-2xl font-bold text-[#0F172A]">
            {formatCurrency(financialData.expenses)}
          </p>

        </div>


        {/* Savings */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F7F0] text-[#123C35]">
              <TrendingUp size={19} />
            </div>

            <span className="text-xs font-medium text-[#123C35]">
              {financialData.savingsRate}% rate
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Monthly savings
          </p>

          <p className="mt-1 text-2xl font-bold text-[#0F172A]">
            {formatCurrency(financialData.savings)}
          </p>

        </div>

      </section>


      {/* =========================================
          MAIN GRID
      ========================================== */}

      <section className="grid gap-6 lg:grid-cols-3">

        {/* =====================================
            SPENDING / SAVING
        ====================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-[#0F172A]">
                Financial snapshot
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your income and spending overview
              </p>

            </div>

            <Link
              to="/money"
              className="text-sm font-semibold text-[#123C35] hover:underline"
            >
              View details
            </Link>

          </div>


          {/* Income */}

          <div className="mt-7">

            <div className="flex items-center justify-between text-sm">

              <span className="font-medium text-slate-700">
                Income
              </span>

              <span className="font-semibold text-[#0F172A]">
                {formatCurrency(financialData.income)}
              </span>

            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-[#123C35]"
                style={{ width: "100%" }}
              />

            </div>

          </div>


          {/* Expenses */}

          <div className="mt-6">

            <div className="flex items-center justify-between text-sm">

              <span className="font-medium text-slate-700">
                Expenses
              </span>

              <span className="font-semibold text-[#0F172A]">
                {formatCurrency(financialData.expenses)}
              </span>

            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-orange-400"
                style={{
                  width: `${Math.min(
                    (financialData.expenses /
                      financialData.income) *
                      100,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>


          {/* Savings */}

          <div className="mt-6">

            <div className="flex items-center justify-between text-sm">

              <span className="font-medium text-slate-700">
                Savings
              </span>

              <span className="font-semibold text-[#0F172A]">
                {formatCurrency(financialData.savings)}
              </span>

            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-[#B9E8D0]"
                style={{
                  width: `${financialData.savingsRate}%`,
                }}
              />

            </div>

          </div>


          {/* Bottom summary */}

          <div className="mt-7 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Savings rate
              </p>

              <p className="mt-1 text-lg font-bold text-[#123C35]">
                {financialData.savingsRate}%
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Available after expenses
              </p>

              <p className="mt-1 text-lg font-bold text-[#123C35]">
                {formatCurrency(
                  financialData.income -
                    financialData.expenses
                )}
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Monthly trend
              </p>

              <p className="mt-1 text-lg font-bold text-emerald-600">
                Improving
              </p>

            </div>

          </div>

        </div>


        {/* =====================================
            QUICK ACTIONS
        ====================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div>

            <h2 className="text-lg font-bold text-[#0F172A]">
              Quick actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Take control of your finances
            </p>

          </div>


          <div className="mt-6 space-y-3">

            {/* Decision Lab */}

            <Link
              to="/decision-lab"
              className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#B9E8D0] hover:bg-[#F7F9F8]"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F7F0] text-[#123C35]">
                  <FlaskConical size={18} />
                </div>

                <div>

                  <p className="text-sm font-semibold text-[#0F172A]">
                    Simulate a decision
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    See the financial impact
                  </p>

                </div>

              </div>

              <ArrowRight
                size={17}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#123C35]"
              />

            </Link>


            {/* Goals */}

            <Link
              to="/goals"
              className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#B9E8D0] hover:bg-[#F7F9F8]"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Target size={18} />
                </div>

                <div>

                  <p className="text-sm font-semibold text-[#0F172A]">
                    Check your goals
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Track your progress
                  </p>

                </div>

              </div>

              <ArrowRight
                size={17}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#123C35]"
              />

            </Link>


            {/* AI Copilot */}

            <Link
              to="/ai"
              className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-[#B9E8D0] hover:bg-[#F7F9F8]"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Sparkles size={18} />
                </div>

                <div>

                  <p className="text-sm font-semibold text-[#0F172A]">
                    Ask AI Copilot
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Get financial guidance
                  </p>

                </div>

              </div>

              <ArrowRight
                size={17}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#123C35]"
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =========================================
          GOAL + EMERGENCY FUND
      ========================================== */}

      <section className="grid gap-6 lg:grid-cols-2">

        {/* Goal */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Target size={18} />
                </div>

                <h2 className="font-bold text-[#0F172A]">
                  Current goal
                </h2>

              </div>

              <p className="mt-4 text-lg font-semibold text-[#0F172A]">
                Build emergency fund
              </p>

              <p className="mt-1 text-sm text-slate-500">
                ₹1,50,000 target
              </p>

            </div>

            <span className="rounded-full bg-[#E9F7F0] px-3 py-1 text-xs font-semibold text-[#123C35]">
              {financialData.goalProgress}%
            </span>

          </div>


          <div className="mt-6">

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-[#123C35]"
                style={{
                  width: `${financialData.goalProgress}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-400">

              <span>
                ₹93,000 saved
              </span>

              <span>
                ₹1,50,000
              </span>

            </div>

          </div>


          <Link
            to="/goals"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#123C35] hover:underline"
          >
            View goal
            <ArrowRight size={15} />
          </Link>

        </div>


        {/* Emergency Fund */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9F7F0] text-[#123C35]">
                  <ShieldCheck size={18} />
                </div>

                <h2 className="font-bold text-[#0F172A]">
                  Emergency readiness
                </h2>

              </div>

              <p className="mt-4 text-lg font-semibold text-[#0F172A]">
                You're making progress
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your emergency fund is {financialData.emergencyFund}% complete.
              </p>

            </div>

          </div>


          <div className="mt-6">

            <div className="flex items-center justify-between text-sm">

              <span className="font-medium text-slate-600">
                Readiness
              </span>

              <span className="font-bold text-[#123C35]">
                {financialData.emergencyFund}%
              </span>

            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-[#B9E8D0]"
                style={{
                  width: `${financialData.emergencyFund}%`,
                }}
              />

            </div>

          </div>


          <p className="mt-5 text-xs leading-5 text-slate-400">
            Increasing your emergency savings can improve
            your financial resilience and reduce dependency
            on short-term borrowing.
          </p>

        </div>

      </section>


      {/* =========================================
          PERSONALIZED INSIGHT
      ========================================== */}

      <section className="rounded-2xl border border-[#CDEBDD] bg-[#F0FAF5] p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B9E8D0] text-[#123C35]">
            <Sparkles size={19} />
          </div>

          <div className="flex-1">

            <p className="text-sm font-semibold text-[#123C35]">
              Finova insight for {getFirstName()}
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Your savings rate is currently around{" "}
              <strong>
                {financialData.savingsRate}%
              </strong>
              . You're on a healthy path, but strengthening
              your emergency fund could make your financial
              position more resilient.
            </p>

          </div>

          <Link
            to="/health"
            className="shrink-0 text-sm font-semibold text-[#123C35] hover:underline"
          >
            See analysis
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;