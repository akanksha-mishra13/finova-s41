import {
  CheckCircle2,
  CreditCard,
  Info,
  TrendingUp,
} from "lucide-react";

function CreditReadiness() {
  const factors = [
    "Stable income",
    "Healthy savings rate",
    "Manageable debt",
    "Emergency fund",
  ];

  return (
    <div className="space-y-6">

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5B8C78]">
          CREDIT READINESS
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
          Are you ready to borrow?
        </h1>

        <p className="mt-2 text-sm text-[#66736F]">
          Understand your financial readiness before taking on new debt.
        </p>

      </div>


      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl bg-[#123C35] p-7 text-white">

          <CreditCard size={26} />

          <p className="mt-8 text-sm text-white/60">
            Readiness score
          </p>

          <p className="mt-2 text-6xl font-bold">
            82
          </p>

          <p className="mt-2 text-sm text-[#B9E8D0]">
            Good borrowing readiness
          </p>

        </div>


        <div className="lg:col-span-2 rounded-2xl border border-[#E5EAE7] bg-white p-6">

          <h2 className="text-xl font-semibold text-[#123C35]">
            What is working in your favor?
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            {factors.map((factor) => (

              <div
                key={factor}
                className="flex items-center gap-3 rounded-xl bg-[#F7F9F8] p-4"
              >

                <CheckCircle2
                  size={19}
                  className="text-[#287A55]"
                />

                <span className="text-sm font-medium text-[#17211F]">
                  {factor}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>


      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-6">

          <TrendingUp
            size={21}
            className="text-[#123C35]"
          />

          <h3 className="mt-4 font-semibold text-[#123C35]">
            Improve your readiness
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#66736F]">
            Increasing your emergency savings could improve your
            financial resilience before taking new credit.
          </p>

        </div>

        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-6">

          <Info
            size={21}
            className="text-[#123C35]"
          />

          <h3 className="mt-4 font-semibold text-[#123C35]">
            Important
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#66736F]">
            Finova provides financial education and decision support,
            not guaranteed loan approval.
          </p>

        </div>

      </div>

    </div>
  );
}

export default CreditReadiness;