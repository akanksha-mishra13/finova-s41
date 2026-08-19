import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  ChevronDown,
  CreditCard,
  MoreHorizontal,
  Plus,
  ShoppingBag,
  Target,
  TrendingDown,
  TrendingUp,
  Utensils,
  Wallet,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getTransactions,
  saveTransactions,
} from "../utils/transactionStorage";

const CATEGORY_ICONS = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Transport: Wallet,
  Entertainment: CreditCard,
  Bills: Banknote,
  "Debt / Loan": CreditCard,
  Income: Banknote,
};

const CATEGORY_OPTIONS = [
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Debt / Loan",
  "Other",
];

const formatCurrency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

function getIconForTransaction(transaction) {
  return (
    transaction.icon ||
    CATEGORY_ICONS[transaction.category] ||
    (transaction.type === "Income" ? Banknote : CreditCard)
  );
}

function formatDate(dateValue) {
  if (!dateValue) return "Today";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            {trend && (
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  trendType === "positive"
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {trendType === "positive" ? (
                  <TrendingUp size={13} />
                ) : (
                  <TrendingDown size={13} />
                )}
                {trend}
              </span>
            )}

            <span className="text-xs text-slate-400">{subtitle}</span>
          </div>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={21} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="mb-2 text-sm font-semibold text-slate-900">{label}</p>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="flex items-center justify-between gap-6 text-sm"
        >
          <span className="text-slate-500">
            {item.dataKey === "income" ? "Income" : "Expenses"}
          </span>

          <span className="font-semibold text-slate-900">
            {formatCurrency(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

function CategoryRow({ category }) {
  const Icon = category.icon || CreditCard;

  return (
    <div className="group flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Icon size={18} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-800">
            {category.name}
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {formatCurrency(category.amount)}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#123C35] transition-all duration-700"
            style={{ width: `${category.percentage}%` }}
          />
        </div>

        <p className="mt-1 text-xs text-slate-400">
          {category.percentage}% of total spending
        </p>
      </div>
    </div>
  );
}

function TransactionRow({ transaction }) {
  const Icon = getIconForTransaction(transaction);
  const isIncome = transaction.type === "Income";

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {transaction.name || transaction.description || "Transaction"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {transaction.category || "Other"} ·{" "}
            {formatDate(transaction.date || transaction.createdAt)}
          </p>
        </div>
      </div>

      <p
        className={`shrink-0 text-sm font-semibold ${
          isIncome ? "text-emerald-600" : "text-slate-900"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}

function AddTransactionModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    type: "Expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(form.amount);

    if (!form.name.trim()) {
      setError("Please enter a transaction name.");
      return;
    }

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    onAdd({
      ...form,
      name: form.name.trim(),
      amount,
      type: form.type,
      category:
        form.type === "Income" ? "Income" : form.category,
      date: form.date,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add Transaction
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add income, expenses, or debt payments to your finances.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Swiggy, Salary"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Amount
              </label>
              <input
                type="number"
                min="1"
                value={form.amount}
                onChange={(e) => updateField("amount", e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              {["Expense", "Income"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField("type", type)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    form.type === type
                      ? "border-[#123C35] bg-[#123C35] text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {form.type === "Expense" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123C35]"
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              {form.category === "Debt / Loan" && (
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Use this category for loan EMIs, personal loans, vehicle
                  loans, home loans, or credit-card payments. Financial
                  Health will use these transactions for Debt Health.
                </p>
              )}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description
            </label>
            <input
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              placeholder={
                form.category === "Debt / Loan"
                  ? "e.g. Personal loan EMI, credit card payment"
                  : "Optional"
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#10192D] px-4 py-3 text-sm font-semibold text-white hover:bg-[#17223A]"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Money() {
  const navigate = useNavigate();

  const [period, setPeriod] = useState("6 Months");
  const [transactions, setTransactions] = useState(() =>
    getTransactions()
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "Income")
        .reduce(
          (total, transaction) =>
            total + Number(transaction.amount || 0),
          0
        ),
    [transactions]
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce(
          (total, transaction) =>
            total + Number(transaction.amount || 0),
          0
        ),
    [transactions]
  );

  const totalSavings = totalIncome - totalExpenses;
  const totalBalance = totalSavings;

  const savingsRate =
    totalIncome > 0
      ? Math.round((totalSavings / totalIncome) * 100)
      : 0;

  const spendingInsight = useMemo(() => {
    if (transactions.length === 0) {
      return {
        type: "positive",
        title: "Start tracking your finances",
        message:
          "Add your first transaction to see your spending, savings and cash-flow insights here.",
      };
    }

    if (totalExpenses < totalIncome * 0.5) {
      return {
        type: "positive",
        title: "You're spending within your limits",
        message:
          "Your current expenses are below half of your income. You're maintaining a healthy savings rate.",
      };
    }

    return {
      type: "warning",
      title: "Spending is getting high",
      message:
        "Your expenses are taking up a large part of your income. Consider reviewing discretionary spending.",
    };
  }, [transactions.length, totalExpenses, totalIncome]);

  const spendingCategories = useMemo(() => {
    const expenses = transactions.filter(
      (transaction) => transaction.type === "Expense"
    );

    const totals = {};

    expenses.forEach((transaction) => {
      const category = transaction.category || "Other";
      totals[category] =
        (totals[category] || 0) +
        Number(transaction.amount || 0);
    });

    return Object.entries(totals)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage:
          totalExpenses > 0
            ? Math.round((amount / totalExpenses) * 100)
            : 0,
        icon: CATEGORY_ICONS[name] || CreditCard,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, totalExpenses]);

  const displayedCategories = showAllCategories
    ? spendingCategories
    : spendingCategories.slice(0, 5);

  const monthlyCashFlow = useMemo(() => {
    const months = [];
    const now = new Date();

    for (let i = 11; i >= 0; i -= 1) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      months.push({
        key: monthKey,
        month: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        income: 0,
        expense: 0,
      });
    }

    transactions.forEach((transaction) => {
      const dateValue =
        transaction.date || transaction.createdAt;

      if (!dateValue) return;

      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return;

      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      const month = months.find((item) => item.key === key);
      if (!month) return;

      if (transaction.type === "Income") {
        month.income += Number(transaction.amount || 0);
      } else {
        month.expense += Number(transaction.amount || 0);
      }
    });

    return months;
  }, [transactions]);

  const chartData = useMemo(() => {
    if (period === "3 Months") {
      return monthlyCashFlow.slice(-3);
    }

    if (period === "6 Months") {
      return monthlyCashFlow.slice(-6);
    }

    return monthlyCashFlow;
  }, [period, monthlyCashFlow]);

  const recentTransactions = transactions.slice(0, 5);

  const savingsTarget = 35000;
  const savingsProgress =
    savingsTarget > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((totalSavings / savingsTarget) * 100))
        )
      : 0;

  function handleAddTransaction(transaction) {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedTransactions = [
      newTransaction,
      ...transactions,
    ];

    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    setShowAddModal(false);
  }

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Your finances
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Money
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Understand your cash flow, spending and savings.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#10192D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#17223A]"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          subtitle="income minus spending"
          trend={transactions.length ? `${transactions.length} tracked` : undefined}
          trendType="positive"
          icon={Wallet}
        />

        <StatCard
          title="Monthly Income"
          value={formatCurrency(totalIncome)}
          subtitle="tracked income"
          icon={ArrowDownLeft}
        />

        <StatCard
          title="Monthly Spending"
          value={formatCurrency(totalExpenses)}
          subtitle="tracked expenses"
          icon={ArrowUpRight}
        />

        <StatCard
          title="Monthly Savings"
          value={formatCurrency(totalSavings)}
          subtitle={`${savingsRate}% savings rate`}
          trendType={totalSavings >= 0 ? "positive" : "negative"}
          icon={Target}
        />
      </div>

      {/* INSIGHT */}
      <div className="mt-6 rounded-2xl border border-[#D8EEE4] bg-[#F0FAF5] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D8F1E4] text-[#123C35]">
              <TrendingUp size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-[#123C35]">
                {spendingInsight.title}
              </p>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                {spendingInsight.message}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/health")}
            className="shrink-0 text-sm font-semibold text-[#123C35] underline underline-offset-4"
          >
            View insights →
          </button>
        </div>
      </div>

      {/* CHART + CATEGORY */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        {/* CASH FLOW */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Cash Flow
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Income vs expenses over time
              </p>
            </div>

            <div className="relative">
              <select
                value={period}
                onChange={(event) =>
                  setPeriod(event.target.value)
                }
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-600 outline-none focus:border-slate-400"
              >
                <option>6 Months</option>
                <option>3 Months</option>
                <option>12 Months</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div className="mb-5 flex gap-5">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-[#123C35]" />
              Income
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              Expenses
            </div>
          </div>

          <div className="h-[310px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="incomeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#123C35"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor="#123C35"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="expenseGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#94A3B8"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="100%"
                      stopColor="#94A3B8"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94A3B8",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94A3B8",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) =>
                    `₹${value / 1000}k`
                  }
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#123C35"
                  strokeWidth={3}
                  fill="url(#incomeGradient)"
                />

                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  fill="url(#expenseGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* SPENDING CATEGORIES */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Spending by Category
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Where your money went this month
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  setShowCategoryMenu((current) => !current)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <MoreHorizontal size={20} />
              </button>

              {showCategoryMenu && (
                <div className="absolute right-0 top-10 z-10 w-40 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                  <button
                    onClick={() => {
                      setShowAllCategories(true);
                      setShowCategoryMenu(false);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Show all
                  </button>

                  <button
                    onClick={() => {
                      setShowAllCategories(false);
                      setShowCategoryMenu(false);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Show top 5
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-7 space-y-6">
            {displayedCategories.length > 0 ? (
              displayedCategories.map((category) => (
                <CategoryRow
                  key={category.name}
                  category={category}
                />
              ))
            ) : (
              <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                No expenses yet. Add an expense to see your
                spending categories.
              </div>
            )}
          </div>

          {spendingCategories.length > 5 && (
            <button
              onClick={() =>
                setShowAllCategories((current) => !current)
              }
              className="mt-7 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              {showAllCategories
                ? "Show fewer categories"
                : "View all categories"}
            </button>
          )}
        </section>
      </div>

      {/* LOWER SECTION */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        {/* SAVINGS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Savings Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your progress toward your monthly target
              </p>
            </div>

            <Target size={21} className="text-slate-500" />
          </div>

          <div className="mt-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(Math.max(0, totalSavings))}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  saved this month
                </p>
              </div>

              <p className="text-sm font-semibold text-emerald-600">
                {savingsProgress}% of target
              </p>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#123C35] transition-all duration-700"
                style={{ width: `${savingsProgress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-400">
              <span>
                {formatCurrency(Math.max(0, totalSavings))} saved
              </span>

              <span>
                Target {formatCurrency(savingsTarget)}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D8F1E4] text-[#123C35]">
                <TrendingUp size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {totalSavings >= savingsTarget
                    ? "Target reached"
                    : totalSavings > 0
                    ? "You're on track"
                    : "Start saving"}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {totalSavings >= savingsTarget
                    ? "You've reached your current monthly savings target."
                    : `Save another ${formatCurrency(
                        Math.max(0, savingsTarget - totalSavings)
                      )} this month to reach your target.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT TRANSACTIONS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Transactions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest financial activity
              </p>
            </div>

            <button
              onClick={() => navigate("/transactions")}
              className="text-sm font-semibold text-[#123C35] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm font-medium text-slate-600">
                  No transactions yet
                </p>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-2 text-sm font-semibold text-[#123C35] hover:underline"
                >
                  Add your first transaction
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* FINANCIAL HEALTH ACTION */}
      <section className="mt-6 rounded-2xl bg-[#10192D] p-6 text-white shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays
                size={18}
                className="text-[#B9E8D0]"
              />

              <span className="text-sm font-semibold text-[#B9E8D0]">
                Monthly financial check-in
              </span>
            </div>

            <h2 className="mt-2 text-xl font-bold">
              Your savings rate is {savingsRate}% this month.
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
              {totalSavings >= 0
                ? "You're saving more than you're spending. Keep this momentum."
                : "Your spending is currently higher than your income. Review your recent expenses."}
            </p>
          </div>

          <button
            onClick={() => navigate("/health")}
            className="shrink-0 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]"
          >
            View Financial Health
          </button>
        </div>
      </section>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </div>
  );
}