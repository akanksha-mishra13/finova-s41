import { useMemo, useState } from "react";
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

const cashFlowData = [
  {
    month: "Mar",
    income: 42000,
    expense: 17500,
  },
  {
    month: "Apr",
    income: 45000,
    expense: 19200,
  },
  {
    month: "May",
    income: 46000,
    expense: 21000,
  },
  {
    month: "Jun",
    income: 47000,
    expense: 18800,
  },
  {
    month: "Jul",
    income: 45600,
    expense: 21200,
  },
  {
    month: "Aug",
    income: 48000,
    expense: 18500,
  },
];

const spendingCategories = [
  {
    name: "Food",
    amount: 5200,
    percentage: 28,
    icon: Utensils,
  },
  {
    name: "Shopping",
    amount: 3900,
    percentage: 21,
    icon: ShoppingBag,
  },
  {
    name: "Transport",
    amount: 2800,
    percentage: 15,
    icon: Wallet,
  },
  {
    name: "Entertainment",
    amount: 2100,
    percentage: 11,
    icon: CreditCard,
  },
  {
    name: "Bills",
    amount: 2500,
    percentage: 14,
    icon: Banknote,
  },
];

const recentTransactions = [
  {
    id: 1,
    name: "Swiggy",
    category: "Food",
    date: "Today",
    amount: 420,
    type: "expense",
    icon: Utensils,
  },
  {
    id: 2,
    name: "Amazon",
    category: "Shopping",
    date: "Yesterday",
    amount: 1299,
    type: "expense",
    icon: ShoppingBag,
  },
  {
    id: 3,
    name: "Salary",
    category: "Income",
    date: "10 Aug",
    amount: 48000,
    type: "income",
    icon: Banknote,
  },
  {
    id: 4,
    name: "Uber",
    category: "Transport",
    date: "9 Aug",
    amount: 280,
    type: "expense",
    icon: Wallet,
  },
];

const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

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
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

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

            <span className="text-xs text-slate-400">
              {subtitle}
            </span>

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
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl">

      <p className="mb-2 text-sm font-semibold text-slate-900">
        {label}
      </p>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="flex items-center justify-between gap-6 text-sm"
        >
          <span className="text-slate-500">
            {item.dataKey === "income"
              ? "Income"
              : "Expenses"}
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
  const Icon = category.icon;

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
            style={{
              width: `${category.percentage}%`,
            }}
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
  const Icon = transaction.icon;

  return (
    <div className="flex items-center justify-between gap-4 py-4">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={18} />
        </div>

        <div className="min-w-0">

          <p className="truncate text-sm font-semibold text-slate-900">
            {transaction.name}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {transaction.category} · {transaction.date}
          </p>

        </div>

      </div>

      <p
        className={`shrink-0 text-sm font-semibold ${
          transaction.type === "income"
            ? "text-emerald-600"
            : "text-slate-900"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </p>

    </div>
  );
}

export default function Money() {
  const [period, setPeriod] = useState("6 Months");

  const totalIncome = 48000;
  const totalExpenses = 18500;
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = Math.round(
    (totalSavings / totalIncome) * 100
  );

  const spendingInsight = useMemo(() => {
    if (totalExpenses < 20000) {
      return {
        type: "positive",
        title: "You're spending within your limits",
        message:
          "Your current spending is below ₹20,000 this month. You're maintaining a healthy savings rate.",
      };
    }

    return {
      type: "warning",
      title: "Spending is getting high",
      message:
        "Your expenses are approaching your monthly limit. Consider reviewing discretionary spending.",
    };
  }, [totalExpenses]);

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

        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#10192D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#17223A]">

          <Plus size={18} />

          Add Transaction

        </button>

      </div>


      {/* SUMMARY CARDS */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Balance"
          value="₹1,24,850"
          subtitle="vs last month"
          trend="+8.4%"
          trendType="positive"
          icon={Wallet}
        />

        <StatCard
          title="Monthly Income"
          value={formatCurrency(totalIncome)}
          subtitle="vs last month"
          trend="+5.2%"
          trendType="positive"
          icon={ArrowDownLeft}
        />

        <StatCard
          title="Monthly Spending"
          value={formatCurrency(totalExpenses)}
          subtitle="vs last month"
          trend="-12.8%"
          trendType="positive"
          icon={ArrowUpRight}
        />

        <StatCard
          title="Monthly Savings"
          value={formatCurrency(totalSavings)}
          subtitle={`${savingsRate}% savings rate`}
          trend="+14.6%"
          trendType="positive"
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

          <button className="shrink-0 text-sm font-semibold text-[#123C35] underline underline-offset-4">
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
                data={cashFlowData}
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

                <Tooltip
                  content={<CustomTooltip />}
                />

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

            <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
              <MoreHorizontal size={20} />
            </button>

          </div>


          <div className="mt-7 space-y-6">

            {spendingCategories.map((category) => (
              <CategoryRow
                key={category.name}
                category={category}
              />
            ))}

          </div>


          <button className="mt-7 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
            View all categories
          </button>

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

            <Target
              size={21}
              className="text-slate-500"
            />

          </div>


          <div className="mt-7">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-3xl font-bold text-slate-900">
                  ₹29,500
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  saved this month
                </p>

              </div>

              <p className="text-sm font-semibold text-emerald-600">
                84% of target
              </p>

            </div>


            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-[#123C35]"
                style={{ width: "84%" }}
              />

            </div>


            <div className="mt-3 flex justify-between text-xs text-slate-400">

              <span>
                ₹29,500 saved
              </span>

              <span>
                Target ₹35,000
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
                  You're on track
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Save another ₹5,500 this month to reach
                  your target.
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

            <button className="text-sm font-semibold text-[#123C35] hover:underline">
              View all
            </button>

          </div>


          <div className="mt-3 divide-y divide-slate-100">

            {recentTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}

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
              You're saving more than you're spending.
              Keep this momentum and you'll reach your
              current savings target soon.
            </p>

          </div>

          <button className="shrink-0 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]">
            View Financial Health
          </button>

        </div>

      </section>

    </div>
  );
}