import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Globe,
  Loader2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";


function Signup() {
  const navigate = useNavigate();

  const {
    signup,
    loginWithGoogle,
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);


  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      setLoading(false);
      return;
    }

    try {
      await signup(
        name,
        email,
        password
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      if (
        err.code ===
        "auth/email-already-in-use"
      ) {
        setError(
          "An account already exists with this email."
        );
      } else if (
        err.code ===
        "auth/invalid-email"
      ) {
        setError(
          "Please enter a valid email address."
        );
      } else if (
        err.code ===
        "auth/weak-password"
      ) {
        setError(
          "Password is too weak."
        );
      } else {
        setError(
          "Unable to create account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      await loginWithGoogle();

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      if (
        err.code ===
        "auth/popup-closed-by-user"
      ) {
        setError(
          "Google sign-in was cancelled."
        );
      } else {
        setError(
          "Google sign-up failed. Please try again."
        );
      }
    } finally {
      setGoogleLoading(false);
    }
  };


  return (
    <main className="flex min-h-screen bg-[#F7F9F8]">

      {/* LEFT */}

      <section className="hidden w-1/2 bg-[#123C35] p-12 text-white lg:flex lg:flex-col">

        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Finova
        </Link>

        <div className="mx-auto my-auto max-w-lg">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B9E8D0]">
            FINOVA
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-tight">
            Start your
            <br />
            financial journey.
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Build better financial habits,
            understand your money and make
            confident decisions.
          </p>

        </div>

      </section>


      {/* RIGHT */}

      <section className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">

        <div className="w-full max-w-md">

          <div className="mb-8">

            <Link
              to="/"
              className="text-2xl font-bold text-[#123C35] lg:hidden"
            >
              FINOVA
            </Link>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Get started with your personalized financial dashboard.
            </p>

          </div>


          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}


          {/* GOOGLE */}

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >

            {googleLoading ? (
              <Loader2
                size={19}
                className="animate-spin"
              />
            ) : (
              <Globe size={19} />
            )}

            {googleLoading
              ? "Creating account..."
              : "Continue with Google"}

          </button>


          {/* DIVIDER */}

          <div className="my-6 flex items-center gap-4">

            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />

          </div>


          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm outline-none focus:border-[#123C35] focus:ring-2 focus:ring-[#B9E8D0]"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm outline-none focus:border-[#123C35] focus:ring-2 focus:ring-[#B9E8D0]"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-11 text-sm outline-none focus:border-[#123C35] focus:ring-2 focus:ring-[#B9E8D0]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* CREATE */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123C35] px-4 py-3.5 text-sm font-semibold text-white hover:bg-[#0E302B] disabled:opacity-60"
            >

              {loading && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Creating account..."
                : "Create account"}

            </button>

          </form>


          <p className="mt-8 text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-[#123C35] hover:underline"
            >
              Sign in
            </Link>

          </p>

        </div>

      </section>

    </main>
  );
}

export default Signup;