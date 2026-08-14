import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CreditCard,
  Filter,
  Plus,
  Search,
  ShoppingBag,
  Utensils,
  X,
  Car,
  Wallet,
  Banknote,
} from "lucide-react";

const initialTransactions = [
  {
    id: 1,
    name: "Swiggy",
    category: "Food",
    type: "Expense",
    amount: 420,
    date: "2026-08-14",
    payment: "UPI",
    icon: Utensils,
  },
  {
    id: 2,
    name: "Amazon",
    category: "Shopping",
    type: "Expense",
    amount: 1299,
    date: "2026-08-13",
    payment: "Credit Card",
    icon: ShoppingBag,
  },
  {
    id: 3,
    name: "Salary",
    category: "Salary",
    type: "Income",
    amount: 48000,
    date: "2026-08-10",
    payment: "Bank Transfer",
    icon: Banknote,
  },
  {
    id: 4,
    name: "Uber",
    category: "Transport",
    type: "Expense",
    amount: 280,
    date: "2026-08-09",
    payment: "UPI",
    icon: Car,
  },
  {
    id: 5,
    name: "Netflix",
    category: "Entertainment",
    type: "Expense",
    amount: 649,
    date: "2026-08-07",
    payment: "Debit Card",
    icon: CreditCard,
  },
  {
    id: 6,
    name: "Freelance Project",
    category: "Freelance",
    type: "Income",
    amount: 8500,
    date: "2026-08-05",
    payment: "Bank Transfer",
    icon: Wallet,
  },
  {
    id: 7,
    name: "Zomato",
    category: "Food",
    type: "Expense",
    amount: 560,
    date: "2026-08-03",
    payment: "UPI",
    icon: Utensils,
  },
];

const categories = [
  "All Categories",
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Salary",
  "Freelance",
];

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SummaryCard({ title, value, icon: Icon, type }) {
  const iconClasses = {
    income: "bg-emerald-50 text-emerald-600",
    expense: "bg-red-50 text-red-600",
    balance: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClasses[type]}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function AddTransactionModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "Food",
    type: "Expense",
    payment: "UPI",
    date: new Date().toISOString().split("T")[0],
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.amount) {
      return;
    }

    onAdd({
      ...form,
      amount: Number(form.amount),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add Transaction
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your income or expense.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Transaction name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Swiggy, Salary..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Amount
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ₹
                </span>

                <input
                  name="amount"
                  type="number"
                  min="0"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Type
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>Expense</option>
                <option>Income</option>
              </select>
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                {categories
                  .filter((category) => category !== "All Categories")
                  .map((category) => (
                    <option key={category}>{category}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Payment method
              </label>

              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>UPI</option>
                <option>Debit Card</option>
                <option>Credit Card</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
              </select>
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Date
            </label>

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Add Transaction
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default function Transactions() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All Categories");

  const [type, setType] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {

      const matchesSearch =
        transaction.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        transaction.category === category;

      const matchesType =
        type === "All" ||
        transaction.type === type;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType
      );
    });
  }, [transactions, search, category, type]);

  const income = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expenses;

  function addTransaction(transaction) {
    setTransactions((previous) => [
      {
        ...transaction,
        id: Date.now(),
        icon:
          transaction.type === "Income"
            ? Banknote
            : CreditCard,
      },
      ...previous,
    ]);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Financial activity
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Transactions
          </h1>

          <p className="mt-2 text-slate-500">
            Track and manage all your income and expenses.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={18} />
          Add Transaction
        </button>

      </div>


      {/* SUMMARY */}

      <div className="grid gap-5 md:grid-cols-3">

        <SummaryCard
          title="Total Income"
          value={formatCurrency(income)}
          icon={ArrowDownLeft}
          type="income"
        />

        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(expenses)}
          icon={ArrowUpRight}
          type="expense"
        />

        <SummaryCard
          title="Net Balance"
          value={formatCurrency(balance)}
          icon={Wallet}
          type="balance"
        />

      </div>


      {/* FILTER SECTION */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-100"
            />

          </div>


          {/* CATEGORY */}

          <div className="relative">

            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-10 text-sm outline-none lg:w-52"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>


          {/* TYPE */}

          <div className="relative">

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm outline-none lg:w-40"
            >
              <option>All</option>
              <option>Income</option>
              <option>Expense</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>


          {/* DATE */}

          <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
            <CalendarDays size={17} />
            This Month
          </button>

        </div>

      </div>


      {/* TRANSACTION TABLE */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Transactions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredTransactions.length} transactions found
              </p>
            </div>

          </div>

        </div>


        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                <th className="px-6 py-4">
                  Transaction
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Payment
                </th>

                <th className="px-6 py-4 text-right">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredTransactions.map((transaction) => {

                const Icon = transaction.icon;

                return (
                  <tr
                    key={transaction.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                          <Icon
                            size={18}
                            className="text-slate-600"
                          />
                        </div>

                        <span className="font-semibold text-slate-900">
                          {transaction.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {transaction.category}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(transaction.date)}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {transaction.payment}
                    </td>

                    <td className="px-6 py-4 text-right">

                      <span
                        className={`font-semibold ${
                          transaction.type === "Income"
                            ? "text-emerald-600"
                            : "text-slate-900"
                        }`}
                      >
                        {transaction.type === "Income"
                          ? "+"
                          : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>


        {/* MOBILE LIST */}

        <div className="divide-y divide-slate-100 md:hidden">

          {filteredTransactions.map((transaction) => {

            const Icon = transaction.icon;

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-4 p-5"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Icon size={18} className="text-slate-600" />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-semibold text-slate-900">
                      {transaction.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {transaction.category} ·{" "}
                      {formatDate(transaction.date)}
                    </p>

                  </div>

                </div>

                <p
                  className={`shrink-0 text-sm font-semibold ${
                    transaction.type === "Income"
                      ? "text-emerald-600"
                      : "text-slate-900"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>

              </div>
            );
          })}

        </div>


        {/* EMPTY STATE */}

        {filteredTransactions.length === 0 && (

          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Search size={22} className="text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No transactions found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>


      {/* MODAL */}

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdd={addTransaction}
        />
      )}

    </div>
  );
}