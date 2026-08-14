import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  IndianRupee,
  PiggyBank,
  Target,
  TrendingUp,
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

const spendingData = [
  { month: "Mar", spending: 18000 },
  { month: "Apr", spending: 21000 },
  { month: "May", spending: 19500 },
  { month: "Jun", spending: 24000 },
  { month: "Jul", spending: 22000 },
  { month: "Aug", spending: 18500 },
];

const transactions = [
  {
    name: "Swiggy",
    category: "Food",
    amount: "-₹420",
    date: "Today",
  },
  {
    name: "Amazon",
    category: "Shopping",
    amount: "-₹1,299",
    date: "Yesterday",
  },
  {
    name: "Salary",
    category: "Income",
    amount: "+₹48,000",
    date: "Aug 10",
  },
  {
    name: "Uber",
    category: "Transport",
    amount: "-₹280",
    date: "Aug 9",
  },
];

function StatCard({ title, value, change, icon: Icon, positive }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-100 p-3">
          <Icon size={22} className="text-slate-700" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        {positive ? (
          <ArrowUpRight size={16} className="text-emerald-500" />
        ) : (
          <ArrowDownRight size={16} className="text-red-500" />
        )}

        <span
          className={
            positive
              ? "font-semibold text-emerald-600"
              : "font-semibold text-red-500"
          }
        >
          {change}
        </span>

        <span className="text-slate-400">
          vs last month
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Friday, August 14
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Good evening, Akanksha 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's your financial health overview.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          <IndianRupee size={17} />
          Add Transaction
        </button>

      </div>


      {/* FINANCIAL HEALTH */}

      <div className="mb-6 rounded-2xl bg-slate-900 p-6 text-white shadow-lg">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-2">
              <TrendingUp size={20} />

              <p className="text-sm font-medium text-slate-300">
                Financial Health Score
              </p>
            </div>

            <div className="mt-3 flex items-end gap-3">

              <span className="text-5xl font-bold">
                82
              </span>

              <span className="mb-2 text-sm text-slate-300">
                / 100
              </span>

            </div>

            <p className="mt-2 text-sm text-emerald-400">
              Excellent financial health
            </p>

          </div>


          <div className="max-w-md">

            <p className="text-sm leading-6 text-slate-300">
              You're spending within your limits and maintaining
              a healthy savings rate. Keep it up!
            </p>

            <button className="mt-4 text-sm font-semibold text-white underline underline-offset-4">
              View detailed analysis →
            </button>

          </div>

        </div>

      </div>


      {/* STAT CARDS */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Balance"
          value="₹1,24,850"
          change="+8.4%"
          icon={Wallet}
          positive
        />

        <StatCard
          title="Monthly Income"
          value="₹48,000"
          change="+5.2%"
          icon={ArrowUpRight}
          positive
        />

        <StatCard
          title="Monthly Spending"
          value="₹18,500"
          change="-12.8%"
          icon={CreditCard}
          positive
        />

        <StatCard
          title="Total Savings"
          value="₹29,500"
          change="+14.6%"
          icon={PiggyBank}
          positive
        />

      </div>


      {/* CHART + BUDGET */}

      <div className="mt-6 grid gap-6 xl:grid-cols-3">

        {/* CHART */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Spending Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your spending trend over the last 6 months
              </p>
            </div>

            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none">
              <option>6 Months</option>
              <option>12 Months</option>
            </select>

          </div>


          <div className="mt-6 h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={spendingData}>

                <defs>
                  <linearGradient
                    id="spendingGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="100%"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />

                <Tooltip
                  formatter={(value) => [
                    `₹${value.toLocaleString()}`,
                    "Spending",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="spending"
                  strokeWidth={3}
                  fill="url(#spendingGradient)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* BUDGET */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Monthly Budget
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                August 2026
              </p>

            </div>

            <Target size={22} className="text-slate-600" />

          </div>


          <div className="mt-8 flex items-center justify-center">

            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-slate-200">

              <div className="text-center">

                <p className="text-3xl font-bold text-slate-900">
                  62%
                </p>

                <p className="text-xs text-slate-500">
                  used
                </p>

              </div>

            </div>

          </div>


          <div className="mt-8 space-y-4">

            <div className="flex justify-between text-sm">

              <span className="text-slate-500">
                Spent
              </span>

              <span className="font-semibold text-slate-900">
                ₹18,500
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-slate-500">
                Remaining
              </span>

              <span className="font-semibold text-emerald-600">
                ₹11,500
              </span>

            </div>

          </div>


          <button className="mt-6 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Manage Budget
          </button>

        </div>

      </div>


      {/* TRANSACTIONS */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Recent Transactions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest financial activity
            </p>

          </div>

          <button className="text-sm font-semibold text-slate-700 hover:underline">
            View all
          </button>

        </div>


        <div className="mt-6 divide-y divide-slate-100">

          {transactions.map((transaction, index) => (

            <div
              key={index}
              className="flex items-center justify-between py-4"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <CreditCard
                    size={19}
                    className="text-slate-600"
                  />
                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    {transaction.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {transaction.category} · {transaction.date}
                  </p>

                </div>

              </div>


              <p
                className={`font-semibold ${
                  transaction.amount.startsWith("+")
                    ? "text-emerald-600"
                    : "text-slate-900"
                }`}
              >
                {transaction.amount}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}