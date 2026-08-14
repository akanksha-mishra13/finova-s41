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

import { useMemo, useState } from "react";

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

            <ScoreRing score={78} />

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
              Your current savings buffer, repayment behavior
              and debt level indicate that you could manage
              moderate borrowing. A few improvements could
              make your profile stronger.
            </p>


            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <div className="rounded-xl bg-white/5 p-4">

                <p className="text-xs text-white/40">
                  Payment behavior
                </p>

                <p className="mt-1 text-lg font-bold">
                  Strong
                </p>

              </div>

              <div className="rounded-xl bg-white/5 p-4">

                <p className="text-xs text-white/40">
                  Debt burden
                </p>

                <p className="mt-1 text-lg font-bold">
                  Low
                </p>

              </div>

              <div className="rounded-xl bg-white/5 p-4">

                <p className="text-xs text-white/40">
                  Safety buffer
                </p>

                <p className="mt-1 text-lg font-bold">
                  Moderate
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
            score={92}
            status="Excellent"
            description="Your repayment history shows consistent
            on-time behavior."
            positive
          />

          <FactorCard
            icon={CreditCard}
            title="Credit utilization"
            score={74}
            status="Healthy"
            description="Your current credit usage is within a
            relatively comfortable range."
          />

          <FactorCard
            icon={CircleDollarSign}
            title="Debt burden"
            score={86}
            status="Low"
            description="Your existing monthly debt obligations
            are relatively manageable."
            positive
          />

          <FactorCard
            icon={ShieldCheck}
            title="Savings buffer"
            score={61}
            status="Needs attention"
            description="Increasing your emergency savings would
            improve your financial resilience."
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
              Why is your readiness score 78?
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Finova combines multiple financial indicators
              instead of relying on one number. Your strongest
              factor is repayment behavior, while your savings
              buffer has the largest opportunity for improvement.
            </p>


            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-xs text-slate-400">
                  Payment history
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  +22
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-xs text-slate-400">
                  Utilization
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  +18
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-xs text-slate-400">
                  Debt burden
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  +20
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-xs text-slate-400">
                  Savings buffer
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  +18
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
                title="Build your emergency fund"
                description="Increase your safety buffer to at least
                three months of essential expenses."
                impact="+8 readiness"
              />

              <ImprovementItem
                number="2"
                title="Keep credit utilization lower"
                description="Try to maintain your revolving credit
                usage below your preferred threshold."
                impact="+5 readiness"
              />

              <ImprovementItem
                number="3"
                title="Maintain consistent repayments"
                description="Continue making all scheduled payments
                on time."
                impact="+4 readiness"
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


            <div className="mt-6 flex items-start gap-3 rounded-xl bg-emerald-400/10 p-3">

              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <p className="text-xs leading-5 text-emerald-300">
                This EMI is currently within your estimated
                monthly repayment capacity.
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
                You're close to being strongly loan-ready.
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Your estimated EMI is manageable based on your
                current financial profile. However, strengthening
                your emergency savings before taking new debt
                would reduce your financial risk.
              </p>


              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Readiness
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#123C35]">
                    78 / 100
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
                    Build savings
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