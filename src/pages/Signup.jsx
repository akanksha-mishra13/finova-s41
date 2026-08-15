import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = signup(
      name,
      email,
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT */}

        <div className="hidden bg-[#123C35] p-10 text-white lg:flex lg:flex-col lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              FINOVA
            </h1>

            <p className="mt-1 text-sm text-[#B9E8D0]">
              Financial intelligence
            </p>

          </div>

          <div className="max-w-lg">

            <p className="text-sm font-medium text-[#B9E8D0]">
              START YOUR JOURNEY
            </p>

            <h2 className="mt-4 text-5xl font-bold leading-tight">
              Build a healthier financial future.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/60">
              Track your money, understand your financial
              health and make smarter decisions with Finova.
            </p>

          </div>

          <p className="text-xs text-white/40">
            © 2026 Finova
          </p>

        </div>


        {/* RIGHT */}

        <div className="flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-md">

            <div className="mb-10 lg:hidden">

              <h1 className="text-2xl font-bold text-[#123C35]">
                FINOVA
              </h1>

              <p className="text-xs text-slate-500">
                Financial intelligence
              </p>

            </div>


            <div>

              <p className="text-sm font-medium text-[#123C35]">
                Get started
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Start building your personalized financial profile.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4"
            >

              {/* Name */}

              <div>

                <label className="text-sm font-medium text-slate-700">
                  Full name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#123C35] focus:ring-2 focus:ring-[#B9E8D0]"
                />

              </div>


              {/* Email */}

              <div>

                <label className="text-sm font-medium text-slate-700">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#123C35] focus:ring-2 focus:ring-[#B9E8D0]"
                />

              </div>


              {/* Password */}

              <div>

                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="At least 6 characters"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#123C35] focus:ring-2 focus:ring-[#B9E8D0]"
                />

              </div>


              {/* Confirm */}

              <div>

                <label className="text-sm font-medium text-slate-700">
                  Confirm password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Re-enter your password"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#123C35] focus:ring-2 focus:ring-[#B9E8D0]"
                />

              </div>


              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}


              {/* Submit */}

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123C35] px-5 py-4 font-semibold text-white transition hover:bg-[#0F172A] active:scale-[0.99]"
              >
                Create account
                <ArrowRight size={18} />
              </button>

            </form>


            <p className="mt-7 text-center text-sm text-slate-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#123C35] hover:underline"
              >
                Sign in
              </Link>

            </p>


            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">

              <ShieldCheck size={14} />

              Your financial information is protected.

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;