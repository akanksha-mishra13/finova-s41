import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Target,
} from "lucide-react";

import { Link } from "react-router-dom";


function Landing() {
  return (
    <main className="min-h-screen bg-[#F7F9F8]">

      {/* =========================================
          NAVBAR
      ========================================== */}

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        {/* LOGO */}

        <Link to="/">

          <h1 className="text-2xl font-bold tracking-tight text-[#123C35]">
            FINOVA
          </h1>

          <p className="text-xs text-[#66736F]">
            Financial intelligence
          </p>

        </Link>


        {/* AUTH BUTTONS */}

        <div className="flex items-center gap-2 sm:gap-3">

          <Link
            to="/login"
            className="rounded-xl px-4 py-3 text-sm font-semibold text-[#123C35] transition hover:bg-[#E9F4EF]"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-[#123C35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0E302A]"
          >
            Sign up
          </Link>

        </div>

      </nav>


      {/* =========================================
          HERO
      ========================================== */}

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">

        {/* LEFT SIDE */}

        <div>

          {/* BADGE */}

          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E3DE] bg-white px-4 py-2 text-xs font-semibold text-[#5B8C78]">

            <Sparkles size={14} />

            AI-powered financial intelligence

          </div>


          {/* HEADING */}

          <h2 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[#123C35] lg:text-6xl">

            Make better financial decisions.

          </h2>


          {/* DESCRIPTION */}

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#66736F]">

            Finova helps you understand your money,
            improve your financial health and make
            smarter financial decisions with AI.

          </p>


          {/* CTA */}

          <div className="mt-8 flex flex-wrap gap-3">

            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-xl bg-[#123C35] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0E302A]"
            >

              Get started

              <ArrowRight size={17} />

            </Link>


            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl border border-[#D8E3DE] bg-white px-6 py-3.5 text-sm font-semibold text-[#123C35] transition hover:bg-[#E9F4EF]"
            >

              Already have an account?

            </Link>

          </div>

        </div>


        {/* =========================================
            HERO CARD
        ========================================== */}

        <div className="rounded-3xl border border-[#DCE5E1] bg-white p-6 shadow-sm">

          {/* HEALTH CARD */}

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


          {/* FEATURE CARDS */}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            {/* HEALTH INSIGHTS */}

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


            {/* SMART ACTIONS */}

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


          {/* LOGIN CTA INSIDE CARD */}

          <div className="mt-4 rounded-2xl border border-[#DCE5E1] bg-[#FAFCFB] p-4">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-sm font-semibold text-[#123C35]">
                  Ready to get started?
                </p>

                <p className="mt-1 text-xs text-[#66736F]">
                  Create your personalized workspace.
                </p>

              </div>


              <Link
                to="/signup"
                className="shrink-0 rounded-lg bg-[#B9E8D0] px-4 py-2 text-xs font-bold text-[#123C35] transition hover:bg-[#A7DFC3]"
              >
                Create account
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          SIMPLE FEATURE STRIP
      ========================================== */}

      <section className="border-t border-[#DCE5E1] bg-white">

        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F3]">

              <ShieldCheck
                size={19}
                className="text-[#123C35]"
              />

            </div>

            <div>

              <h3 className="text-sm font-bold text-[#123C35]">
                Understand your finances
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#66736F]">
                Get a clear picture of your financial health.
              </p>

            </div>

          </div>


          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F3]">

              <Target
                size={19}
                className="text-[#123C35]"
              />

            </div>

            <div>

              <h3 className="text-sm font-bold text-[#123C35]">
                Plan your goals
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#66736F]">
                Turn financial goals into actionable plans.
              </p>

            </div>

          </div>


          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F3]">

              <Sparkles
                size={19}
                className="text-[#123C35]"
              />

            </div>

            <div>

              <h3 className="text-sm font-bold text-[#123C35]">
                Make smarter decisions
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#66736F]">
                Use intelligent insights before taking action.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================== */}

      <footer className="border-t border-[#DCE5E1] bg-[#F7F9F8]">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-bold text-[#123C35]">
              FINOVA
            </p>

            <p className="text-xs text-[#66736F]">
              Financial intelligence
            </p>

          </div>


          <div className="flex items-center gap-5">

            <Link
              to="/login"
              className="text-xs font-medium text-[#66736F] transition hover:text-[#123C35]"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="text-xs font-medium text-[#66736F] transition hover:text-[#123C35]"
            >
              Sign up
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}

export default Landing;