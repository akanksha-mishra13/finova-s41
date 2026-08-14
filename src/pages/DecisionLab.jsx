import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const scenarios = [
  {
    name: "Buy now",
    icon: Wallet,
    affordability: 72,
    goalDelay: "38 days",
    emergencyImpact: "-0.7 months",
    monthlyImpact: "₹45,000 one-time",
    verdict: "Possible, but not ideal",
    type: "warning",
  },
  {
    name: "Wait 2 months",
    icon: Clock3,
    affordability: 89,
    goalDelay: "0 days",
    emergencyImpact: "No impact",
    monthlyImpact: "₹22,500/month",
    verdict: "Recommended",
    type: "recommended",
  },
  {
    name: "Save first",
    icon: ShieldCheck,
    affordability: 96,
    goalDelay: "0 days",
    emergencyImpact: "Positive",
    monthlyImpact: "₹15,000/month",
    verdict: "Safest option",
    type: "safe",
  },
];

function ScoreRing({ score }) {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">

      <svg
        viewBox="0 0 140 140"
        className="-rotate-90 absolute h-full w-full"
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
          stroke="#123C35"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />

      </svg>

      <div className="relative text-center">

        <p className="text-3xl font-bold text-slate-900">
          {score}
        </p>

        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          / 100
        </p>

      </div>

    </div>
  );
}

