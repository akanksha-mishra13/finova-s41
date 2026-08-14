import {
  ArrowRight,
  HandCoins,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const alternatives = [
  {
    title: "Save and wait",
    description:
      "Delay the purchase and strengthen your cash buffer.",
    suitability: "High",
  },
  {
    title: "Lower-cost option",
    description:
      "Choose a more affordable alternative to reduce financial pressure.",
    suitability: "High",
  },
  {
    title: "Finance later",
    description:
      "Consider financing only after improving your financial buffer.",
    suitability: "Medium",
  },
];

function Alternatives() {
  return (
    <div className="space-y-6">

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5B8C78]">
          ALTERNATIVES
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
          Explore better options
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66736F]">
          Finova helps you compare different paths instead of
          pushing you toward a single financial decision.
        </p>

      </div>


      <div className="rounded-2xl bg-[#123C35] p-6 text-white">

        <div className="flex items-center gap-3">

          <Sparkles className="text-[#B9E8D0]" />

          <div>

            <p className="text-xs uppercase tracking-[0.15em] text-[#B9E8D0]">
              AI RECOMMENDATION
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Consider waiting before borrowing
            </h2>

          </div>

        </div>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
          Based on your current financial position, improving your
          emergency fund first may provide a stronger safety buffer.

        </p>

      </div>


      <div className="grid gap-4">

        {alternatives.map((item) => (

          <div
            key={item.title}
            className="flex flex-col justify-between gap-5 rounded-2xl border border-[#E5EAE7] bg-white p-6 md:flex-row md:items-center"
          >

            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F6EE] text-[#123C35]">
                <HandCoins size={21} />
              </div>

              <div>

                <h2 className="font-semibold text-[#123C35]">
                  {item.title}
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-[#66736F]">
                  {item.description}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-5">

              <span className="text-xs font-semibold text-[#287A55]">
                Suitability: {item.suitability}
              </span>

              <ArrowRight
                size={18}
                className="text-[#66736F]"
              />

            </div>

          </div>

        ))}

      </div>


      <div className="flex items-start gap-3 rounded-2xl border border-[#D8E3DE] bg-[#EFF6F2] p-5">

        <ShieldCheck
          size={20}
          className="mt-0.5 text-[#123C35]"
        />

        <p className="text-sm leading-6 text-[#66736F]">
          Finova's recommendations are designed to support informed
          decisions. Users remain in control of the final decision.
        </p>

      </div>

    </div>
  );
}

export default Alternatives;