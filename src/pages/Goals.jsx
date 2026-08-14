import {
  ArrowRight,
  CalendarDays,
  Plus,
  Target,
} from "lucide-react";

const goals = [
  {
    name: "Emergency Fund",
    current: 54000,
    target: 60000,
    deadline: "Sep 2026",
  },
  {
    name: "Laptop",
    current: 42000,
    target: 75000,
    deadline: "Dec 2026",
  },
  {
    name: "Travel",
    current: 18000,
    target: 40000,
    deadline: "Mar 2027",
  },
];

function Goals() {
  return (
    <div className="space-y-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5B8C78]">
            GOALS
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
            Your financial goals
          </h1>

          <p className="mt-2 text-sm text-[#66736F]">
            Turn your plans into measurable financial milestones.
          </p>

        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#123C35] px-5 py-3 text-sm font-semibold text-white">

          <Plus size={17} />

          Create goal

        </button>

      </div>


      <div className="grid gap-5 lg:grid-cols-2">

        {goals.map((goal) => {

          const progress =
            (goal.current / goal.target) * 100;

          return (
            <div
              key={goal.name}
              className="rounded-2xl border border-[#E5EAE7] bg-white p-6"
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F6EE] text-[#123C35]">
                    <Target size={20} />
                  </div>

                  <div>

                    <h2 className="font-semibold text-[#123C35]">
                      {goal.name}
                    </h2>

                    <p className="mt-1 flex items-center gap-1 text-xs text-[#66736F]">

                      <CalendarDays size={13} />

                      Target {goal.deadline}

                    </p>

                  </div>

                </div>

                <span className="text-sm font-bold text-[#123C35]">
                  {Math.round(progress)}%
                </span>

              </div>


              <div className="mt-6 flex items-end justify-between">

                <div>

                  <p className="text-2xl font-bold text-[#123C35]">
                    ₹{goal.current.toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-xs text-[#66736F]">
                    of ₹{goal.target.toLocaleString("en-IN")}
                  </p>

                </div>

                <ArrowRight
                  size={18}
                  className="text-[#66736F]"
                />

              </div>


              <div className="mt-5 h-2 rounded-full bg-[#E8EEEB]">

                <div
                  className="h-full rounded-full bg-[#123C35]"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Goals;