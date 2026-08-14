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

const healthFactors = [
  {
    title: "Savings Health",
    description: "You're saving a healthy portion of your income.",
    score: 91,
    icon: PiggyBank,
    status: "Excellent",
    color: "emerald",
  },
  {
    title: "Spending Health",
    description: "Your spending is currently within your limits.",
    score: 84,
    icon: Wallet,
    status: "Healthy",
    color: "emerald",
  },
  {
    title: "Emergency Fund",
    description: "Your emergency fund needs a little more attention.",
    score: 68,
    icon: ShieldCheck,
    status: "Needs attention",
    color: "amber",
  },
  {
    title: "Debt Health",
    description: "Your debt-to-income ratio is comfortably low.",
    score: 88,
    icon: TrendingDown,
    status: "Healthy",
    color: "emerald",
  },
  {
    title: "Goal Progress",
    description: "You're making consistent progress toward your goals.",
    score: 79,
    icon: Target,
    status: "Healthy",
    color: "emerald",
  },
];

const recommendations = [
  {
    title: "Build your emergency fund",
    description:
      "Add ₹2,500 more this month to move closer to your 3-month safety target.",
    impact: "+5 points",
    icon: ShieldCheck,
    priority: "High priority",
  },
  {
    title: "Reduce food spending",
    description:
      "Your food spending is 23% higher than your recent monthly average.",
    impact: "+3 points",
    icon: TrendingDown,
    priority: "Recommended",
  },
  {
    title: "Increase goal contribution",
    description:
      "An additional ₹1,500 monthly contribution can help you reach your goal sooner.",
    impact: "+2 points",
    icon: Target,
    priority: "Recommended",
  },
];

const improvementPlan = [
  {
    day: "Week 1",
    title: "Review your spending",
    description:
      "Identify the top 3 categories where you can reduce unnecessary spending.",
    completed: true,
  },
  {
    day: "Week 2",
    title: "Strengthen your emergency fund",
    description:
      "Move ₹2,500 into your emergency savings.",
    completed: false,
  },
  {
    day: "Week 3",
    title: "Optimize one recurring expense",
    description:
      "Review subscriptions and recurring payments.",
    completed: false,
  },
  {
    day: "Week 4",
    title: "Review your progress",
    description:
      "Check your new financial health score and update your plan.",
    completed: false,
  },
];

function ScoreRing() {
  const score = 82;
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

        <p className="text-5xl font-bold tracking-tight text-slate-900">
          {score}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-400">
          out of 100
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#E8F7EF] px-3 py-1 text-xs font-semibold text-emerald-700">
          <TrendingUp size={13} />
          +6 this month
        </div>

      </div>

    </div>
  );
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
            <ScoreRing />
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
              You're doing well.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Your spending is under control and your savings rate
              is strong. The biggest opportunity right now is
              strengthening your emergency fund.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">
                  Savings rate
                </p>

                <p className="mt-1 text-lg font-bold">
                  61%
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">
                  Emergency fund
                </p>

                <p className="mt-1 text-lg font-bold">
                  2.1 months
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-slate-400">
                  Debt ratio
                </p>

                <p className="mt-1 text-lg font-bold">
                  12%
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
                Why is your score 82?
              </h2>

            </div>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              Finova calculates your score using your savings,
              spending behavior, emergency fund, debt burden and
              progress toward your financial goals.
            </p>

          </div>

          <button className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[#123C35]">
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
                  AI INSIGHT
                </span>

              </div>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Your biggest opportunity is your emergency fund.
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                You're currently covered for about 2.1 months of
                essential expenses. Increasing this to 3 months
                would improve your financial resilience and could
                increase your health score by approximately 5 points.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <button className="rounded-xl bg-[#123C35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D302B]">
                  Build emergency fund
                </button>

                <button className="rounded-xl border border-[#BBDDCF] bg-white px-4 py-2.5 text-sm font-semibold text-[#123C35]">
                  See calculation
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* RECOMMENDATIONS */}

      <section className="mt-8">

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
              Four simple steps to strengthen your financial position.
            </p>

          </div>

          <span className="rounded-full bg-[#E8F7EF] px-3 py-1.5 text-xs font-semibold text-emerald-700">
            1 of 4 completed
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

          <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]">

            Open AI Copilot

            <ArrowRight size={17} />

          </button>

        </div>

      </section>

    </div>
  );
}