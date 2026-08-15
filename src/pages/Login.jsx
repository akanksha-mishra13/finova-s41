import { useState } from "react";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const {
    login,
    loginWithGoogle,
  } = useAuth();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // --------------------------------
  // EMAIL LOGIN
  // --------------------------------

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {

      setError(
        "Please enter your email and password."
      );

      return;
    }


    try {

      setLoading(true);

      await login(
        email.trim(),
        password
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(
        "EMAIL LOGIN ERROR:",
        error
      );


      switch (error.code) {

        case "auth/invalid-credential":
          setError(
            "Invalid email or password."
          );
          break;

        case "auth/user-not-found":
          setError(
            "No account found with this email."
          );
          break;

        case "auth/wrong-password":
          setError(
            "Incorrect password."
          );
          break;

        case "auth/invalid-email":
          setError(
            "Please enter a valid email address."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Please try again later."
          );
          break;

        default:
          setError(
            "Unable to sign in. Please try again."
          );
      }

    } finally {

      setLoading(false);

    }

  };


  // --------------------------------
  // GOOGLE LOGIN
  // --------------------------------

  const handleGoogleLogin = async () => {

    setError("");

    setGoogleLoading(true);


    try {

      await loginWithGoogle();

      navigate("/dashboard");

    } catch (error) {

      console.error(
        "GOOGLE AUTH ERROR:",
        error.code
      );

      console.error(
        "GOOGLE AUTH MESSAGE:",
        error.message
      );


      switch (error.code) {

        case "auth/popup-closed-by-user":

          setError(
            "Google sign-in was cancelled."
          );

          break;


        case "auth/popup-blocked":

          setError(
            "Google popup was blocked. Please allow popups for Finova."
          );

          break;


        case "auth/cancelled-popup-request":

          setError(
            "A Google sign-in request is already open. Please try again."
          );

          break;


        case "auth/unauthorized-domain":

          setError(
            "This domain is not authorized in Firebase."
          );

          break;


        case "auth/operation-not-allowed":

          setError(
            "Google sign-in is not enabled in Firebase."
          );

          break;


        case "auth/network-request-failed":

          setError(
            "Network error. Please check your internet connection."
          );

          break;


        default:

          setError(
            "Google sign-in failed. Please try again."
          );

      }

    } finally {

      setGoogleLoading(false);

    }

  };


  return (

    <main className="min-h-screen bg-[#F7F9F8]">

      <div className="grid min-h-screen lg:grid-cols-2">


        {/* ===================================== */}
        {/* LEFT SIDE */}
        {/* ===================================== */}

        <section className="relative hidden overflow-hidden bg-[#123C35] lg:flex">

          <div className="absolute inset-0">

            <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#1E5A4F] opacity-40 blur-3xl" />

            <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-[#0D302B] opacity-50 blur-3xl" />

          </div>


          <div className="relative z-10 flex w-full flex-col p-12">


            {/* BACK */}

            <Link
              to="/"
              className="flex w-fit items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >

              <ArrowLeft size={18} />

              Back to Finova

            </Link>


            {/* BRAND / MESSAGE */}

            <div className="m-auto max-w-xl">

              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#B9E8D0]">
                FINOVA
              </p>


              <h1 className="text-5xl font-bold leading-[1.15] text-white xl:text-6xl">

                Your money.
                <br />

                Your decisions.
                <br />

                Your future.

              </h1>


              <p className="mt-8 max-w-lg text-lg leading-8 text-white/65">

                Understand your financial health,
                plan your goals and make smarter
                financial decisions.

              </p>


              <div className="mt-10 flex gap-3">

                <div className="h-1 w-12 rounded-full bg-[#B9E8D0]" />

                <div className="h-1 w-4 rounded-full bg-white/20" />

                <div className="h-1 w-4 rounded-full bg-white/20" />

              </div>

            </div>

          </div>

        </section>


        {/* ===================================== */}
        {/* RIGHT SIDE */}
        {/* ===================================== */}

        <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16">

          <div className="w-full max-w-md">


            {/* MOBILE BACK */}

            <Link
              to="/"
              className="mb-12 flex w-fit items-center gap-2 text-sm font-medium text-[#52645F] hover:text-[#123C35] lg:hidden"
            >

              <ArrowLeft size={18} />

              Back to Finova

            </Link>


            {/* HEADING */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold tracking-tight text-[#14213D] sm:text-4xl">

                Welcome back

              </h2>

              <p className="mt-3 text-base text-[#718096]">

                Sign in to continue to your financial dashboard.

              </p>

            </div>


            {/* ERROR */}

            {error && (

              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">

                {error}

              </div>

            )}


            {/* GOOGLE BUTTON */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading || loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#DCE3E8] bg-white px-5 py-4 text-sm font-semibold text-[#35445D] shadow-sm transition hover:bg-[#F8FAFB] hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
            >

              {googleLoading ? (

                <Loader2
                  size={20}
                  className="animate-spin"
                />

              ) : (

                <span className="flex h-5 w-5 items-center justify-center rounded-full text-lg font-bold">
                  G
                </span>

              )}

              {googleLoading
                ? "Connecting to Google..."
                : "Continue with Google"}

            </button>


            {/* OR */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#E2E8F0]" />

              <span className="text-xs font-medium text-[#94A3B8]">
                OR
              </span>

              <div className="h-px flex-1 bg-[#E2E8F0]" />

            </div>


            {/* EMAIL FORM */}

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >


              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#35445D]"
                >
                  Email address
                </label>


                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />


                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading || googleLoading}
                    className="w-full rounded-xl border border-[#DCE3E8] bg-white py-4 pl-12 pr-4 text-sm text-[#14213D] outline-none transition placeholder:text-[#A0A7AE] focus:border-[#123C35] focus:ring-2 focus:ring-[#123C35]/10 disabled:bg-[#F8FAFB]"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#35445D]"
                  >
                    Password
                  </label>

                </div>


                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />


                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading || googleLoading}
                    className="w-full rounded-xl border border-[#DCE3E8] bg-white py-4 pl-12 pr-12 text-sm text-[#14213D] outline-none transition placeholder:text-[#A0A7AE] focus:border-[#123C35] focus:ring-2 focus:ring-[#123C35]/10 disabled:bg-[#F8FAFB]"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] transition hover:text-[#123C35]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (

                      <EyeOff size={19} />

                    ) : (

                      <Eye size={19} />

                    )}

                  </button>

                </div>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123C35] px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0E302B] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (

                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Signing in...

                  </>

                ) : (

                  "Sign in"

                )}

              </button>

            </form>


            {/* SIGN UP */}

            <p className="mt-8 text-center text-sm text-[#718096]">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="font-semibold text-[#526E91] hover:text-[#123C35]"
              >
                Create one
              </Link>

            </p>


            {/* FOOTER */}

            <p className="mt-8 text-center text-xs leading-5 text-[#A0A7AE]">

              By continuing, you agree to Finova's
              terms and privacy policy.

            </p>

          </div>

        </section>

      </div>

    </main>

  );

}


export default Login;