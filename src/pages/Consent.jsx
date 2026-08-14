import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  Database,
  Eye,
  FileText,
  Lock,
  Shield,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";

import { useState } from "react";


const initialPermissions = [
  {
    id: "transactions",
    title: "Transaction Data",
    description:
      "Allows Finova to analyze income, expenses, and transaction patterns.",
    purpose:
      "Used for spending analysis, financial health, and personalized insights.",
    icon: Wallet,
    enabled: true,
    status: "Active",
  },
  {
    id: "goals",
    title: "Financial Goals",
    description:
      "Allows Finova to use your savings targets and goal progress.",
    purpose:
      "Used to measure goal progress and provide personalized recommendations.",
    icon: BarChart3,
    enabled: true,
    status: "Active",
  },
  {
    id: "ai",
    title: "AI Personalization",
    description:
      "Allows the AI Copilot to use your financial context when answering questions.",
    purpose:
      "Used to generate context-aware financial decision support.",
    icon: Sparkles,
    enabled: true,
    status: "Active",
  },
  {
    id: "analytics",
    title: "Usage Analytics",
    description:
      "Allows anonymous product usage information to improve Finova.",
    purpose:
      "Used to understand feature usage and improve the application experience.",
    icon: Activity,
    enabled: false,
    status: "Disabled",
  },
];


function PermissionCard({
  permission,
  onToggle,
}) {
  const Icon = permission.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-3">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              permission.enabled
                ? "bg-[#E8F7EF] text-[#123C35]"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            <Icon size={20} />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-sm font-bold text-slate-900">
                {permission.title}
              </h3>

              <span
                className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
                  permission.enabled
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {permission.status}
              </span>

            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {permission.description}
            </p>

          </div>

        </div>


        <button
          type="button"
          onClick={onToggle}
          aria-label={`Toggle ${permission.title}`}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            permission.enabled
              ? "bg-[#123C35]"
              : "bg-slate-300"
          }`}
        >

          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
              permission.enabled
                ? "left-6"
                : "left-1"
            }`}
          />

        </button>

      </div>


      <div className="mt-5 rounded-xl bg-slate-50 p-3">

        <div className="flex items-start gap-2">

          <Eye
            size={15}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Why Finova needs this
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {permission.purpose}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


