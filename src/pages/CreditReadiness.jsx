import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Info,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";


const TRANSACTIONS_STORAGE_KEY = "finova_transactions";
const GOALS_STORAGE_KEY = "finova_goals";

function readStoredArray(key) {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function statusForScore(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Healthy";
  if (score >= 50) return "Needs attention";
  return "Needs improvement";
}

function ScoreRing({ score }) {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">

      <svg
        viewBox="0 0 140 140"
        className="absolute h-full w-full -rotate-90"
      >

        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="10"
        />

        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#B9E8D0"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />

      </svg>

      <div className="relative text-center">

        <p className="text-5xl font-bold text-white">
          {score}
        </p>

        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">
          Readiness
        </p>

      </div>

    </div>
  );
}

function FactorCard({
  icon: Icon,
  title,
  score,
  status,
  description,
  positive = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Icon size={19} />
          </div>

          <div>

            <p className="text-sm font-bold text-slate-900">
              {title}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {status}
            </p>

          </div>

        </div>

        <span
          className={`text-sm font-bold ${
            positive
              ? "text-emerald-600"
              : "text-slate-700"
          }`}
        >
          {score}
        </span>

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className={`h-full rounded-full ${
            positive
              ? "bg-emerald-500"
              : "bg-[#123C35]"
          }`}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      <p className="mt-3 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}

function ImprovementItem({
  number,
  title,
  description,
  impact,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#123C35] text-sm font-bold text-white">
        {number}
      </div>

      <div className="flex-1">

        <div className="flex flex-col justify-between gap-2 sm:flex-row">

          <div>

            <h3 className="text-sm font-bold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {description}
            </p>

          </div>

          <span className="h-fit whitespace-nowrap rounded-full bg-[#E8F7EF] px-3 py-1 text-[10px] font-bold text-[#123C35]">
            {impact}
          </span>

        </div>

      </div>

    </div>
  );
}

function calculateEMI(principal, annualRate, months) {
  const P = Number(principal);

  const r = Number(annualRate) / 12 / 100;

  const n = Number(months);

  if (!P || !r || !n) {
    return 0;
  }

  const emi =
    (P * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  return Math.round(emi);
}

export default function CreditReadiness() {

  const [loanAmount, setLoanAmount] = useState("200000");

  const [interestRate, setInterestRate] =
    useState("11");

  const [tenure, setTenure] =
    useState("24");

  const emi = useMemo(
    () =>
      calculateEMI(
        loanAmount,
        interestRate,
        tenure
      ),
    [
      loanAmount,
      interestRate,
      tenure,
    ]
  );

  const [transactions, setTransactions] = useState(() =>
    readStoredArray(TRANSACTIONS_STORAGE_KEY)
  );

  const [goals, setGoals] = useState(() =>
    readStoredArray(GOALS_STORAGE_KEY)
  );

  useEffect(() => {
    const refreshData = () => {
      setTransactions(readStoredArray(TRANSACTIONS_STORAGE_KEY));
      setGoals(readStoredArray(GOALS_STORAGE_KEY));
    };

    refreshData();
    window.addEventListener("storage", refreshData);
    window.addEventListener("focus", refreshData);

    return () => {
      window.removeEventListener("storage", refreshData);
      window.removeEventListener("focus", refreshData);
    };
  }, []);

  const creditData = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "Income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const expenses = transactions
      .filter((item) => item.type === "Expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const debtPayments = transactions
      .filter(
        (item) =>
          item.type === "Expense" &&
          String(item.category || "").trim().toLowerCase() ===
            "debt / loan"
      )
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const debtRatio =
      income > 0 ? (debtPayments / income) * 100 : 0;

    const debtScore =
      income > 0
        ? clampScore(100 - debtRatio * 2)
        : 50;

    const emergencyGoal =
      goals.find(
        (goal) =>
          String(goal.name || "").trim().toLowerCase() ===
          "emergency fund"
      ) || null;

    const emergencySaved = Number(emergencyGoal?.current || 0);

    const emergencyMonths =
      expenses > 0 ? emergencySaved / expenses : 0;

    const savingsBufferScore = clampScore(
      (emergencyMonths / 3) * 100
    );

    const savings = Math.max(0, income - expenses);

    const savingsRate =
      income > 0 ? (savings / income) * 100 : 0;

    const savingsStrengthScore = clampScore(
      savingsRate * 1.5
    );

    const goalProgress =
      goals.length > 0
        ? goals.reduce(
            (sum, goal) => sum + Number(goal.progress || 0),
            0
          ) / goals.length
        : 0;

    // We do not have a credit-limit field in the current transaction model.
    // Keep this neutral instead of inventing utilization data.
    const utilizationScore = 70;

    // A transaction-only app cannot prove an official credit-report
    // repayment history. Use the presence/consistency of recorded Debt/Loan
    // payments as an educational proxy, never as a real credit score.
    const debtTransactions = transactions.filter(
      (item) =>
        item.type === "Expense" &&
        String(item.category || "").trim().toLowerCase() ===
          "debt / loan"
    );

    const paymentBehaviorScore =
      debtTransactions.length === 0
        ? 70
        : clampScore(
            Math.min(100, 70 + debtTransactions.length * 5)
          );

    const financialHealthScore = clampScore(
      savingsStrengthScore * 0.25 +
      Math.max(0, 100 - (expenses > 0 && income > 0 ? (expenses / income) * 100 : 50)) * 0.2 +
      savingsBufferScore * 0.2 +
      debtScore * 0.15 +
      goalProgress * 0.2
    );

    const readinessScore = clampScore(
      paymentBehaviorScore * 0.25 +
      utilizationScore * 0.15 +
      debtScore * 0.25 +
      savingsBufferScore * 0.2 +
      financialHealthScore * 0.15
    );

    const factors = {
      paymentBehavior: paymentBehaviorScore,
      utilization: utilizationScore,
      debt: debtScore,
      savingsBuffer: savingsBufferScore,
    };

    const weakest = Object.entries(factors).sort(
      (a, b) => a[1] - b[1]
    )[0];

    return {
      income,
      expenses,
      debtPayments,
      debtRatio,
      debtScore,
      emergencySaved,
      emergencyMonths,
      savingsBufferScore,
      savingsRate,
      goalProgress,
      financialHealthScore,
      readinessScore,
      factors,
      weakest: weakest?.[0] || "savingsBuffer",
    };
  }, [transactions, goals]);

  const readinessLabel =
    creditData.readinessScore >= 85
      ? "Strong readiness"
      : creditData.readinessScore >= 70
        ? "{readinessLabel}"
        : creditData.readinessScore >= 50
          ? "Moderate readiness"
          : "Needs improvement";

  const readinessHeadline =
    creditData.readinessScore >= 85
      ? "You're in a strong position for responsible borrowing."
      : creditData.readinessScore >= 70
        ? "{readinessHeadline}"
        : "There are a few areas to strengthen before borrowing.";

  const debtBurdenLabel =
    creditData.income <= 0
      ? "No income data"
      : creditData.debtRatio <= 10
        ? "Low"
        : creditData.debtRatio <= 20
          ? "Moderate"
          : "High";

  const safetyBufferLabel =
    creditData.emergencyMonths >= 3
      ? "Strong"
      : creditData.emergencyMonths >= 1
        ? "Moderate"
        : "Low";

  const strongestFactor = Object.entries(creditData.factors).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const biggestOpportunity =
    creditData.weakest === "debt"
      ? "Reduce debt burden"
      : creditData.weakest === "paymentBehavior"
        ? "Build consistent repayment records"
        : creditData.weakest === "utilization"
          ? "Track credit utilization"
          : "Build savings";

  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-sm font-medium text-slate-500">
          Understand your borrowing capacity
        </p>

        <div className="mt-1 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">

            <CreditCard size={21} />

          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Credit Readiness
          </h1>

        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Understand how prepared you are for borrowing and
          what you can improve before taking a loan or credit.
        </p>

      </div>


      {/* READINESS HERO */}

      <section className="overflow-hidden rounded-3xl bg-[#10192D] p-6 text-white shadow-sm lg:p-8">

        <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center">

          <div className="flex justify-center">

            <ScoreRing score={creditData.readinessScore} />

          </div>


          <div>

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#B9E8D0]">
                Good readiness
              </span>

              <span className="text-xs text-white/40">
                Updated today
              </span>

            </div>

            <h2 className="mt-4 text-2xl font-bold">
              You're reasonably prepared for credit.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Based on your saved transactions and goals, Finova estimates
              how prepared you are for responsible borrowing. This is an
              educational assessment, not an official credit score.
            </p>


            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <div className="rounded-xl bg-white/5 p-4">

                <p className="text-xs text-white/40">
                  Payment behavior
                </p>

                <p className="mt-1 text-lg font-bold">
                  {statusForScore(creditData.factors.paymentBehavior)}
                </p>

              </div>

              <div className="rounded-xl bg-white/5 p-4">

                <p className="text-xs text-white/40">
                  Debt burden
                </p>

                <p className="mt-1 text-lg font-bold">
                  {debtBurdenLabel}
                </p>

              </div>

              <div className="rounded-xl bg-white/5 p-4">

                <p className="text-xs text-white/40">
                  Safety buffer
                </p>

                <p className="mt-1 text-lg font-bold">
                  {safetyBufferLabel}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* IMPORTANT DISCLAIMER */}

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">

        <Info
          size={17}
          className="mt-0.5 shrink-0 text-slate-400"
        />

        <p className="text-xs leading-5 text-slate-500">
          Finova's readiness score is an educational financial
          assessment, not a lender's credit score or a guarantee
          of loan approval.
        </p>

      </div>


      {/* READINESS BREAKDOWN */}

      <section className="mt-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            Readiness Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            See which parts of your financial profile are
            helping or limiting your borrowing readiness.
          </p>

        </div>


        <div className="grid gap-4 md:grid-cols-2">

          <FactorCard
            icon={CheckCircle2}
            title="Payment behavior"
            score={creditData.factors.paymentBehavior}
            status={statusForScore(creditData.factors.paymentBehavior)}
            description={
              creditData.debtPayments > 0
                ? `Finova found ${creditData.debtPayments > 0 ? formatCurrency(creditData.debtPayments) : "no"} recorded Debt / Loan payments. This is only an app-data proxy, not an official repayment history.`
                : "No Debt / Loan payments are recorded yet. Add them in Money to improve this assessment."
            }
            positive={creditData.factors.paymentBehavior >= 85}
          />

          <FactorCard
            icon={CreditCard}
            title="Credit utilization"
            score={creditData.factors.utilization}
            status="Limited data"
            description="Your current transaction model does not store a credit limit, so Finova keeps this factor neutral instead of guessing your utilization."
          />

          <FactorCard
            icon={CircleDollarSign}
            title="Debt burden"
            score={creditData.factors.debt}
            status={statusForScore(creditData.factors.debt)}
            description={
              creditData.income > 0
                ? `Recorded Debt / Loan payments are ${Math.round(creditData.debtRatio)}% of your recorded income.`
                : "Add income and Debt / Loan transactions to calculate your debt-to-income ratio."
            }
            positive={creditData.factors.debt >= 85}
          />

          <FactorCard
            icon={ShieldCheck}
            title="Savings buffer"
            score={creditData.factors.savingsBuffer}
            status={statusForScore(creditData.factors.savingsBuffer)}
            description={
              creditData.emergencySaved > 0
                ? `Your Emergency Fund currently covers about ${creditData.emergencyMonths.toFixed(1)} months of recorded expenses.`
                : "Create an Emergency Fund goal and add contributions to measure your safety buffer."
            }
          />

        </div>

      </section>


      {/* WHY SCORE */}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">

            <BarChart3 size={20} />

          </div>

          <div className="flex-1">

            <h2 className="text-lg font-bold text-slate-900">
              Why is your readiness score {creditData.readinessScore}?
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Finova combines your saved transaction and goal data instead
              of relying on one number. Your strongest factor is
              {statusForScore(strongestFactor?.[1] || 0).toLowerCase()},
              while your biggest opportunity is {biggestOpportunity.toLowerCase()}.
            </p>


            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Payment behavior</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  +{Math.round(creditData.factors.paymentBehavior * 0.25)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Utilization</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  +{Math.round(creditData.factors.utilization * 0.15)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Debt burden</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  +{Math.round(creditData.factors.debt * 0.25)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Savings buffer</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  +{Math.round(creditData.factors.savingsBuffer * 0.2)}
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* IMPROVEMENT PLAN */}

      <section className="mt-8 rounded-2xl border border-[#CFE9DD] bg-[#F0FAF5] p-6">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D8F1E4] text-[#123C35]">

            <Lightbulb size={20} />

          </div>

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <span className="text-xs font-bold uppercase tracking-wider text-[#123C35]">
                Finova Improvement Plan
              </span>

              <span className="rounded-full bg-[#D8F1E4] px-2.5 py-1 text-[10px] font-bold text-[#123C35]">
                PERSONALIZED
              </span>

            </div>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Three changes could strengthen your profile.
            </h2>

            <div className="mt-6 space-y-6">

              <ImprovementItem
                number="1"
                title={
                  creditData.emergencyMonths < 3
                    ? "Build your emergency fund"
                    : "Maintain your emergency fund"
                }
                description={
                  creditData.emergencyMonths < 3
                    ? "Work toward at least three months of recorded expenses before taking on new debt."
                    : "Keep your emergency savings intact while considering new borrowing."
                }
                impact={
                  creditData.emergencyMonths < 3
                    ? "+ resilience"
                    : "Maintain"
                }
              />

              <ImprovementItem
                number="2"
                title={
                  creditData.debtRatio > 20
                    ? "Reduce your debt burden"
                    : "Keep debt payments manageable"
                }
                description={
                  creditData.income > 0
                    ? `Your recorded Debt / Loan payments are ${Math.round(
                        creditData.debtRatio
                      )}% of income. Keep this ratio under control.`
                    : "Add income and Debt / Loan transactions so Finova can measure your debt burden."
                }
                impact={
                  creditData.debtRatio > 20
                    ? "+ debt health"
                    : "Maintain"
                }
              />

              <ImprovementItem
                number="3"
                title="Keep financial records consistent"
                description="Continue recording income, expenses and Debt / Loan payments so Finova can make a more useful readiness assessment."
                impact="+ data quality"
              />

            </div>

          </div>

        </div>

      </section>


      {/* LOAN SIMULATOR */}

      <section className="mt-8 overflow-hidden rounded-3xl bg-[#10192D] p-6 text-white shadow-sm lg:p-8">

        <div className="flex items-center gap-2">

          <Sparkles
            size={18}
            className="text-[#B9E8D0]"
          />

          <span className="text-xs font-bold uppercase tracking-wider text-[#B9E8D0]">
            Credit Simulation
          </span>

        </div>

        <h2 className="mt-3 text-2xl font-bold">
          Can you comfortably take this loan?
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Simulate a loan and see how the monthly payment could
          affect your financial capacity.
        </p>


        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* INPUTS */}

          <div className="space-y-5">

            {/* LOAN AMOUNT */}

            <div>

              <label className="text-xs font-semibold text-slate-400">
                Loan amount
              </label>

              <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

                <span className="text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(e.target.value)
                  }
                  className="w-full bg-transparent px-2 py-3 text-sm font-semibold text-white outline-none"
                />

              </div>

            </div>


            <div className="grid gap-5 sm:grid-cols-2">

              {/* RATE */}

              <div>

                <label className="text-xs font-semibold text-slate-400">
                  Interest rate
                </label>

                <div className="relative mt-2">

                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) =>
                      setInterestRate(e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    %
                  </span>

                </div>

              </div>


              {/* TENURE */}

              <div>

                <label className="text-xs font-semibold text-slate-400">
                  Tenure
                </label>

                <div className="relative mt-2">

                  <select
                    value={tenure}
                    onChange={(e) =>
                      setTenure(e.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none"
                  >

                    <option
                      value="12"
                      className="text-slate-900"
                    >
                      12 months
                    </option>

                    <option
                      value="24"
                      className="text-slate-900"
                    >
                      24 months
                    </option>

                    <option
                      value="36"
                      className="text-slate-900"
                    >
                      36 months
                    </option>

                    <option
                      value="48"
                      className="text-slate-900"
                    >
                      48 months
                    </option>

                    <option
                      value="60"
                      className="text-slate-900"
                    >
                      60 months
                    </option>

                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

              </div>

            </div>

          </div>


          {/* EMI RESULT */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Estimated monthly EMI
            </p>

            <p className="mt-3 text-4xl font-bold text-white">
              ₹{emi.toLocaleString("en-IN")}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              for {tenure} months at {interestRate}% interest
            </p>


            <div className={`mt-6 flex items-start gap-3 rounded-xl p-3 ${
              creditData.income > 0 &&
              emi <= Math.max(0, creditData.income * 0.15 - creditData.debtPayments)
                ? "bg-emerald-400/10"
                : "bg-amber-400/10"
            }`}>

              {creditData.income > 0 &&
              emi <= Math.max(0, creditData.income * 0.15 - creditData.debtPayments) ? (
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
              ) : (
                <AlertCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-300"
                />
              )}

              <p className={`text-xs leading-5 ${
                creditData.income > 0 &&
                emi <= Math.max(0, creditData.income * 0.15 - creditData.debtPayments)
                  ? "text-emerald-300"
                  : "text-amber-200"
              }`}>
                {creditData.income <= 0
                  ? "Add income transactions to estimate whether this EMI fits your repayment capacity."
                  : emi <= Math.max(0, creditData.income * 0.15 - creditData.debtPayments)
                    ? "This EMI fits within the app's estimated additional repayment capacity."
                    : "This EMI may put pressure on your current repayment capacity."}
              </p>

            </div>

          </div>

        </div>


        <button className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]">

          Analyze Loan Impact

          <ArrowRight size={17} />

        </button>

      </section>


      {/* RECOMMENDATION */}

      <section className="mt-8 overflow-hidden rounded-2xl border border-[#CFE9DD] bg-[#F0FAF5]">

        <div className="p-6">

          <div className="flex flex-col gap-5 md:flex-row">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D8F1E4] text-[#123C35]">

              <Sparkles size={21} />

            </div>

            <div className="flex-1">

              <span className="text-xs font-bold uppercase tracking-wider text-[#123C35]">
                Finova Recommendation
              </span>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {readinessLabel} based on your saved financial data.
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                The simulated EMI is compared with your recorded income
                and Debt / Loan payments. Before taking new debt,
                your biggest opportunity is {biggestOpportunity.toLowerCase()}.
              </p>


              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Readiness
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#123C35]">
                    {creditData.readinessScore} / 100
                  </p>

                </div>

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Estimated EMI
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    ₹{emi.toLocaleString("en-IN")}
                  </p>

                </div>

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Biggest opportunity
                  </p>

                  <p className="mt-1 text-sm font-bold text-emerald-600">
                    {biggestOpportunity}
                  </p>

                </div>

              </div>


              <button className="mt-5 flex items-center gap-2 rounded-xl bg-[#123C35] px-4 py-2.5 text-sm font-semibold text-white">

                Create Improvement Plan

                <ArrowRight size={16} />

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <section className="mt-8 rounded-2xl bg-[#123C35] p-6 text-white">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-2 text-[#B9E8D0]">

              <Target size={17} />

              <span className="text-sm font-semibold">
                Borrow with confidence
              </span>

            </div>

            <h2 className="mt-2 text-xl font-bold">
              Don't just ask "Can I get the loan?"
            </h2>

            <p className="mt-1 max-w-xl text-sm text-white/60">
              Finova helps answer the more important question:
              "Can I comfortably afford the loan?"
            </p>

          </div>

          <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35]">

            Run Loan Simulation

            <ArrowRight size={17} />

          </button>

        </div>

      </section>

    </div>
  );
}