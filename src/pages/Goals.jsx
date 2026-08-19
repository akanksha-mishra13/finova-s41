import { useState } from "react";

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

const goals = [];

function formatCurrency(value) {
  const amount = Number(value || 0);
  return `₹${amount.toLocaleString("en-IN")}`;
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

function GoalCard({ goal, featured = false, onOpen }) {
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

        <button
          type="button"
          onClick={() => onOpen(goal)}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label={`Open ${goal.name}`}
        >
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


function GoalFormModal({ goal, onClose, onSave }) {
  const [name, setName] = useState(goal?.name || "");
  const [description, setDescription] = useState(goal?.description || "");
  const [current, setCurrent] = useState(goal?.current ?? "");
  const [target, setTarget] = useState(goal?.target ?? "");
  const [monthlyContribution, setMonthlyContribution] = useState(
    goal?.monthlyContribution ?? ""
  );
  const [targetDate, setTargetDate] = useState(
    goal?.targetDate
      ? new Date(goal.targetDate).toISOString().split("T")[0]
      : ""
  );
  const [priority, setPriority] = useState(
    goal?.priority || "Medium priority"
  );
  const [goalType, setGoalType] = useState(
    goal?.goalType ||
      (String(goal?.name || "").trim().toLowerCase() === "emergency fund"
        ? "Emergency Fund"
        : "General Goal")
  );

  function submit(event) {
    event.preventDefault();

    const currentAmount = Math.max(0, Number(current || 0));
    const targetAmount = Math.max(1, Number(target || 0));
    const monthlyAmount = Math.max(
      0,
      Number(monthlyContribution || 0)
    );

    const remaining = Math.max(0, targetAmount - currentAmount);
    const progress = Math.min(
      100,
      Math.round((currentAmount / targetAmount) * 100)
    );

    let predictedDate = "Set a monthly contribution";

    if (remaining === 0) {
      predictedDate = "Goal reached";
    } else if (monthlyAmount > 0) {
      const months = Math.ceil(remaining / monthlyAmount);
      const date = new Date();
      date.setMonth(date.getMonth() + months);

      predictedDate = date.toLocaleDateString("en-IN", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }

    const isEmergencyFund = goalType === "Emergency Fund";

    onSave({
      id: goal?.id || Date.now(),
      name: isEmergencyFund
        ? "Emergency Fund"
        : name.trim() || "Untitled Goal",
      description:
        description.trim() ||
        (isEmergencyFund
          ? "Build a safety cushion for unexpected expenses."
          : "A new financial savings goal."),
      goalType,
      current: currentAmount,
      target: targetAmount,
      monthlyContribution: monthlyAmount,
      predictedDate,
      targetDate: targetDate || "Not set",
      progress,
      priority,
      icon: goal?.icon || Target,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {goal ? "Edit Goal" : "Add New Goal"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {goal
                ? "Update your goal details."
                : "Create a new financial goal."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <select
            value={goalType}
            onChange={(event) => {
              const nextType = event.target.value;
              setGoalType(nextType);

              if (nextType === "Emergency Fund") {
                setName("Emergency Fund");
                if (!description.trim()) {
                  setDescription(
                    "Build a safety cushion for unexpected expenses."
                  );
                }
                setPriority("High priority");
              }
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123C35]"
          >
            <option>General Goal</option>
            <option>Emergency Fund</option>
          </select>

          {goalType === "Emergency Fund" && (
            <div className="rounded-xl bg-[#123C35]/5 px-4 py-3 text-xs leading-5 text-slate-600">
              Emergency Fund goals are shared with Financial Health and
              Credit Readiness through the same saved Goals data.
            </div>
          )}

          <input
            required={goalType !== "Emergency Fund"}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Goal name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
          />

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              min="0"
              type="number"
              value={current}
              onChange={(event) => setCurrent(event.target.value)}
              placeholder="Current saved"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
            />

            <input
              required
              min="1"
              type="number"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              placeholder="Target amount"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
            />

            <input
              required
              min="0"
              type="number"
              value={monthlyContribution}
              onChange={(event) =>
                setMonthlyContribution(event.target.value)
              }
              placeholder="Monthly contribution"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
            />

            <input
              type="date"
              value={targetDate}
              onChange={(event) => setTargetDate(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
            />
          </div>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#123C35]"
          >
            <option>High priority</option>
            <option>Medium priority</option>
            <option>Low priority</option>
          </select>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#123C35] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0D302B]"
            >
              {goal ? "Save Changes" : "Create Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function buildTimeline(goal) {
  if (!goal) return [];

  const current = Math.max(0, Number(goal.current || 0));
  const target = Math.max(current, Number(goal.target || 0));
  const monthlyContribution = Math.max(
    0,
    Number(goal.monthlyContribution || 0)
  );

  if (target <= current) {
    return [
      {
        month: new Date().toLocaleDateString("en-IN", {
          month: "short",
        }),
        amount: target,
        completed: true,
      },
    ];
  }

  if (monthlyContribution <= 0) {
    return [
      {
        month: new Date().toLocaleDateString("en-IN", {
          month: "short",
        }),
        amount: current,
        completed: true,
      },
      {
        month: "—",
        amount: target,
        completed: false,
      },
    ];
  }

  const monthsNeeded = Math.ceil(
    (target - current) / monthlyContribution
  );

  const numberOfSteps = Math.min(
    Math.max(monthsNeeded, 1),
    6
  );

  const timelineItems = [];

  for (let step = 0; step <= numberOfSteps; step += 1) {
    const amount = Math.min(
      current + monthlyContribution * step,
      target
    );

    const date = new Date();
    date.setMonth(date.getMonth() + step);

    timelineItems.push({
      month: date.toLocaleDateString("en-IN", {
        month: "short",
      }),
      amount,
      completed: amount <= current,
    });
  }

  // If the target needs more than six months, make the final item the
  // actual target month rather than showing a misleading partial timeline.
  if (monthsNeeded > 6) {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + monthsNeeded);

    timelineItems[timelineItems.length - 1] = {
      month: targetDate.toLocaleDateString("en-IN", {
        month: "short",
      }),
      amount: target,
      completed: false,
    };
  }

  return timelineItems;
}

function Timeline({ goal, goals, selectedGoalId, onSelectGoal }) {
  if (!goal) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
        <CalendarDays
          size={24}
          className="mx-auto text-slate-300"
        />

        <p className="mt-3 text-sm font-semibold text-slate-700">
          No goals yet
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Create a goal to see your projected savings timeline here.
        </p>
      </div>
    );
  }

  const items = buildTimeline(goal);

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#123C35]">
            Selected goal
          </p>

          <p className="mt-1 text-base font-bold text-slate-900">
            {goal.name}
          </p>
        </div>

        {goals.length > 1 && (
          <select
            value={selectedGoalId || goal.id}
            onChange={(event) => onSelectGoal(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123C35] sm:w-64"
          >
            {goals.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-400">Current</p>
          <p className="mt-1 text-lg font-bold text-[#123C35]">
            {formatCurrency(goal.current)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-400">Monthly contribution</p>
          <p className="mt-1 text-lg font-bold text-[#123C35]">
            {formatCurrency(goal.monthlyContribution || 0)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-400">Target</p>
          <p className="mt-1 text-lg font-bold text-[#123C35]">
            {formatCurrency(goal.target)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-slate-200 md:block" />

          <div
            className={`grid gap-6 ${
              items.length <= 4
                ? "grid-cols-2 sm:grid-cols-4"
                : "grid-cols-2 sm:grid-cols-4 md:grid-cols-7"
            }`}
          >
            {items.map((item, index) => (
              <div
                key={`${item.month}-${item.amount}-${index}`}
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
                  {formatCurrency(item.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 rounded-xl bg-[#F5F8F7] p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-semibold text-slate-700">
            Estimated completion
          </span>
          <span className="ml-2 text-slate-500">
            {goal.predictedDate || "Based on current contribution"}
          </span>
        </div>

        <span className="font-semibold text-[#123C35]">
          {Number(goal.progress || 0)}% complete
        </span>
      </div>
    </div>
  );
}

const GOALS_STORAGE_KEY = "finova_goals";

function loadSavedGoals() {
  try {
    const saved = localStorage.getItem(GOALS_STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.map((goal) => {
      const goalType =
        goal.goalType ||
        (String(goal.name || "").trim().toLowerCase() === "emergency fund"
          ? "Emergency Fund"
          : "General Goal");

      return {
        ...goal,
        goalType,
        icon:
        goal.priority === "High priority"
          ? PiggyBank
          : goal.priority === "Low priority"
            ? Target
            : Wallet,
      };
    });
  } catch (error) {
    console.error("Could not load goals:", error);
    return [];
  }
}

function saveGoalsToStorage(goalsToSave) {
  try {
    const cleanGoals = goalsToSave.map(({ icon, ...goal }) => goal);
    localStorage.setItem(
      GOALS_STORAGE_KEY,
      JSON.stringify(cleanGoals)
    );
  } catch (error) {
    console.error("Could not save goals:", error);
  }
}

function isEmergencyFundGoal(goal) {
  return (
    goal?.goalType === "Emergency Fund" ||
    String(goal?.name || "").trim().toLowerCase() === "emergency fund"
  );
}

function getEmergencyFundGoal(goalsList) {
  return goalsList.find(isEmergencyFundGoal) || null;
}

export default function Goals() {
  const [goalList, setGoalList] = useState(loadSavedGoals);
  const [formGoal, setFormGoal] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [timelineGoalId, setTimelineGoalId] = useState(null);
  const [showCalculation, setShowCalculation] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);

  const featuredGoal = goalList[0] || null;
  const emergencyFundGoal = getEmergencyFundGoal(goalList);

  const timelineGoal =
    goalList.find(
      (goal) => String(goal.id) === String(timelineGoalId)
    ) || goalList[0] || null;

  const overallProgress =
    goalList.length > 0
      ? Math.round(
          goalList.reduce((sum, goal) => sum + goal.progress, 0) /
            goalList.length
        )
      : 0;

  const monthlyGoalContribution = goalList.reduce(
    (sum, goal) => sum + Number(goal.monthlyContribution || 0),
    0
  );

  function saveGoal(updatedGoal) {
    setGoalList((previous) => {
      const exists = previous.some(
        (goal) => String(goal.id) === String(updatedGoal.id)
      );

      const isEmergency = isEmergencyFundGoal(updatedGoal);

      if (isEmergency) {
        const existingEmergency = previous.find(
          (goal) =>
            isEmergencyFundGoal(goal) &&
            String(goal.id) !== String(updatedGoal.id)
        );

        if (existingEmergency) {
          const updated = previous.map((goal) =>
            String(goal.id) === String(existingEmergency.id)
              ? { ...updatedGoal, id: existingEmergency.id }
              : goal
          );

          saveGoalsToStorage(updated);
          return updated;
        }
      }

      const updated = exists
        ? previous.map((goal) =>
            String(goal.id) === String(updatedGoal.id)
              ? updatedGoal
              : goal
          )
        : [...previous, updatedGoal];

      saveGoalsToStorage(updated);

      return updated;
    });

    if (isEmergencyFundGoal(updatedGoal)) {
      setTimelineGoalId(updatedGoal.id);
    }

    setShowForm(false);
    setFormGoal(null);
  }

  function deleteGoal(goalId) {
    setGoalList((previous) => {
      const updated = previous.filter(
        (goal) => String(goal.id) !== String(goalId)
      );

      saveGoalsToStorage(updated);

      return updated;
    });

    setSelectedGoal(null);
  }


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

          <button
            type="button"
            onClick={() => {
              setFormGoal(null);
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#10192D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#17223A]"
          >

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
            {overallProgress}%
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
            {goalList.length}
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
            {formatCurrency(monthlyGoalContribution)}
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            Within your monthly budget
          </p>

        </div>

      </section>


      {/* EMERGENCY FUND */}
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Safety net
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Emergency Fund
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A shared goal used by Goals, Financial Health, and Credit Readiness.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormGoal(emergencyFundGoal || null);
              setShowForm(true);
            }}
            className="rounded-xl bg-[#123C35] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0D302B]"
          >
            {emergencyFundGoal ? "Edit Emergency Fund" : "Create Emergency Fund"}
          </button>
        </div>

        {emergencyFundGoal ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Saved</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {formatCurrency(emergencyFundGoal.current)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Target</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {formatCurrency(emergencyFundGoal.target)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Progress</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {Number(emergencyFundGoal.progress || 0)}%
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
            Create an Emergency Fund goal once. Other financial pages can then
            read the same saved goal instead of keeping a separate emergency-fund value.
          </div>
        )}
      </section>

      {/* FEATURED GOAL */}

      {featuredGoal ? (
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
                      Math.max(
                        0,
                        featuredGoal.target - featuredGoal.current
                      )
                    )}{" "}
                    remaining
                  </span>

                </div>

              </div>

            </div>

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
                {featuredGoal.predictedDate}
              </p>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-emerald-400/10 p-3">

                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <p className="text-xs leading-5 text-emerald-300">
                  Based on your current savings rate and target.
                </p>

              </div>

            </div>

          </div>

        </section>
      ) : (
        <section className="mt-8 overflow-hidden rounded-3xl bg-[#10192D] p-8 text-center text-white lg:p-10">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <Target size={22} />
          </div>

          <p className="mt-4 text-lg font-bold">
            No featured goal yet
          </p>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Add your first goal and it will appear here automatically.
          </p>

          <button
            type="button"
            onClick={() => {
              setFormGoal(null);
              setShowForm(true);
            }}
            className="mt-5 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]"
          >
            Add New Goal
          </button>

        </section>
      )}

      {/* ALL GOALS */}

      <section id="all-goals" className="mt-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              All Goals
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {goalList.length
                ? `${goalList.length} goal${goalList.length === 1 ? "" : "s"}`
                : "Your goals will appear here."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormGoal(null);
              setShowForm(true);
            }}
            className="hidden items-center gap-1 text-sm font-semibold text-[#123C35] sm:flex"
          >
            Add Goal <ArrowRight size={15} />
          </button>
        </div>

        {goalList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <Target size={30} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-700">
              No goals added yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add your first goal to start tracking it.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {goalList.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                featured={index === 0}
                onOpen={setSelectedGoal}
              />
            ))}
          </div>
        )}
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
              Goal Timeline
            </h2>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Your projected savings path based on your current
            monthly contribution.
          </p>

        </div>

        <Timeline
          goal={timelineGoal}
          goals={goalList}
          selectedGoalId={timelineGoalId}
          onSelectGoal={setTimelineGoalId}
        />

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

          <button
            type="button"
            onClick={() => {
              setFormGoal(null);
              setShowForm(true);
            }}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B9E8D0] px-5 py-3 text-sm font-bold text-[#123C35] transition hover:bg-[#A8DEC4]"
          >

            Create Smart Goal

            <ArrowRight size={17} />

          </button>

        </div>

      </section>


      {showForm && (
        <GoalFormModal
          goal={formGoal}
          onClose={() => {
            setShowForm(false);
            setFormGoal(null);
          }}
          onSave={saveGoal}
        />
      )}

      {selectedGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#123C35]">
                  Goal details
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {selectedGoal.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedGoal.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedGoal(null)}
                className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F7F9F8] p-4">
                <p className="text-xs text-slate-400">Saved</p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {formatCurrency(selectedGoal.current)}
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F9F8] p-4">
                <p className="text-xs text-slate-400">Target</p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {formatCurrency(selectedGoal.target)}
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F9F8] p-4">
                <p className="text-xs text-slate-400">Progress</p>
                <p className="mt-1 text-xl font-bold text-[#123C35]">
                  {selectedGoal.progress}%
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F9F8] p-4">
                <p className="text-xs text-slate-400">
                  Monthly contribution
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {formatCurrency(selectedGoal.monthlyContribution)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormGoal(selectedGoal);
                  setSelectedGoal(null);
                  setShowForm(true);
                }}
                className="flex-1 rounded-xl bg-[#123C35] px-4 py-3 text-sm font-semibold text-white"
              >
                Edit Goal
              </button>

              <button
                type="button"
                onClick={() => deleteGoal(selectedGoal.id)}
                className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showCalculation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">
              See calculation
            </h2>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>
                Target:{" "}
                <strong className="text-slate-900">
                  {formatCurrency(featuredGoal.target)}
                </strong>
              </p>
              <p>
                Saved:{" "}
                <strong className="text-slate-900">
                  {formatCurrency(featuredGoal.current)}
                </strong>
              </p>
              <p>
                Remaining:{" "}
                <strong className="text-slate-900">
                  {formatCurrency(
                    Math.max(
                      0,
                      featuredGoal.target - featuredGoal.current
                    )
                  )}
                </strong>
              </p>
              <p>
                Monthly contribution:{" "}
                <strong className="text-slate-900">
                  {formatCurrency(featuredGoal.monthlyContribution)}
                </strong>
              </p>
              <p>
                Estimated completion:{" "}
                <strong className="text-slate-900">
                  {featuredGoal.predictedDate}
                </strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCalculation(false)}
              className="mt-6 w-full rounded-xl bg-[#123C35] px-4 py-3 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showOptimizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">
              Goal Optimizer
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A higher monthly contribution can help you reach{" "}
              {featuredGoal.name} sooner.
            </p>

            <div className="mt-5 rounded-xl bg-[#F0FAF5] p-4">
              <p className="text-xs text-slate-400">
                Suggested monthly contribution
              </p>
              <p className="mt-1 text-2xl font-bold text-[#123C35]">
                {formatCurrency(
                  Math.max(
                    featuredGoal.monthlyContribution,
                    Math.ceil(
                      Math.max(
                        0,
                        featuredGoal.target - featuredGoal.current
                      ) / 4
                    )
                  )
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowOptimizer(false)}
              className="mt-6 w-full rounded-xl bg-[#123C35] px-4 py-3 text-sm font-semibold text-white"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}