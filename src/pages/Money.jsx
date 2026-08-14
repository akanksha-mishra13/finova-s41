import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  Wallet,
} from "lucide-react";

const transactions = [
  {
    name: "Salary",
    category: "Income",
    amount: "+₹35,000",
    type: "income",
  },
  {
    name: "Rent",
    category: "Housing",
    amount: "-₹8,000",
    type: "expense",
  },
  {
    name: "Swiggy",
    category: "Food",
    amount: "-₹540",
    type: "expense",
  },
  {
    name: "Amazon",
    category: "Shopping",
    amount: "-₹1,299",
    type: "expense",
  },
];

function Money() {
  return (
    <div className="space-y-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5B8C78]">
            MONEY
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
            Where your money goes
          </h1>

          <p className="mt-2 text-sm text-[#66736F]">
            Track income, spending and cash flow.
          </p>

        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#123C35] px-5 py-3 text-sm font-semibold text-white">

          <Plus size={17} />

          Add transaction

        </button>

      </div>


      {/* SUMMARY */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-5">

          <Wallet className="text-[#123C35]" size={20} />

          <p className="mt-4 text-sm text-[#66736F]">
            Available balance
          </p>

          <p className="mt-1 text-3xl font-bold text-[#123C35]">
            ₹48,600
          </p>

        </div>


        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-5">

          <ArrowUpRight className="text-[#287A55]" size={20} />

          <p className="mt-4 text-sm text-[#66736F]">
            Income
          </p>

          <p className="mt-1 text-3xl font-bold text-[#123C35]">
            ₹35,000
          </p>

        </div>


        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-5">

          <ArrowDownRight className="text-[#B16A14]" size={20} />

          <p className="mt-4 text-sm text-[#66736F]">
            Spending
          </p>

          <p className="mt-1 text-3xl font-bold text-[#123C35]">
            ₹21,400
          </p>

        </div>

      </div>


      {/* TRANSACTIONS */}

      <div className="rounded-2xl border border-[#E5EAE7] bg-white">

        <div className="border-b border-[#E5EAE7] p-6">

          <h2 className="text-xl font-semibold text-[#123C35]">
            Recent transactions
          </h2>

        </div>

        <div>

          {transactions.map((transaction) => (

            <div
              key={transaction.name}
              className="flex items-center justify-between border-b border-[#E5EAE7] px-6 py-4 last:border-0"
            >

              <div>

                <p className="text-sm font-semibold text-[#17211F]">
                  {transaction.name}
                </p>

                <p className="mt-1 text-xs text-[#66736F]">
                  {transaction.category}
                </p>

              </div>

              <p
                className={`text-sm font-semibold ${
                  transaction.type === "income"
                    ? "text-[#287A55]"
                    : "text-[#17211F]"
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

export default Money;