import {
  ArrowUpRight,
  HeartPulse,
  ShieldCheck,
  Target,
} from "lucide-react";

function FinancialHealth() {
  const factors = [
    ["Savings rate", "38.8%", "Strong"],
    ["Emergency fund", "2.7 months", "Good"],
    ["Debt burden", "18%", "Healthy"],
    ["Goal progress", "72%", "Improving"],
  ];

  return (
    <div className="space-y-6">

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5B8C78]">
          FINANCIAL HEALTH
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
          Understand your financial health
        </h1>

        <p className="mt-2 text-sm text-[#66736F]">
          A simple view of the factors influencing your financial wellbeing.
        </p>

      </div>


      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">

        <div className="rounded-2xl bg-[#123C35] p-8 text-white">

          <HeartPulse size={28} />

          <p className="mt-8 text-sm text-white/60">
            Overall score
          </p>

          <p className="mt-2 text-7xl font-bold">
            78
          </p>

          <p className="mt-2 text-sm text-[#B9E8D0]">
            Healthy financial position
          </p>

          <div className="mt-8 h-2 rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-[#B9E8D0]"
              style={{ width: "78%" }}
            />

          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-[#B9E8D0]">

            <ArrowUpRight size={16} />

            6 points improvement

          </div>

        </div>


        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-6">

          <h2 className="text-xl font-semibold text-[#123C35]">
            Score factors
          </h2>

          <div className="mt-5 space-y-3">

            {factors.map(([name, value, status]) => (

              <div
                key={name}
                className="flex items-center justify-between rounded-xl bg-[#F7F9F8] p-4"
              >

                <div>

                  <p className="text-sm font-semibold text-[#17211F]">
                    {name}
                  </p>

                  <p className="mt-1 text-xs text-[#66736F]">
                    Current position
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm font-bold text-[#123C35]">
                    {value}
                  </p>

                  <p className="mt-1 text-xs text-[#287A55]">
                    {status}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-5">

          <ShieldCheck
            size={21}
            className="text-[#123C35]"
          />

          <h3 className="mt-4 font-semibold text-[#123C35]">
            Financial resilience
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#66736F]">
            Your emergency savings provide a reasonable safety buffer.
          </p>

        </div>

        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-5">

          <Target
            size={21}
            className="text-[#123C35]"
          />

          <h3 className="mt-4 font-semibold text-[#123C35]">
            Goal progress
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#66736F]">
            You're making consistent progress toward your savings goals.
          </p>

        </div>

        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-5">

          <HeartPulse
            size={21}
            className="text-[#123C35]"
          />

          <h3 className="mt-4 font-semibold text-[#123C35]">
            AI recommendation
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#66736F]">
            Reduce discretionary spending to improve your score further.
          </p>

        </div>

      </div>

    </div>
  );
}

export default FinancialHealth;