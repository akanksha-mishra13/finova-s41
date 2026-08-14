import { ArrowRight, Sparkles, ShieldCheck, Target } from "lucide-react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <main className="min-h-screen bg-[#F7F9F8]">

      {/* NAVBAR */}

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <div>

          <h1 className="text-2xl font-bold tracking-tight text-[#123C35]">
            FINOVA
          </h1>

          <p className="text-xs text-[#66736F]">
            Financial intelligence
          </p>

        </div>

        <Link
          to="/dashboard"
          className="rounded-xl bg-[#123C35] px-5 py-3 text-sm font-semibold text-white"
        >
          Open dashboard
        </Link>

      </nav>


      {/* HERO */}

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E3DE] bg-white px-4 py-2 text-xs font-semibold text-[#5B8C78]">

            <Sparkles size={14} />

            AI-powered financial intelligence

          </div>

          <h2 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[#123C35] lg:text-6xl">

            Make better financial decisions.

          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#66736F]">

            Finova helps you understand your money,
            improve your financial health and make
            smarter financial decisions with AI.

          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-[#123C35] px-6 py-3.5 text-sm font-semibold text-white"
            >
              Explore Finova
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>


        {/* HERO CARD */}

        <div className="rounded-3xl border border-[#DCE5E1] bg-white p-6 shadow-sm">

          <div className="rounded-2xl bg-[#123C35] p-6 text-white">

            <p className="text-xs uppercase tracking-[0.15em] text-[#B9E8D0]">
              Financial Health
            </p>

            <div className="mt-4 flex items-end gap-2">

              <span className="text-6xl font-bold">
                78
              </span>

              <span className="mb-2 text-white/50">
                /100
              </span>

            </div>

            <p className="mt-2 text-sm text-white/70">
              Your financial health is improving.
            </p>

          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            <div className="rounded-2xl bg-[#F1F6F3] p-4">

              <ShieldCheck
                size={20}
                className="text-[#123C35]"
              />

              <p className="mt-3 text-sm font-semibold text-[#123C35]">
                Health insights
              </p>

              <p className="mt-1 text-xs leading-5 text-[#66736F]">
                Understand your financial position.
              </p>

            </div>

            <div className="rounded-2xl bg-[#F1F6F3] p-4">

              <Target
                size={20}
                className="text-[#123C35]"
              />

              <p className="mt-3 text-sm font-semibold text-[#123C35]">
                Smart actions
              </p>

              <p className="mt-1 text-xs leading-5 text-[#66736F]">
                Know what to focus on next.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Landing;