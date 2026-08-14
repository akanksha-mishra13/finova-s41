import { useState } from "react";
import {
  FlaskConical,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  CalendarDays,
} from "lucide-react";

function DecisionLab() {

  const [amount, setAmount] = useState(65000);
  const [duration, setDuration] = useState(12);
  const [result, setResult] = useState(null);

  const calculateSimulation = () => {

    const monthlyPayment = Math.round(amount / duration);

    const healthImpact =
      monthlyPayment > 6000
        ? -7
        : monthlyPayment > 4000
        ? -4
        : -2;

    const goalDelay =
      monthlyPayment > 6000
        ? 3
        : monthlyPayment > 4000
        ? 2
        : 1;

    setResult({
      monthlyPayment,
      healthImpact,
      goalDelay,
    });
  };

  return (
    <div className="mx-auto max-w-6xl">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-sm font-medium text-[#123C35]">
          Financial decision simulator
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#0F172A]">
          Decision Lab
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Before making a major financial decision, see how it could
          affect your monthly cash flow, goals and financial health.
        </p>

      </div>


      <div className="grid gap-6 lg:grid-cols-2">

        {/* INPUT */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F7F0] text-[#123C35]">
              <FlaskConical size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-[#0F172A]">
                Simulate a decision
              </h2>

              <p className="text-sm text-slate-500">
                Example: buying a laptop
              </p>
            </div>

          </div>


          {/* Amount */}

          <label className="text-sm font-medium text-slate-700">
            Purchase amount
          </label>

          <div className="mt-2 flex items-center rounded-xl border border-slate-200 px-4">

            <span className="text-lg font-semibold">
              ₹
            </span>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border-none bg-transparent px-3 py-4 text-lg font-semibold outline-none"
            />

          </div>


          {/* Duration */}

          <label className="mt-6 block text-sm font-medium text-slate-700">
            Payment duration
          </label>

          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-4 outline-none"
          >
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
            <option value={18}>18 months</option>
            <option value={24}>24 months</option>
          </select>


          <button
            onClick={calculateSimulation}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-4 font-semibold text-white transition hover:bg-[#123C35]"
          >
            Simulate decision
            <ArrowRight size={18} />
          </button>

        </div>


        {/* RESULT */}

        <div className="rounded-2xl bg-[#0F172A] p-6 text-white">

          {!result ? (

            <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <FlaskConical size={25} />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Your simulation will appear here
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Enter a purchase amount and payment duration to see
                the estimated financial impact.
              </p>

            </div>

          ) : (

            <div>

              <p className="text-sm text-slate-400">
                Simulation result
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Here's the expected impact
              </h2>


              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">
                    Monthly impact
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    ₹{result.monthlyPayment.toLocaleString()}
                  </p>
                </div>


                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">
                    Health score
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    82 → {82 + result.healthImpact}
                  </p>
                </div>


                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">
                    Goal delay
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    +{result.goalDelay} months
                  </p>
                </div>


                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">
                    Risk level
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#B9E8D0]">
                    {result.monthlyPayment > 6000
                      ? "Medium"
                      : "Low"}
                  </p>
                </div>

              </div>


              {/* Recommendation */}

              <div className="mt-6 rounded-xl bg-[#B9E8D0] p-5 text-[#123C35]">

                <div className="flex items-start gap-3">

                  <ShieldCheck className="mt-1 shrink-0" size={20} />

                  <div>

                    <h3 className="font-bold">
                      Finova recommendation
                    </h3>

                    <p className="mt-1 text-sm leading-6">

                      {result.monthlyPayment > 6000
                        ? "This decision may put pressure on your monthly cash flow. Consider waiting or choosing a longer payment duration."
                        : "This decision appears manageable, but it may temporarily slow your financial goals."}

                    </p>

                  </div>

                </div>

              </div>


              {/* Alternatives */}

              <div className="mt-6">

                <p className="text-sm font-semibold text-white">
                  Consider these alternatives
                </p>

                <div className="mt-3 space-y-2">

                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">

                    <div className="flex items-center gap-3">

                      <TrendingDown size={18} />

                      <span className="text-sm">
                        Choose a longer payment duration
                      </span>

                    </div>

                    <span className="text-xs text-[#B9E8D0]">
                      Lower monthly impact
                    </span>

                  </div>


                  <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">

                    <div className="flex items-center gap-3">

                      <CalendarDays size={18} />

                      <span className="text-sm">
                        Delay purchase by 3 months
                      </span>

                    </div>

                    <span className="text-xs text-[#B9E8D0]">
                      Healthiest
                    </span>

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default DecisionLab;