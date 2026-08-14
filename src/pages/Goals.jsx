import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CirclePlus,
  Clock3,
  Lightbulb,
  PiggyBank,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";

const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    description: "Build a safety cushion for unexpected expenses.",
    current: 29500,
    target: 50000,
    monthlyContribution: 3500,
    predictedDate: "Nov 18, 2026",
    targetDate: "Dec 31, 2026",
    progress: 59,
    icon: PiggyBank,
    priority: "High priority",
  },
  {
    id: 2,
    name: "New Laptop",
    description: "Save for a new laptop for your studies and projects.",
    current: 32000,
    target: 65000,
    monthlyContribution: 5500,
    predictedDate: "Feb 10, 2027",
    targetDate: "Mar 31, 2027",
    progress: 49,
    icon: Wallet,
    priority: "Medium priority",
  },
  {
    id: 3,
    name: "Personal Travel",
    description: "Create a dedicated fund for your next trip.",
    current: 12000,
    target: 30000,
    monthlyContribution: 3000,
    predictedDate: "Jan 05, 2027",
    targetDate: "Feb 28, 2027",
    progress: 40,
    icon: Target,
    priority: "Low priority",
  },
];

const timeline = [
  {
    month: "Aug",
    amount: "₹29,500",
    completed: true,
  },
  {
    month: "Sep",
    amount: "₹33,000",
    completed: true,
  },
  {
    month: "Oct",
    amount: "₹36,500",
    completed: false,
  },
  {
    month: "Nov",
    amount: "₹40,000",
    completed: false,
  },
  {
    month: "Dec",
    amount: "₹43,500",
    completed: false,
  },
  {
    month: "Jan",
    amount: "₹47,000",
    completed: false,
  },
  {
    month: "Feb",
    amount: "₹50,500",
    completed: false,
  },
];