function ImpactCard({
  icon: Icon,
  label,
  value,
  description,
  negative = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={19} />
        </div>

        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

      </div>

      <p
        className={`mt-4 text-xl font-bold ${
          negative ? "text-amber-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}

function ScenarioCard({ scenario, selected, onSelect }) {
  const Icon = scenario.icon;

  const isRecommended = scenario.type === "recommended";
  const isSafe = scenario.type === "safe";

  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-[#123C35] bg-[#F4FAF7] shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
    >

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              isRecommended || isSafe
                ? "bg-[#E8F7EF] text-[#123C35]"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            <Icon size={19} />
          </div>

          <div>

            <p className="text-sm font-bold text-slate-900">
              {scenario.name}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Affordability {scenario.affordability}/100
            </p>

          </div>

        </div>

        {selected && (
          <CheckCircle2
            size={19}
            className="text-[#123C35]"
          />
        )}

      </div>


      <div className="mt-5 grid grid-cols-2 gap-3">

        <div>

          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Goal impact
          </p>

          <p className="mt-1 text-xs font-bold text-slate-700">
            {scenario.goalDelay}
          </p>

        </div>

        <div>

          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Emergency fund
          </p>

          <p className="mt-1 text-xs font-bold text-slate-700">
            {scenario.emergencyImpact}
          </p>

        </div>

      </div>


      <div className="mt-4 border-t border-slate-100 pt-4">

        <span
          className={`text-xs font-bold ${
            isRecommended || isSafe
              ? "text-emerald-600"
              : "text-amber-600"
          }`}
        >
          {scenario.verdict}
        </span>

      </div>

    </button>
  );
}

export default function DecisionLab() {
  const [amount, setAmount] = useState("45000");
  const [category, setCategory] = useState("Electronics");
  const [paymentMethod, setPaymentMethod] = useState("Savings");
  const [selectedScenario, setSelectedScenario] = useState(1);

  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-sm font-medium text-slate-500">
          Think before you spend
        </p>

        <div className="mt-1 flex flex-col gap-3">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">
              <Calculator size={21} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Decision Lab
            </h1>

          </div>

          <p className="max-w-2xl text-sm leading-6 text-slate-500">
            Simulate a financial decision before making it and
            understand how it could affect your savings, goals
            and financial health.
          </p>

        </div>

      </div>


      {/* DECISION INPUT */}

      <section className="rounded-3xl bg-[#10192D] p-6 text-white shadow-sm lg:p-8">

        <div className="flex items-center gap-2">

          <Sparkles
            size={18}
            className="text-[#B9E8D0]"
          />

          <span className="text-xs font-bold uppercase tracking-wider text-[#B9E8D0]">
            New Simulation
          </span>

        </div>

        <h2 className="mt-3 text-2xl font-bold">
          What are you thinking about?
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Enter the details and Finova will simulate the impact.
        </p>


        <div className="mt-7 grid gap-5 md:grid-cols-3">

          {/* AMOUNT */}

          <div>

            <label className="text-xs font-semibold text-slate-400">
              Purchase amount
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

              <span className="text-slate-400">
                ₹
              </span>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent px-2 py-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                placeholder="45,000"
              />

            </div>

          </div>


          {/* CATEGORY */}

          <div>

            <label className="text-xs font-semibold text-slate-400">
              Category
            </label>

            <div className="relative mt-2">

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none"
              >
                <option className="text-slate-900">
                  Electronics
                </option>

                <option className="text-slate-900">
                  Education
                </option>

                <option className="text-slate-900">
                  Travel
                </option>

                <option className="text-slate-900">
                  Shopping
                </option>

                <option className="text-slate-900">
                  Other
                </option>

              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

          </div>


          {/* PAYMENT */}

          <div>

            <label className="text-xs font-semibold text-slate-400">
              Payment method
            </label>

            <div className="relative mt-2">

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none"
              >
                <option className="text-slate-900">
                  Savings
                </option>

                <option className="text-slate-900">
                  Credit Card
                </option>

                <option className="text-slate-900">
                  EMI
                </option>

                <option className="text-slate-900">
                  Debit Card
                </option>

              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

          </div>

        </div>


        <button className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]">

          Run Simulation

          <ArrowRight size={17} />

        </button>

      </section>


      {/* RESULT HEADER */}

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <AlertTriangle size={22} />
          </div>

          <div className="flex-1">

            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Finova Verdict
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              You can afford this, but buying it now isn't ideal.
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              A ₹{Number(amount || 0).toLocaleString("en-IN")} purchase
              would reduce your financial buffer and delay your
              emergency-fund goal by approximately 38 days.
            </p>

          </div>

          <div className="shrink-0 rounded-xl bg-white px-5 py-3 text-center shadow-sm">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Decision score
            </p>

            <p className="mt-1 text-2xl font-bold text-amber-600">
              72
              <span className="text-sm text-slate-400">
                /100
              </span>
            </p>

          </div>

        </div>

      </section>


      {/* FINANCIAL IMPACT */}

      <section className="mt-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            Financial Impact
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Here's what this decision could change.
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <ImpactCard
            icon={Wallet}
            label="Cash impact"
            value={`₹${Number(amount || 0).toLocaleString("en-IN")}`}
            description="One-time reduction in available savings."
          />

          <ImpactCard
            icon={ShieldCheck}
            label="Emergency fund"
            value="-0.7 months"
            description="Your safety buffer would become smaller."
            negative
          />

          <ImpactCard
            icon={Target}
            label="Goal delay"
            value="38 days"
            description="Your emergency-fund target would be delayed."
            negative
          />

          <ImpactCard
            icon={TrendingDown}
            label="Health score"
            value="-6 points"
            description="Estimated short-term impact on your score."
            negative
          />

        </div>

      </section>


      {/* WHAT IF */}

      <section className="mt-8">

        <div className="mb-5">

          <div className="flex items-center gap-2">

            <Lightbulb
              size={20}
              className="text-[#123C35]"
            />

            <h2 className="text-xl font-bold text-slate-900">
              What if you choose differently?
            </h2>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Compare different paths before making your decision.
          </p>

        </div>


        <div className="grid gap-4 lg:grid-cols-3">

          {scenarios.map((scenario, index) => (

            <ScenarioCard
              key={scenario.name}
              scenario={scenario}
              selected={selectedScenario === index}
              onSelect={() => setSelectedScenario(index)}
            />

          ))}

        </div>

      </section>


      {/* SELECTED SCENARIO */}

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
                Wait 2 months before making this purchase.
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Waiting gives your savings more time to grow while
                keeping your emergency fund intact. You can then
                make the purchase without delaying your primary
                financial goal.
              </p>


              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Current option
                  </p>

                  <p className="mt-1 text-sm font-bold text-amber-600">
                    72 / 100
                  </p>

                </div>

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Recommended
                  </p>

                  <p className="mt-1 text-sm font-bold text-emerald-600">
                    89 / 100
                  </p>

                </div>

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Goal delay avoided
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    38 days
                  </p>

                </div>

              </div>


              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <button className="flex items-center justify-center gap-2 rounded-xl bg-[#123C35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D302B]">

                  Use Recommended Plan

                  <ArrowRight size={16} />

                </button>

                <button className="rounded-xl border border-[#BBDDCF] bg-white px-4 py-2.5 text-sm font-semibold text-[#123C35]">

                  View Full Analysis

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* DECISION EXPLANATION */}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Lightbulb size={19} />
          </div>

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Why Finova recommends waiting
            </h2>

            <div className="mt-4 space-y-3">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-sm leading-6 text-slate-500">
                  Your current monthly cash flow can support the
                  purchase.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-sm leading-6 text-slate-500">
                  Waiting allows your emergency fund to remain
                  above the recommended safety threshold.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <XCircle
                  size={17}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <p className="text-sm leading-6 text-slate-500">
                  Buying now would temporarily reduce your
                  financial resilience and delay your goal.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <section className="mt-8 rounded-2xl bg-[#123C35] p-6 text-white">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-2 text-[#B9E8D0]">

              <Sparkles size={17} />

              <span className="text-sm font-semibold">
                Smarter financial decisions
              </span>

            </div>

            <h2 className="mt-2 text-xl font-bold">
              Have another decision in mind?
            </h2>

            <p className="mt-1 text-sm text-white/60">
              Test purchases, loans, subscriptions, trips and
              other financial decisions before committing.
            </p>

          </div>

          <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]">

            New Simulation

            <ArrowRight size={17} />

          </button>

        </div>

      </section>

    </div>
  );
}