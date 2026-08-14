import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  Wallet,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";

const options = [
  {
    id: "save",
    title: "Save First",
    subtitle: "Build the amount before spending.",
    icon: PiggyBank,
    risk: "Low",
    riskScore: 92,
    monthly: "₹8,500",
    totalCost: "₹50,000",
    goalImpact: "Minimal",
    timeline: "6 months",
    recommended: true,
    description:
      "Build the required amount gradually without creating new debt.",
  },
  {
    id: "lower-emi",
    title: "Lower-Cost Credit",
    subtitle: "Reduce the borrowing burden.",
    icon: CreditCard,
    risk: "Moderate",
    riskScore: 76,
    monthly: "₹2,100",
    totalCost: "₹55,200",
    goalImpact: "Low",
    timeline: "24 months",
    recommended: false,
    description:
      "Use a lower-cost financing option to keep monthly payments manageable.",
  },
  {
    id: "reduce",
    title: "Reduce Purchase",
    subtitle: "Choose a lower-cost version.",
    icon: TrendingDown,
    risk: "Low",
    riskScore: 88,
    monthly: "₹0",
    totalCost: "₹35,000",
    goalImpact: "Minimal",
    timeline: "Immediate",
    recommended: false,
    description:
      "Reduce the purchase amount while still solving the original need.",
  },
  {
    id: "borrow",
    title: "Borrow Now",
    subtitle: "Take the full amount immediately.",
    icon: Wallet,
    risk: "Higher",
    riskScore: 61,
    monthly: "₹2,450",
    totalCost: "₹58,800",
    goalImpact: "High",
    timeline: "Immediate",
    recommended: false,
    description:
      "Get the full amount immediately but accept a higher financial burden.",
  },
];

function OptionCard({
  option,
  selected,
  onSelect,
}) {
  const Icon = option.icon;

  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-[#123C35] bg-[#F4FAF7] shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-3">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              option.recommended
                ? "bg-[#D8F1E4] text-[#123C35]"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <Icon size={20} />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-sm font-bold text-slate-900">
                {option.title}
              </h3>

              {option.recommended && (
                <span className="rounded-full bg-[#D8F1E4] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#123C35]">
                  Recommended
                </span>
              )}

            </div>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              {option.subtitle}
            </p>

          </div>

        </div>

        {selected && (
          <CheckCircle2
            size={19}
            className="shrink-0 text-[#123C35]"
          />
        )}

      </div>


      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-slate-50 p-3">

          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Monthly
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900">
            {option.monthly}
          </p>

        </div>

        <div className="rounded-xl bg-slate-50 p-3">

          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Total cost
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900">
            {option.totalCost}
          </p>

        </div>

      </div>


      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

        <div>

          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Risk
          </p>

          <p
            className={`mt-1 text-xs font-bold ${
              option.risk === "Low"
                ? "text-emerald-600"
                : option.risk === "Moderate"
                ? "text-amber-600"
                : "text-red-500"
            }`}
          >
            {option.risk}
          </p>

        </div>

        <div className="text-right">

          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Goal impact
          </p>

          <p className="mt-1 text-xs font-bold text-slate-700">
            {option.goalImpact}
          </p>

        </div>

      </div>

    </button>
  );
}

function ComparisonRow({
  label,
  save,
  credit,
  reduce,
  borrow,
}) {
  return (
    <div className="grid grid-cols-[1.2fr_repeat(4,1fr)] border-b border-slate-100 last:border-0">

      <div className="p-4 text-xs font-semibold text-slate-600">
        {label}
      </div>

      <div className="p-4 text-center text-xs font-bold text-slate-700">
        {save}
      </div>

      <div className="p-4 text-center text-xs font-bold text-slate-700">
        {credit}
      </div>

      <div className="p-4 text-center text-xs font-bold text-slate-700">
        {reduce}
      </div>

      <div className="p-4 text-center text-xs font-bold text-slate-700">
        {borrow}
      </div>

    </div>
  );
}

