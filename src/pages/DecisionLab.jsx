import {
  ArrowRight,
  Brain,
  Calculator,
  ShieldCheck,
  Target,
} from "lucide-react";

function DecisionLab() {
  return (
    <div className="space-y-6">

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5B8C78]">
          DECISION LAB
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
          Before you make a financial decision
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66736F]">
          Simulate a purchase or financial decision and understand
          how it could affect your future financial position.
        </p>

      </div>


      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">

        {/* INPUT */}

        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-6">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F6EE] text-[#123C35]">
            <Calculator size={21} />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-[#123C35]">
            What are you planning?
          </h2>

          <div className="mt-5 space-y-4">

            <div>

              <label className="text-xs font-semibold text-[#66736F]">
                Purchase
              </label>

              <input
                type="text"
                placeholder="e.g. New laptop"
                className="mt-2 w-full rounded-xl border border-[#DCE5E1] bg-white px-4 py-3 text-sm outline-none focus:border-[#5B8C78]"
              />

            </div>

            <div>

              <label className="text-xs font-semibold text-[#66736F]">
                Amount
              </label>

              <input
                type="number"
                placeholder="25000"
                className="mt-2 w-full rounded-xl border border-[#DCE5E1] bg-white px-4 py-3 text-sm outline-none focus:border-[#5B8C78]"
              />

            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123C35] py-3 text-sm font-semibold text-white">

              Analyze decision

              <ArrowRight size={16} />

            </button>

          </div>

        </div>


        {/* RESULT */}

        <div className="rounded-2xl bg-[#123C35] p-6 text-white">

          <div className="flex items-center gap-3">

            <Brain className="text-[#B9E8D0]" />

            <div>

              <p className="text-xs uppercase tracking-[0.15em] text-[#B9E8D0]">
                FINOVA SIMULATION
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Example: ₹25,000 purchase
              </h2>

            </div>

          </div>


          <div className="mt-7 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl bg-white/5 p-4">

              <ShieldCheck size={18} />

              <p className="mt-3 text-xs text-white/50">
                HEALTH IMPACT
              </p>

              <p className="mt-1 font-semibold text-[#B9E8D0]">
                Low
              </p>

            </div>

            <div className="rounded-xl bg-white/5 p-4">

              <Target size={18} />

              <p className="mt-3 text-xs text-white/50">
                GOAL DELAY
              </p>

              <p className="mt-1 font-semibold text-[#B9E8D0]">
                3 weeks
              </p>

            </div>

            <div className="rounded-xl bg-white/5 p-4">

              <Calculator size={18} />

              <p className="mt-3 text-xs text-white/50">
                BUFFER
              </p>

              <p className="mt-1 font-semibold text-[#B9E8D0]">
                Healthy
              </p>

            </div>

          </div>


          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">

            <p className="text-xs text-white/50">
              AI RECOMMENDATION
            </p>

            <p className="mt-2 text-sm leading-6 text-white/80">
              This purchase appears manageable, but waiting until
              your next income cycle would protect your emergency
              fund contribution.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DecisionLab;