function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function GoalProgressBar({ progress }) {
  return (
    <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-[#123C35] transition-all duration-700"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

function GoalCard({ goal, featured = false }) {
  const Icon = goal.icon;

  return (
    <div
      className={`rounded-2xl border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md ${
        featured
          ? "border-[#B9E8D0] shadow-sm"
          : "border-slate-200"
      }`}
    >

      {/* CARD HEADER */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">
            <Icon size={20} strokeWidth={1.8} />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-900">
              {goal.name}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {goal.priority}
            </p>

          </div>

        </div>

        <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
          <ChevronRight size={18} />
        </button>

      </div>


      {/* DESCRIPTION */}

      <p className="mt-5 text-sm leading-6 text-slate-500">
        {goal.description}
      </p>


      {/* AMOUNT */}

      <div className="mt-6 flex items-end justify-between">

        <div>

          <p className="text-xs font-medium text-slate-400">
            Saved
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {formatCurrency(goal.current)}
          </p>

        </div>

        <div className="text-right">

          <p className="text-xs font-medium text-slate-400">
            Target
          </p>

          <p className="mt-1 text-sm font-bold text-slate-700">
            {formatCurrency(goal.target)}
          </p>

        </div>

      </div>


      {/* PROGRESS */}

      <GoalProgressBar progress={goal.progress} />

      <div className="mt-2 flex items-center justify-between">

        <span className="text-xs font-semibold text-[#123C35]">
          {goal.progress}% complete
        </span>

        <span className="text-xs text-slate-400">
          {formatCurrency(goal.target - goal.current)} remaining
        </span>

      </div>


      {/* PREDICTION */}

      <div className="mt-5 rounded-xl bg-[#F7F9F8] p-4">

        <div className="flex items-start gap-3">

          <Clock3
            size={17}
            className="mt-0.5 shrink-0 text-[#123C35]"
          />

          <div>

            <p className="text-xs font-semibold text-slate-500">
              Finova prediction
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              You'll reach this by {goal.predictedDate}.
            </p>

            <p className="mt-1 text-xs text-emerald-600">
              Ahead of your target date
            </p>

          </div>

        </div>

      </div>


      {/* MONTHLY CONTRIBUTION */}

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

        <span className="text-xs text-slate-400">
          Monthly contribution
        </span>

        <span className="text-sm font-bold text-slate-700">
          {formatCurrency(goal.monthlyContribution)}
        </span>

      </div>

    </div>
  );
}

function Timeline() {
  return (
    <div className="mt-6">

      <div className="relative">

        <div className="absolute left-0 right-0 top-5 hidden h-px bg-slate-200 md:block" />

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-7">

          {timeline.map((item) => (

            <div
              key={item.month}
              className="relative flex flex-col items-center"
            >

              <div
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white ${
                  item.completed
                    ? "bg-[#123C35] text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >

                {item.completed ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-current" />
                )}

              </div>

              <p className="mt-3 text-xs font-semibold text-slate-700">
                {item.month}
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                {item.amount}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default function Goals() {
  const featuredGoal = goals[0];

  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-sm font-medium text-slate-500">
          Plan your future
        </p>

        <div className="mt-1 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Goals
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Turn your financial intentions into measurable,
              achievable plans.
            </p>

          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-[#10192D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#17223A]">

            <CirclePlus size={18} />

            Add New Goal

          </button>

        </div>

      </div>


      {/* OVERVIEW */}

      <section className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">
              <Target size={19} />
            </div>

            <TrendingUp
              size={18}
              className="text-emerald-500"
            />

          </div>

          <p className="mt-5 text-xs font-medium text-slate-400">
            Overall goal progress
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            51%
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            +8.4% from last month
          </p>

        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <PiggyBank size={19} />
          </div>

          <p className="mt-5 text-xs font-medium text-slate-400">
            Active goals
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            3
          </p>

          <p className="mt-1 text-xs text-slate-400">
            1 goal ahead of schedule
          </p>

        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Wallet size={19} />
          </div>

          <p className="mt-5 text-xs font-medium text-slate-400">
            Monthly goal contribution
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            ₹12,000
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            Within your monthly budget
          </p>

        </div>

      </section>


      {/* FEATURED GOAL */}

      <section className="mt-8 overflow-hidden rounded-3xl bg-[#10192D] p-6 text-white lg:p-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <PiggyBank size={19} />
              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Featured goal
                </p>

                <p className="text-sm font-bold">
                  {featuredGoal.name}
                </p>

              </div>

            </div>


            <div className="mt-7">

              <p className="text-sm text-slate-400">
                Current progress
              </p>

              <div className="mt-2 flex flex-wrap items-end gap-3">

                <span className="text-4xl font-bold">
                  {formatCurrency(featuredGoal.current)}
                </span>

                <span className="mb-1 text-sm text-slate-400">
                  of {formatCurrency(featuredGoal.target)}
                </span>

              </div>

            </div>


            <div className="mt-6">

              <div className="h-3 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-[#B9E8D0]"
                  style={{
                    width: `${featuredGoal.progress}%`,
                  }}
                />

              </div>

              <div className="mt-2 flex justify-between text-xs">

                <span className="font-semibold text-[#B9E8D0]">
                  {featuredGoal.progress}% complete
                </span>

                <span className="text-slate-400">
                  {formatCurrency(
                    featuredGoal.target - featuredGoal.current
                  )}{" "}
                  remaining
                </span>

              </div>

            </div>

          </div>


          {/* PREDICTION */}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <div className="flex items-center gap-2 text-[#B9E8D0]">

              <Sparkles size={18} />

              <span className="text-xs font-bold uppercase tracking-wider">
                Finova Prediction
              </span>

            </div>

            <p className="mt-5 text-sm text-slate-400">
              At your current savings rate
            </p>

            <p className="mt-1 text-2xl font-bold">
              You'll reach it by
            </p>

            <p className="mt-1 text-2xl font-bold text-[#B9E8D0]">
              Nov 18, 2026
            </p>

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-emerald-400/10 p-3">

              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <p className="text-xs leading-5 text-emerald-300">
                That's 43 days ahead of your original target.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* GOAL OPTIMIZER */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-[#CFE9DD] bg-[#F0FAF5]">

        <div className="p-6">

          <div className="flex flex-col gap-5 md:flex-row">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D8F1E4] text-[#123C35]">
              <Lightbulb size={21} />
            </div>

            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <span className="text-xs font-bold uppercase tracking-wider text-[#123C35]">
                  Goal Optimizer
                </span>

                <span className="rounded-full bg-[#D8F1E4] px-2.5 py-1 text-[10px] font-bold text-[#123C35]">
                  SMART RECOMMENDATION
                </span>

              </div>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Want to reach your emergency fund faster?
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                You can reach your ₹50,000 target approximately
                one month earlier by increasing your monthly
                contribution by just ₹1,750.
              </p>


              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Current contribution
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    ₹3,500
                  </p>

                </div>

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Recommended
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#123C35]">
                    ₹5,250
                  </p>

                </div>

                <div className="rounded-xl bg-white p-4">

                  <p className="text-xs text-slate-400">
                    Earlier by
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-600">
                    1 month
                  </p>

                </div>

              </div>


              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <button className="flex items-center justify-center gap-2 rounded-xl bg-[#123C35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D302B]">

                  Optimize Goal

                  <ArrowRight size={16} />

                </button>

                <button className="rounded-xl border border-[#BBDDCF] bg-white px-4 py-2.5 text-sm font-semibold text-[#123C35]">

                  See calculation

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ALL GOALS */}

      <section className="mt-8">

        <div className="mb-5 flex items-end justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Your Goals
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your progress and stay on course.
            </p>

          </div>

          <button className="hidden items-center gap-1 text-sm font-semibold text-[#123C35] sm:flex">
            View all
            <ChevronRight size={16} />
          </button>

        </div>


        <div className="grid gap-5 lg:grid-cols-3">

          {goals.map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              featured={index === 0}
            />
          ))}

        </div>

      </section>


      {/* TIMELINE */}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div>

          <div className="flex items-center gap-2">

            <CalendarDays
              size={20}
              className="text-[#123C35]"
            />

            <h2 className="text-xl font-bold text-slate-900">
              Emergency Fund Timeline
            </h2>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Your projected savings path based on your current
            monthly contribution.
          </p>

        </div>

        <Timeline />

      </section>


      {/* SMART GOAL CTA */}

      <section className="mt-8 rounded-2xl bg-[#123C35] p-6 text-white">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-2 text-[#B9E8D0]">

              <Sparkles size={17} />

              <span className="text-sm font-semibold">
                Make your goals smarter
              </span>

            </div>

            <h2 className="mt-2 text-xl font-bold">
              Let Finova create a goal plan for you.
            </h2>

            <p className="mt-1 max-w-xl text-sm text-white/60">
              Tell us what you're saving for and Finova can
              estimate the amount, timeline and monthly
              contribution you need.
            </p>

          </div>

          <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]">

            Create Smart Goal

            <ArrowRight size={17} />

          </button>

        </div>

      </section>

    </div>
  );
}