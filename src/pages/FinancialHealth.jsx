import { useEffect, useMemo, useState } from "react";
import { getTransactions } from "../utils/transactionStorage";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  HeartPulse,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

function ScoreRing({ score, change }) {
  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative flex h-[250px] w-[250px] items-center justify-center">
      <svg
        className="absolute h-full w-full -rotate-90"
        viewBox="0 0 220 220"
      >
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#E5EAF0"
          strokeWidth="14"
        />

        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#123C35"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>

      <div className="relative text-center">
        <p className="text-5xl font-bold tracking-tight text-slate-400">
          {score}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-400">
          out of 100
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#E8F7EF] px-3 py-1 text-xs font-semibold text-emerald-700">
          <TrendingUp size={13} />
          {change >= 0 ? "+" : ""}
          {change} this month
        </div>
      </div>
    </div>
  );
}

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function ScoreBar({ score }) {
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

      <div
        className="h-full rounded-full bg-[#123C35] transition-all duration-700"
        style={{
          width: `${score}%`,
        }}
      />

    </div>
  );
}

function HealthFactor({ factor }) {
  const Icon = factor.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Icon size={19} strokeWidth={1.8} />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-900">
              {factor.title}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {factor.status}
            </p>

          </div>

        </div>

        <span className="text-xl font-bold text-slate-900">
          {factor.score}
        </span>

      </div>

      <ScoreBar score={factor.score} />

      <p className="mt-3 text-xs leading-5 text-slate-500">
        {factor.description}
      </p>

    </div>
  );
}

