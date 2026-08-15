import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Target,
  LogIn,
  UserPlus,
} from "lucide-react";

import { Link } from "react-router-dom";

function Landing() {
  return (
    <main className="min-h-screen bg-[#F7F9F8]">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">

        {/* LOGO */}

        <Link to="/" className="block">

          <h1 className="text-2xl font-bold tracking-tight !text-[#123C35]">
            FINOVA
          </h1>

          <p className="mt-1 text-xs !text-[#66736F]">
            Financial intelligence
          </p>

        </Link>


        {/* NAV BUTTONS */}

        <div className="flex items-center gap-4">

          {/* SIGN IN */}

          <Link
            to="/login"
            className="
              flex
              min-h-[44px]
              items-center
              gap-2
              rounded-xl
              border-2
              border-[#123C35]
              bg-white
              px-5
              py-3
              text-sm
              font-bold
              !text-[#123C35]
              shadow-sm
              transition
              hover:bg-[#EAF2EE]
            "
          >

            <LogIn
              size={18}
              strokeWidth={2.2}
              className="!text-[#123C35]"
            />

            <span className="!text-[#123C35]">
              Sign in
            </span>

          </Link>


          {/* GET STARTED */}

          <Link
            to="/signup"
            className="
              flex
              min-h-[44px]
              items-center
              gap-2
              rounded-xl
              border-2
              border-[#123C35]
              bg-[#123C35]
              px-6
              py-3
              text-sm
              font-bold
              !text-white
              shadow-md
              transition
              hover:bg-[#0E302B]
            "
          >

            <UserPlus
              size={18}
              strokeWidth={2.2}
              className="!text-white"
            />

            <span className="!text-white">
              Get started
            </span>

          </Link>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">

        {/* LEFT */}

        <div>

          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#BFD8CD]
              bg-white
              px-4
              py-2
              text-xs
              font-bold
              !text-[#4F8972]
              shadow-sm
            "
          >

            <Sparkles
              size={15}
              className="!text-[#4F8972]"
            />

            <span className="!text-[#4F8972]">
              AI-powered financial intelligence
            </span>

          </div>


          {/* HEADING */}

          <h2
            className="
              mt-6
              max-w-3xl
              text-5xl
              font-bold
              leading-tight
              tracking-tight
              !text-[#123C35]
              lg:text-6xl
            "
          >
            Make better financial decisions.
          </h2>


          {/* DESCRIPTION */}

          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              !text-[#66736F]
            "
          >
            Finova helps you understand your money,
            improve your financial health and make
            smarter financial decisions with AI.
          </p>


          {/* HERO BUTTONS */}

          <div className="mt-8 flex flex-wrap items-center gap-4">

            {/* START WITH FINOVA */}

            <Link
              to="/signup"
              className="
                inline-flex
                min-h-[50px]
                items-center
                justify-center
                gap-2
                rounded-xl
                border-2
                border-[#123C35]
                bg-[#123C35]
                px-7
                py-3.5
                text-sm
                font-bold
                !text-white
                shadow-md
                transition
                hover:bg-[#0E302B]
              "
            >

              <span className="!text-white">
                Start with Finova
              </span>

              <ArrowRight
                size={18}
                strokeWidth={2.3}
                className="!text-white"
              />

            </Link>


            {/* SIGN IN */}

            <Link
              to="/login"
              className="
                inline-flex
                min-h-[50px]
                items-center
                justify-center
                gap-2
                rounded-xl
                border-2
                border-[#123C35]
                bg-white
                px-7
                py-3.5
                text-sm
                font-bold
                !text-[#123C35]
                shadow-sm
                transition
                hover:bg-[#EAF2EE]
              "
            >

              <LogIn
                size={18}
                strokeWidth={2.3}
                className="!text-[#123C35]"
              />

              <span className="!text-[#123C35]">
                Sign in
              </span>

            </Link>

          </div>


          {/* SMALL TEXT */}

          <p className="mt-5 text-xs !text-[#7A8883]">
            Create your account in seconds. No financial data required
            to get started.
          </p>

        </div>


        {/* =====================================================
            RIGHT CARD
        ====================================================== */}

        <div
          className="
            rounded-3xl
            border-2
            border-[#DCE5E1]
            bg-white
            p-6
            shadow-lg
          "
        >

          {/* FINANCIAL HEALTH */}

          <div
            className="
              rounded-2xl
              bg-[#123C35]
              p-7
            "
          >

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.15em]
                !text-[#B9E8D0]
              "
            >
              Financial Health
            </p>


            <div className="mt-4 flex items-end gap-2">

              <span className="text-6xl font-bold !text-white">
                78
              </span>

              <span className="mb-2 text-lg !text-white/60">
                /100
              </span>

            </div>


            <p className="mt-2 text-sm !text-white/80">
              Your financial health is improving.
            </p>

          </div>


          {/* FEATURE CARDS */}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            {/* HEALTH INSIGHTS */}

            <div
              className="
                rounded-2xl
                border
                border-[#DCE5E1]
                bg-[#F1F6F3]
                p-5
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                "
              >

                <ShieldCheck
                  size={21}
                  className="!text-[#123C35]"
                />

              </div>


              <p className="mt-4 text-sm font-bold !text-[#123C35]">
                Health insights
              </p>


              <p className="mt-1 text-xs leading-5 !text-[#66736F]">
                Understand your financial position.
              </p>

            </div>


            {/* SMART ACTIONS */}

            <div
              className="
                rounded-2xl
                border
                border-[#DCE5E1]
                bg-[#F1F6F3]
                p-5
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                "
              >

                <Target
                  size={21}
                  className="!text-[#123C35]"
                />

              </div>


              <p className="mt-4 text-sm font-bold !text-[#123C35]">
                Smart actions
              </p>


              <p className="mt-1 text-xs leading-5 !text-[#66736F]">
                Know what to focus on next.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="border-t border-[#DCE5E1] pt-8">

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-10
              gap-y-3
              text-center
              text-xs
              font-medium
              !text-[#7A8883]
            "
          >

            <span>
              Understand your money
            </span>

            <span>
              •
            </span>

            <span>
              Improve financial health
            </span>

            <span>
              •
            </span>

            <span>
              Make smarter decisions
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Landing;