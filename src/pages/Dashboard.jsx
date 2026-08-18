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
  Bot,
  Plus,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const userName =
    user?.displayName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "there";

  const getFirstName = () => {
    return userName.split(" ")[0];
  };

  /*
    Temporary financial data.

    This is kept only for the current SIH prototype.
    Later these values will come from the backend/database.
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

  const remainingGoal =
    150000 - 93000;

  const expensePercentage =
    Math.min(
      (financialData.expenses /
        financialData.income) *
        100,
      100
    );

  const availableAfterExpenses =
    financialData.income -
    financialData.expenses;

  return (
    <div className="space-y-6 pb-8">

      {/* =====================================================
          WELCOME HEADER
      ====================================================== */}

      <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-semibold text-[#123C35]">
            Your financial dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Welcome back, {getFirstName()} 👋
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Get a quick view of your money, understand your
            financial health, and discover what you should do next.
          </p>

        </div>

        <Link
          to="/decision-lab"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#123C35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0F172A] sm:w-auto"
        >
          <FlaskConical size={17} />
          Simulate a decision
          <ArrowRight size={16} />
        </Link>

      </section>


      {/* =====================================================
          AI COPILOT CARD
      ====================================================== */}

      <section className="overflow-hidden rounded-2xl border border-[#CDEBDD] bg-gradient-to-br from-[#F0FAF5] via-white to-[#E9F7F0] shadow-sm">

        <div className="relative p-6 sm:p-7">

          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#B9E8D0]/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#123C35] text-[#B9E8D0] shadow-sm">
                <Bot size={28} />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-lg font-bold text-[#0F172A]">
                    Meet Finova AI Copilot
                  </h2>

                  <span className="rounded-full bg-[#B9E8D0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#123C35]">
                    AI powered
                  </span>

                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Not sure where your money is going or what you
                  should do next? Ask Finova AI for simple,
                  personalized financial guidance.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                    💰 Saving advice
                  </span>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                    📊 Budgeting
                  </span>

                  <span className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                    🎯 Financial goals
                  </span>

                </div>

              </div>

            </div>


            <Link
              to="/ai"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#123C35] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F172A]"
            >
              Ask Finova AI
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINANCIAL HEALTH
      ====================================================== */}

      <section className="overflow-hidden rounded-2xl bg-[#123C35] p-6 text-white shadow-sm sm:p-7">

        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

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

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">
              Your overall financial position looks healthy.
              Your next focus should be strengthening your
              emergency fund and maintaining your savings habit.
            </p>

            <Link
              to="/health"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#B9E8D0] hover:underline"
            >
              Understand your score
              <ChevronRight size={15} />
            </Link>

          </div>


          <div className="flex justify-center lg:pr-8">

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
                  Keep going
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MONEY OVERVIEW
      ====================================================== */}

      <section>

        <div className="mb-4">

          <h2 className="text-lg font-bold text-[#0F172A]">
            Your money at a glance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A simple overview of where your money stands this month.
          </p>

        </div>


        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Balance */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

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

            <p className="mt-2 text-xs text-slate-400">
              Money currently available
            </p>

          </div>


          {/* Income */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

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

            <p className="mt-2 text-xs text-slate-400">
              Money coming in
            </p>

          </div>


          {/* Expenses */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

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

            <p className="mt-2 text-xs text-slate-400">
              Money going out
            </p>

          </div>


          {/* Savings */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F7F0] text-[#123C35]">
                <TrendingUp size={19} />
              </div>

              <span className="text-xs font-medium text-[#123C35]">
                {financialData.savingsRate}% saved
              </span>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Monthly savings
            </p>

            <p className="mt-1 text-2xl font-bold text-[#0F172A]">
              {formatCurrency(financialData.savings)}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Income left after spending
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          NEXT BEST ACTION
      ====================================================== */}

      <section className="rounded-2xl border border-[#CDEBDD] bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E9F7F0] text-[#123C35]">
              <Lightbulb size={21} />
            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-[#123C35]">
                Your next best action
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#0F172A]">
                Strengthen your emergency fund
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                You're already saving consistently. Your next
                priority could be completing your emergency fund
                before taking on unnecessary short-term expenses.
              </p>

            </div>

          </div>

          <Link
            to="/goals"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#B9E8D0] px-4 py-2.5 text-sm font-semibold text-[#123C35] transition hover:bg-[#F0FAF5]"
          >
            View my goal
            <ArrowRight size={15} />
          </Link>

        </div>

      </section>


      {/* =====================================================
          FINANCIAL SNAPSHOT + QUICK ACTIONS
      ====================================================== */}

      <section className="grid gap-6 lg:grid-cols-3">

        {/* Financial Snapshot */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex items-start justify-between gap-4">

            <div>

              <h2 className="text-lg font-bold text-[#0F172A]">
                Financial snapshot
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Understand how your income is being used.
              </p>

            </div>

            <Link
              to="/money"
              className="shrink-0 text-sm font-semibold text-[#123C35] hover:underline"
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
                style={{
                  width: "100%",
                }}
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
                  width: `${expensePercentage}%`,
                }}
              />

            </div>

            <p className="mt-2 text-xs text-slate-400">
              {Math.round(expensePercentage)}% of your monthly income
            </p>

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


          {/* Summary */}

          <div className="mt-7 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Savings rate
              </p>

              <p className="mt-1 text-lg font-bold text-[#123C35]">
                {financialData.savingsRate}%
              </p>

              <p className="mt-1 text-xs text-slate-400">
                You're building a good habit
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Available after expenses
              </p>

              <p className="mt-1 text-lg font-bold text-[#123C35]">
                {formatCurrency(availableAfterExpenses)}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Before other allocations
              </p>

            </div>


            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                Monthly trend
              </p>

              <p className="mt-1 flex items-center gap-1 text-lg font-bold text-emerald-600">
                <TrendingUp size={17} />
                Improving
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Compared with last month
              </p>

            </div>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-[#0F172A]">
            What would you like to do?
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Jump straight to a Finova feature.
          </p>


          <div className="mt-6 space-y-3">

            <Link
              to="/ai"
              className="group flex items-center justify-between rounded-xl border border-[#CDEBDD] bg-[#F0FAF5] p-4 transition hover:border-[#B9E8D0]"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123C35] text-[#B9E8D0]">
                  <Bot size={18} />
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

          </div>

        </div>

      </section>


      {/* =====================================================
          GOAL + EMERGENCY FUND
      ====================================================== */}

      <section className="grid gap-6 lg:grid-cols-2">

        {/* Goal */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between gap-4">

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

            <p className="mt-3 text-xs text-slate-500">
              {formatCurrency(remainingGoal)} more to reach this goal.
            </p>

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

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E9F7F0] text-[#123C35]">
              <ShieldCheck size={18} />
            </div>

            <div>

              <h2 className="font-bold text-[#0F172A]">
                Emergency readiness
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A safety cushion can help you handle unexpected expenses.
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


          <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 p-3">

            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-[#123C35]"
            />

            <p className="text-xs leading-5 text-slate-500">
              You're making progress. Keep contributing regularly
              until you have enough savings to comfortably handle
              unexpected expenses.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          PERSONALIZED INSIGHT
      ====================================================== */}

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
              . That's a healthy starting point. Your biggest
              opportunity right now is to strengthen your emergency
              fund while maintaining your current savings habit.
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


      {/* =====================================================
          ADD DATA CTA
      ====================================================== */}

      <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#123C35] shadow-sm">
              <Plus size={19} />
            </div>

            <div>

              <h2 className="text-sm font-bold text-[#0F172A]">
                Want a more personalized dashboard?
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Add your transactions and goals to help Finova
                understand your financial situation better.
              </p>

            </div>

          </div>

          <Link
            to="/transactions"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#123C35] shadow-sm ring-1 ring-slate-200 transition hover:bg-[#F0FAF5]"
          >
            Add transactions
            <ArrowRight size={15} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;