function SecurityItem({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">
        <Icon size={17} />
      </div>

      <div>

        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}


export default function Consent() {

  const [permissions, setPermissions] =
    useState(initialPermissions);

  const [showModal, setShowModal] =
    useState(false);

  const togglePermission = (id) => {

    setPermissions((current) =>
      current.map((permission) =>
        permission.id === id
          ? {
              ...permission,
              enabled: !permission.enabled,
              status:
                !permission.enabled
                  ? "Active"
                  : "Disabled",
            }
          : permission
      )
    );
  };


  const activePermissions =
    permissions.filter(
      (permission) => permission.enabled
    ).length;


  return (
    <div className="min-h-screen bg-[#F7F9F8]">


      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">
            <ShieldCheck size={22} />
          </div>

          <div>

            <p className="text-sm font-medium text-slate-500">
              Your data, your control
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Consent Center
            </h1>

          </div>

        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Control what information Finova can access and understand
          exactly how your financial data is used.
        </p>

      </div>


      {/* TRUST BANNER */}

      <section className="overflow-hidden rounded-3xl bg-[#123C35] p-6 text-white lg:p-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-center">

          <div>

            <div className="flex items-center gap-2 text-[#B9E8D0]">

              <Lock size={18} />

              <span className="text-xs font-bold uppercase tracking-wider">
                Privacy by design
              </span>

            </div>

            <h2 className="mt-4 text-2xl font-bold">
              You stay in control of your financial data.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
              Finova only uses information necessary to provide
              the features you choose. You can review or change
              your permissions at any time.
            </p>


            <div className="mt-6 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3">

                <Check
                  size={15}
                  className="text-[#B9E8D0]"
                />

                <span className="text-xs font-medium">
                  Transparent
                </span>

              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3">

                <Check
                  size={15}
                  className="text-[#B9E8D0]"
                />

                <span className="text-xs font-medium">
                  User controlled
                </span>

              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3">

                <Check
                  size={15}
                  className="text-[#B9E8D0]"
                />

                <span className="text-xs font-medium">
                  Purpose limited
                </span>

              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B9E8D0] text-[#123C35]">
              <Shield size={23} />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-white/40">
              Active permissions
            </p>

            <p className="mt-1 text-4xl font-bold">
              {activePermissions}
              <span className="text-lg text-white/40">
                /{permissions.length}
              </span>
            </p>

            <p className="mt-2 text-xs leading-5 text-white/40">
              You can modify these permissions below.
            </p>

          </div>

        </div>

      </section>


      {/* PERMISSIONS */}

      <section className="mt-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            What Finova can access
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Turn individual permissions on or off whenever you want.
          </p>

        </div>


        <div className="grid gap-4 lg:grid-cols-2">

          {permissions.map((permission) => (

            <PermissionCard
              key={permission.id}
              permission={permission}
              onToggle={() =>
                togglePermission(permission.id)
              }
            />

          ))}

        </div>

      </section>


      {/* DATA USAGE */}

      <section className="mt-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            How your data is used
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Finova connects data access to a specific product purpose.
          </p>

        </div>


        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="grid grid-cols-[1fr_1fr_auto] border-b border-slate-100 bg-slate-50 px-5 py-3">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Data
            </p>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Used for
            </p>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status
            </p>

          </div>


          <div className="grid grid-cols-[1fr_1fr_auto] items-center border-b border-slate-100 px-5 py-4">

            <div className="flex items-center gap-2">

              <Database
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-semibold text-slate-700">
                Transactions
              </span>

            </div>

            <span className="text-xs text-slate-500">
              Spending analysis
            </span>

            <CheckCircle2
              size={17}
              className="text-emerald-500"
            />

          </div>


          <div className="grid grid-cols-[1fr_1fr_auto] items-center border-b border-slate-100 px-5 py-4">

            <div className="flex items-center gap-2">

              <TargetIcon />

              <span className="text-xs font-semibold text-slate-700">
                Goals
              </span>

            </div>

            <span className="text-xs text-slate-500">
              Goal recommendations
            </span>

            <CheckCircle2
              size={17}
              className="text-emerald-500"
            />

          </div>


          <div className="grid grid-cols-[1fr_1fr_auto] items-center px-5 py-4">

            <div className="flex items-center gap-2">

              <Sparkles
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-semibold text-slate-700">
                Financial context
              </span>

            </div>

            <span className="text-xs text-slate-500">
              AI Copilot
            </span>

            <CheckCircle2
              size={17}
              className="text-emerald-500"
            />

          </div>

        </div>

      </section>


      {/* SECURITY */}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-slate-900">
            Security & transparency
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Finova is designed around responsible financial-data handling.
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-3">

          <SecurityItem
            icon={Lock}
            title="Protected access"
            description="Data access is controlled through explicit permissions."
          />

          <SecurityItem
            icon={Eye}
            title="Transparent usage"
            description="Every permission explains why the data is needed."
          />

          <SecurityItem
            icon={FileText}
            title="User control"
            description="Permissions can be reviewed and modified from this center."
          />

        </div>

      </section>


      {/* DANGER / REVOKE */}

      <section className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500">
              <AlertCircle size={18} />
            </div>

            <div>

              <h2 className="text-sm font-bold text-slate-900">
                Revoke all optional access
              </h2>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                Turn off optional data permissions if you no longer
                want Finova to use them for personalization.
              </p>

            </div>

          </div>


          <button
            onClick={() => setShowModal(true)}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-xs font-bold text-red-600 transition hover:bg-red-50"
          >
            Review Access

            <ArrowRight size={15} />

          </button>

        </div>

      </section>


      {/* LAST UPDATED */}

      <div className="mt-6 flex items-center justify-between">

        <p className="text-[11px] text-slate-400">
          Consent preferences are stored with your account.
        </p>

        <p className="text-[11px] text-slate-400">
          Last reviewed: Today
        </p>

      </div>


      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <AlertCircle size={19} />
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  Review data access
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You can turn off optional permissions individually
                  below. Disabling permissions may reduce some
                  personalized Finova features.
                </p>

              </div>


              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>

            </div>


            <div className="mt-6 space-y-2">

              {permissions.map((permission) => (

                <button
                  key={permission.id}
                  onClick={() =>
                    togglePermission(permission.id)
                  }
                  className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-left hover:bg-slate-100"
                >

                  <span className="text-xs font-semibold text-slate-700">
                    {permission.title}
                  </span>

                  {permission.enabled ? (
                    <CheckCircle2
                      size={17}
                      className="text-emerald-500"
                    />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-slate-300" />
                  )}

                </button>

              ))}

            </div>


            <button
              onClick={() => setShowModal(false)}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#123C35] px-4 py-3 text-sm font-bold text-white"
            >
              Done
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


function TargetIcon() {
  return (
    <div className="flex h-4 w-4 items-center justify-center">
      <span className="h-3 w-3 rounded-full border-2 border-slate-400" />
    </div>
  );
}