function RecommendationCard({ recommendation }) {
  const Icon = recommendation.icon;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      <div className="flex gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <h3 className="text-sm font-bold text-slate-900">
              {recommendation.title}
            </h3>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              {recommendation.priority}
            </span>

          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {recommendation.description}
          </p>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-xs font-bold text-emerald-600">
              Potential impact {recommendation.impact}
            </span>

            <button className="flex items-center gap-1 text-xs font-semibold text-[#123C35]">
              Take action
              <ArrowRight size={14} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function FinancialHealth() {
  const [transactions, setTransactions] = useState(() => {
    try {
      return getTransactions();
    } catch {
      return [];
    }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem("finova_goals");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const refreshFinancialData = () => {
      try {
        setTransactions(getTransactions());
      } catch {
        setTransactions([]);
      }

      try {
        const saved = localStorage.getItem("finova_goals");
        setGoals(saved ? JSON.parse(saved) : []);
      } catch {
        setGoals([]);
      }
    };

    refreshFinancialData();

    window.addEventListener("storage", refreshFinancialData);
    window.addEventListener("focus", refreshFinancialData);

    return () => {
      window.removeEventListener("storage", refreshFinancialData);
      window.removeEventListener("focus", refreshFinancialData);
    };
  }, []);

  const financialData = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "Income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const expenses = transactions
      .filter((item) => item.type === "Expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const savings = Math.max(0, income - expenses);
    const savingsRate = income > 0
      ? Math.round((savings / income) * 100)
      : 0;

    const emergencyGoal =
      goals.find(
        (goal) =>
          String(goal.name || "").trim().toLowerCase() ===
          "emergency fund"
      ) || null;

    const emergencySaved = Number(emergencyGoal?.current || 0);

    const monthlyEssentialExpenses = expenses;
    const emergencyMonths =
      monthlyEssentialExpenses > 0
        ? emergencySaved / monthlyEssentialExpenses
        : 0;

    const emergencyScore = Math.min(
      100,
      Math.round((emergencyMonths / 3) * 100)
    );

    const debtTransactions = transactions.filter((item) => {
      const text =
        `${item.name || ""} ${item.category || ""}`.toLowerCase();

      return (
        item.type === "Expense" &&
        /(debt|loan|emi|credit payment|credit card payment)/i.test(text)
      );
    });

    const debtPayments = debtTransactions.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const debtRatio = income > 0
      ? Math.round((debtPayments / income) * 100)
      : 0;

    const debtScore =
      income > 0
        ? Math.max(0, Math.min(100, 100 - debtRatio * 2))
        : 50;

    const spendingScore =
      income > 0
        ? Math.max(
            0,
            Math.min(100, Math.round(100 - (expenses / income) * 100))
          )
        : 50;

    const goalProgress =
      goals.length > 0
        ? Math.round(
            goals.reduce(
              (sum, goal) => sum + Number(goal.progress || 0),
              0
            ) / goals.length
          )
        : 0;

    const savingsScore = Math.max(
      0,
      Math.min(100, Math.round(savingsRate * 1.5))
    );

    const overallScore = Math.round(
      savingsScore * 0.25 +
      spendingScore * 0.2 +
      emergencyScore * 0.2 +
      debtScore * 0.15 +
      goalProgress * 0.2
    );

    const strongest = [
      ["Savings Health", savingsScore],
      ["Spending Health", spendingScore],
      ["Emergency Fund", emergencyScore],
      ["Debt Health", debtScore],
      ["Goal Progress", goalProgress],
    ].sort((a, b) => b[1] - a[1]);

    const weakest = [
      ["Savings Health", savingsScore],
      ["Spending Health", spendingScore],
      ["Emergency Fund", emergencyScore],
      ["Debt Health", debtScore],
      ["Goal Progress", goalProgress],
    ].sort((a, b) => a[1] - b[1])[0];

    return {
      income,
      expenses,
      savings,
      savingsRate,
      emergencySaved,
      emergencyMonths,
      emergencyScore,
      debtPayments,
      debtRatio,
      debtScore,
      spendingScore,
      goalProgress,
      savingsScore,
      overallScore,
      weakest,
      strongest,
    };
  }, [transactions, goals]);

  const healthFactors = useMemo(() => {
    const makeStatus = (score) => {
      if (score >= 85) return "Excellent";
      if (score >= 70) return "Healthy";
      if (score >= 50) return "Needs attention";
      return "Needs improvement";
    };

    return [
      {
        title: "Savings Health",
        description:
          financialData.income > 0
            ? `You're saving ${financialData.savingsRate}% of your recorded income.`
            : "Add income and expense transactions to measure your savings rate.",
        score: financialData.savingsScore,
        icon: PiggyBank,
        status: makeStatus(financialData.savingsScore),
      },
      {
        title: "Spending Health",
        description:
          financialData.income > 0
            ? `Your recorded expenses are ${Math.round(
                (financialData.expenses / financialData.income) * 100
              )}% of your income.`
            : "Add transactions to measure your spending health.",
        score: financialData.spendingScore,
        icon: Wallet,
        status: makeStatus(financialData.spendingScore),
      },
      {
        title: "Emergency Fund",
        description:
          financialData.emergencySaved > 0
            ? `Your emergency fund currently covers about ${financialData.emergencyMonths.toFixed(
                1
              )} months of recorded expenses.`
            : "Create an Emergency Fund goal to track your safety buffer.",
        score: financialData.emergencyScore,
        icon: ShieldCheck,
        status: makeStatus(financialData.emergencyScore),
      },
      {
        title: "Debt Health",
        description:
          financialData.debtPayments > 0
            ? `Detected debt-related payments are ${financialData.debtRatio}% of recorded income.`
            : "No debt-related payments were detected in your transactions.",
        score: financialData.debtScore,
        icon: TrendingDown,
        status: makeStatus(financialData.debtScore),
      },
      {
        title: "Goal Progress",
        description:
          goals.length > 0
            ? `You're ${financialData.goalProgress}% through your average active goal progress.`
            : "Create a goal to start tracking your financial progress.",
        score: financialData.goalProgress,
        icon: Target,
        status: makeStatus(financialData.goalProgress),
      },
    ];
  }, [financialData, goals.length]);

  const recommendations = useMemo(() => {
    const actions = [];

    if (financialData.emergencyScore < 85) {
      const remaining =
        financialData.emergencySaved > 0
          ? Math.max(
              0,
              financialData.emergencySaved * 0 +
                Math.max(
                  0,
                  financialData.expenses * 3 -
                    financialData.emergencySaved
                )
            )
          : Math.max(0, financialData.expenses * 3);

      actions.push({
        title: "Build your emergency fund",
        description:
          remaining > 0
            ? `Add ${formatCurrency(
                remaining
              )} over time to reach a 3-month safety target based on your recorded expenses.`
            : "Create an Emergency Fund goal and start contributing monthly.",
        impact: "+ resilience",
        icon: ShieldCheck,
        priority: "High priority",
      });
    }

    if (financialData.spendingScore < 80) {
      actions.push({
        title: "Reduce unnecessary spending",
        description:
          financialData.income > 0
            ? `Your recorded expenses are using ${Math.round(
                (financialData.expenses / financialData.income) * 100
              )}% of your income. Look for one category to reduce this month.`
            : "Add transactions so Finova can identify your spending patterns.",
        impact: "+ spending health",
        icon: TrendingDown,
        priority: "Recommended",
      });
    }

    if (financialData.savingsRate < 20) {
      actions.push({
        title: "Increase your monthly savings",
        description:
          "Try redirecting part of your discretionary spending toward savings or an active goal.",
        impact: "+ savings health",
        icon: PiggyBank,
        priority: "Recommended",
      });
    }

    if (financialData.goalProgress < 70) {
      actions.push({
        title: "Increase goal contribution",
        description:
          goals.length > 0
            ? "Increase the monthly contribution on one active goal to reach it sooner."
            : "Create your first financial goal to start measuring goal progress.",
        impact: "+ goal progress",
        icon: Target,
        priority: "Recommended",
      });
    }

    if (financialData.debtScore < 75) {
      actions.push({
        title: "Review debt payments",
        description:
          "Debt-related transactions are taking a noticeable share of recorded income. Review them before adding new obligations.",
        impact: "+ debt health",
        icon: TrendingDown,
        priority: "High priority",
      });
    }

    if (actions.length === 0) {
      actions.push({
        title: "Maintain your current habits",
        description:
          "Your recorded financial data is looking healthy. Keep monitoring your spending, savings and goals.",
        impact: "Maintain",
        icon: CheckCircle2,
        priority: "Recommended",
      });
    }

    return actions.slice(0, 3);
  }, [financialData, goals.length]);

  const improvementPlan = useMemo(
    () => [
      {
        day: "Week 1",
        title: "Review your spending",
        description:
          financialData.expenses > 0
            ? `Review your ${formatCurrency(
                financialData.expenses
              )} of recorded expenses and identify one category to optimize.`
            : "Add a few transactions so Finova can identify your spending patterns.",
        completed: financialData.expenses > 0,
      },
      {
        day: "Week 2",
        title: "Strengthen your emergency fund",
        description:
          financialData.emergencySaved > 0
            ? `Your current emergency fund is ${formatCurrency(
                financialData.emergencySaved
              )}. Keep contributing toward three months of expenses.`
            : "Create an Emergency Fund goal and set a monthly contribution.",
        completed: financialData.emergencyScore >= 85,
      },
      {
        day: "Week 3",
        title: "Optimize one recurring expense",
        description:
          financialData.expenses > 0
            ? "Review recurring payments and remove one unnecessary expense if possible."
            : "Add your recurring expenses to Transactions so they can be reviewed.",
        completed: false,
      },
      {
        day: "Week 4",
        title: "Review your progress",
        description:
          "Come back after adding your latest transactions and goal progress to see how your score changed.",
        completed: false,
      },
    ],
    [financialData]
  );

  const completedPlan = improvementPlan.filter(
    (item) => item.completed
  ).length;

  const scoreChange = 0;

  const healthMessage =
    financialData.overallScore >= 85
      ? "You're in a strong financial position."
      : financialData.overallScore >= 70
        ? "You're doing well, with a few areas that can still improve."
        : financialData.overallScore >= 50
          ? "You're making progress, but a few financial areas need attention."
          : "Your current data shows several areas where improvement could make a meaningful difference.";

  const weakestTitle = financialData.weakest?.[0] || "your finances";

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Your financial wellbeing
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Financial Health
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              A simple view of how financially healthy you are today
              and what you can improve next.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Updated today
          </div>
        </div>
      </div>

      {/* MAIN SCORE */}
      <section className="overflow-hidden rounded-3xl bg-[#10192D] p-6 text-white shadow-sm lg:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
          <div className="flex justify-center">
            <ScoreRing
              score={financialData.overallScore}
              change={scoreChange}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <HeartPulse
                size={20}
                className="text-[#B9E8D0]"
              />
              <span className="text-sm font-semibold text-[#B9E8D0]">
                Overall Financial Health
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              {healthMessage}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Based on your recorded transactions and goals, your biggest
              opportunity right now is {weakestTitle.toLowerCase()}.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">
                  Savings rate
                </p>
                <p className="mt-1 text-lg font-bold">
                  {financialData.savingsRate}%
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">
                  Emergency fund
                </p>
                <p className="mt-1 text-lg font-bold">
                  {financialData.emergencyMonths.toFixed(1)} months
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">
                  Debt ratio
                </p>
                <p className="mt-1 text-lg font-bold">
                  {financialData.debtRatio}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCORE EXPLANATION */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F7EF] text-[#123C35]">
                <Lightbulb size={18} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Why is your score {financialData.overallScore}?
              </h2>
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              Finova calculates this estimate using your recorded savings,
              spending behavior, emergency fund, debt burden and progress
              toward your financial goals.
            </p>
          </div>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[#123C35]"
            onClick={() =>
              window.alert(
                "Your Finova Financial Health score is an educational estimate based on your recorded transactions and goals."
              )
            }
          >
            How scoring works
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* SCORE BREAKDOWN */}
      <section className="mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Score Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Here's what is influencing your financial health.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {healthFactors.map((factor) => (
            <HealthFactor
              key={factor.title}
              factor={factor}
            />
          ))}
        </div>
      </section>

      {/* AI INSIGHT */}
      <section className="mt-8 overflow-hidden rounded-2xl border border-[#CFE9DD] bg-[#F0FAF5]">
        <div className="p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D8F1E4] text-[#123C35]">
              <Sparkles size={21} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#123C35]">
                  Finova Intelligence
                </span>

                <span className="rounded-full bg-[#D8F1E4] px-2 py-0.5 text-[10px] font-bold text-[#123C35]">
                  DATA INSIGHT
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Your biggest opportunity is {weakestTitle.toLowerCase()}.
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {financialData.emergencyScore < 85
                  ? `Your emergency fund currently covers about ${financialData.emergencyMonths.toFixed(
                      1
                    )} months of recorded expenses.`
                  : financialData.spendingScore < 80
                    ? "Your spending is using a large share of your recorded income. Reviewing discretionary categories could improve your health."
                    : financialData.goalProgress < 70
                      ? "Your active goals are progressing, but increasing one monthly contribution could help you reach it sooner."
                      : "Your recorded financial habits are looking healthy. Keep monitoring your transactions and goals consistently."}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    const target = document.getElementById("recommended-actions");
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-xl bg-[#123C35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D302B]"
                >
                  See recommended actions
                </button>

                <button
                  type="button"
                  onClick={() =>
                    window.alert(
                      "Score factors: Savings 25%, Spending 20%, Emergency Fund 20%, Debt 15%, Goals 20%."
                    )
                  }
                  className="rounded-xl border border-[#BBDDCF] bg-white px-4 py-2.5 text-sm font-semibold text-[#123C35]"
                >
                  See calculation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section id="recommended-actions" className="mt-8">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <CircleAlert
              size={20}
              className="text-slate-700"
            />
            <h2 className="text-xl font-bold text-slate-900">
              Recommended Actions
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Small actions that can improve your financial health.
          </p>
        </div>

        <div className="grid gap-4">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.title}
              recommendation={recommendation}
            />
          ))}
        </div>
      </section>

      {/* 30 DAY PLAN */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-2">
              <Target
                size={20}
                className="text-[#123C35]"
              />
              <h2 className="text-xl font-bold text-slate-900">
                Your 30-Day Improvement Plan
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Four simple steps based on your current financial data.
            </p>
          </div>

          <span className="rounded-full bg-[#E8F7EF] px-3 py-1.5 text-xs font-semibold text-emerald-700">
            {completedPlan} of 4 completed
          </span>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {improvementPlan.map((item, index) => (
            <div
              key={item.day}
              className={`rounded-2xl border p-5 ${
                item.completed
                  ? "border-[#CFE9DD] bg-[#F5FBF7]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  {item.completed ? (
                    <CheckCircle2
                      size={20}
                      className="text-emerald-600"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-500">
                      {index + 1}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {item.day}
                  </p>

                  <h3 className="mt-1 text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="mt-8 rounded-2xl bg-[#123C35] p-6 text-white">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#B9E8D0]">
              <Sparkles size={17} />
              <span className="text-sm font-semibold">
                Want a deeper analysis?
              </span>
            </div>

            <h2 className="mt-2 text-xl font-bold">
              Ask Finova AI about your financial health.
            </h2>

            <p className="mt-1 text-sm text-white/60">
              Get personalized answers based on your financial behavior.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              window.alert(
                "AI Copilot integration can be connected here later."
              )
            }
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]"
          >
            Open AI Copilot
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}