function ImpactMetric({
  icon: Icon,
  label,
  value,
  positive = false,
  warning = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Icon size={19} />
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-xl font-bold ${
          positive
            ? "text-emerald-600"
            : warning
            ? "text-amber-600"
            : "text-slate-900"
        }`}
      >
        {value}
      </p>

    </div>
  );
}

export default function Alternatives() {

  const [amount, setAmount] = useState("50000");

  const [purpose, setPurpose] =
    useState("Education");

  const [selectedOption, setSelectedOption] =
    useState("save");

  const selected = useMemo(
    () =>
      options.find(
        (option) =>
          option.id === selectedOption
      ),
    [selectedOption]
  );

  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-sm font-medium text-slate-500">
          Find a better path
        </p>

        <div className="mt-1 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">

            <Sparkles size={21} />

          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Alternatives
          </h1>

        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Finova doesn't just tell you what to avoid. It helps
          you discover safer and more affordable ways to reach
          the same goal.
        </p>

      </div>


      {/* INPUT */}

      <section className="rounded-3xl bg-[#10192D] p-6 text-white shadow-sm lg:p-8">

        <div className="flex items-center gap-2">

          <Lightbulb
            size={18}
            className="text-[#B9E8D0]"
          />

          <span className="text-xs font-bold uppercase tracking-wider text-[#B9E8D0]">
            Financial Need
          </span>

        </div>

        <h2 className="mt-3 text-2xl font-bold">
          What are you trying to achieve?
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Tell Finova the amount and purpose. We'll compare
          different ways to achieve it.
        </p>


        <div className="mt-7 grid gap-5 md:grid-cols-2">

          <div>

            <label className="text-xs font-semibold text-slate-400">
              Amount needed
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-white/5 px-4">

              <span className="text-slate-400">
                ₹
              </span>

              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                className="w-full bg-transparent px-2 py-3 text-sm font-semibold text-white outline-none"
              />

            </div>

          </div>


          <div>

            <label className="text-xs font-semibold text-slate-400">
              Purpose
            </label>

            <div className="relative mt-2">

              <select
                value={purpose}
                onChange={(e) =>
                  setPurpose(e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none"
              >

                <option
                  className="text-slate-900"
                  value="Education"
                >
                  Education
                </option>

                <option
                  className="text-slate-900"
                  value="Emergency"
                >
                  Emergency
                </option>

                <option
                  className="text-slate-900"
                  value="Travel"
                >
                  Travel
                </option>

                <option
                  className="text-slate-900"
                  value="Electronics"
                >
                  Electronics
                </option>

                <option
                  className="text-slate-900"
                  value="Medical"
                >
                  Medical
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

          Find Better Alternatives

          <ArrowRight size={17} />

        </button>

      </section>


      {/* CURRENT OPTION */}

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">

            <AlertTriangle size={22} />

          </div>

          <div className="flex-1">

            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Your current path
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Borrow ₹{Number(amount || 0).toLocaleString("en-IN")} now
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Based on your current financial profile, borrowing
              the full amount immediately would create a higher
              monthly burden and could delay some of your goals.
            </p>

          </div>

          <div className="shrink-0 rounded-xl bg-white px-5 py-3 text-center shadow-sm">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Risk level
            </p>

            <p className="mt-1 text-xl font-bold text-amber-600">
              Higher
            </p>

          </div>

        </div>

      </section>


      {/* OPTIONS */}

      <section className="mt-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            Better Alternatives
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare different paths to reach the same financial
            objective.
          </p>

        </div>


        <div className="grid gap-4 lg:grid-cols-2">

          {options.map((option) => (

            <OptionCard
              key={option.id}
              option={option}
              selected={
                selectedOption === option.id
              }
              onSelect={() =>
                setSelectedOption(option.id)
              }
            />

          ))}

        </div>

      </section>


      {/* RECOMMENDED ALTERNATIVE */}

      <section className="mt-8 overflow-hidden rounded-3xl bg-[#123C35] p-6 text-white lg:p-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">

          <div>

            <div className="flex items-center gap-2 text-[#B9E8D0]">

              <Sparkles size={18} />

              <span className="text-xs font-bold uppercase tracking-wider">
                Finova's Preferred Path
              </span>

            </div>

            <h2 className="mt-4 text-2xl font-bold">
              {selected?.title}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
              {selected?.description}
            </p>


            <div className="mt-6 flex flex-wrap gap-3">

              <div className="rounded-xl bg-white/10 px-4 py-3">

                <p className="text-[10px] uppercase tracking-wider text-white/40">
                  Risk
                </p>

                <p className="mt-1 text-sm font-bold text-[#B9E8D0]">
                  {selected?.risk}
                </p>

              </div>

              <div className="rounded-xl bg-white/10 px-4 py-3">

                <p className="text-[10px] uppercase tracking-wider text-white/40">
                  Timeline
                </p>

                <p className="mt-1 text-sm font-bold">
                  {selected?.timeline}
                </p>

              </div>

              <div className="rounded-xl bg-white/10 px-4 py-3">

                <p className="text-[10px] uppercase tracking-wider text-white/40">
                  Goal impact
                </p>

                <p className="mt-1 text-sm font-bold">
                  {selected?.goalImpact}
                </p>

              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Finova score
            </p>

            <p className="mt-2 text-5xl font-bold text-[#B9E8D0]">
              {selected?.riskScore}
            </p>

            <p className="mt-1 text-xs text-white/40">
              out of 100
            </p>


            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-[#B9E8D0]"
                style={{
                  width: `${selected?.riskScore}%`,
                }}
              />

            </div>


            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-4 py-3 text-sm font-bold text-[#123C35]">

              Choose This Path

              <ArrowRight size={16} />

            </button>

          </div>

        </div>

      </section>


      {/* COMPARISON TABLE */}

      <section className="mt-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            Side-by-Side Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            See the long-term trade-offs of each option.
          </p>

        </div>


        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="min-w-[760px]">

            <div className="grid grid-cols-[1.2fr_repeat(4,1fr)] border-b border-slate-200 bg-slate-50">

              <div className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Factor
              </div>

              <div className="p-4 text-center text-xs font-bold text-[#123C35]">
                Save First
              </div>

              <div className="p-4 text-center text-xs font-bold text-slate-600">
                Lower Credit
              </div>

              <div className="p-4 text-center text-xs font-bold text-slate-600">
                Reduce
              </div>

              <div className="p-4 text-center text-xs font-bold text-slate-600">
                Borrow Now
              </div>

            </div>


            <ComparisonRow
              label="Monthly burden"
              save="₹8,500"
              credit="₹2,100"
              reduce="₹0"
              borrow="₹2,450"
            />

            <ComparisonRow
              label="Total cost"
              save="₹50,000"
              credit="₹55,200"
              reduce="₹35,000"
              borrow="₹58,800"
            />

            <ComparisonRow
              label="Risk"
              save="Low"
              credit="Moderate"
              reduce="Low"
              borrow="Higher"
            />

            <ComparisonRow
              label="Goal impact"
              save="Minimal"
              credit="Low"
              reduce="Minimal"
              borrow="High"
            />

            <ComparisonRow
              label="Debt created"
              save="No"
              credit="Yes"
              reduce="No"
              borrow="Yes"
            />

          </div>

        </div>

      </section>


      {/* IMPACT */}

      <section className="mt-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            Financial Impact
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            How the recommended path affects your financial
            position.
          </p>

        </div>


        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <ImpactMetric
            icon={ShieldCheck}
            label="Financial risk"
            value="Low"
            positive
          />

          <ImpactMetric
            icon={Target}
            label="Goal impact"
            value="Minimal"
            positive
          />

          <ImpactMetric
            icon={Clock3}
            label="Time to target"
            value="6 months"
          />

          <ImpactMetric
            icon={CreditCard}
            label="New debt"
            value="₹0"
            positive
          />

        </div>

      </section>


      {/* WHY THIS RECOMMENDATION */}

      <section className="mt-8 rounded-2xl border border-[#CFE9DD] bg-[#F0FAF5] p-6">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D8F1E4] text-[#123C35]">

            <Lightbulb size={20} />

          </div>

          <div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#123C35]">
              Why this alternative?
            </span>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Finova prioritizes financial resilience.
            </h2>

            <div className="mt-5 space-y-3">

              <div className="flex items-start gap-3">

                <Check
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  No new debt is created.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <Check
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Your emergency fund remains protected.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <Check
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Your existing financial goals remain on track.
                </p>

              </div>

              <div className="flex items-start gap-3">

                <Check
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  The same financial need can still be achieved.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER CTA */}

      <section className="mt-8 rounded-2xl bg-[#10192D] p-6 text-white">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-2 text-[#B9E8D0]">

              <Sparkles size={17} />

              <span className="text-sm font-semibold">
                Financial choice engine
              </span>

            </div>

            <h2 className="mt-2 text-xl font-bold">
              There's usually more than one way forward.
            </h2>

            <p className="mt-1 max-w-xl text-sm text-white/60">
              Finova compares cost, risk, debt and goal impact
              so you can choose the option that fits your future.
            </p>

          </div>

          <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35]">

            Compare Another Need

            <ArrowRight size={17} />

          </button>

        </div>

      </section>

    </div>
  );
}