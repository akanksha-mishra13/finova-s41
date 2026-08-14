import {
  Bell,
  Check,
  ChevronRight,
  Globe,
  Lock,
  Mail,
  Moon,
  Palette,
  Save,
  Shield,
  Smartphone,
  User,
  Wallet,
  X,
} from "lucide-react";

import { useState } from "react";


function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={18} />
        </div>

        <div>

          <h3 className="text-sm font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            {description}
          </p>

        </div>

      </div>

      {children}

    </div>
  );
}


function Toggle({
  enabled,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled
          ? "bg-[#123C35]"
          : "bg-slate-300"
      }`}
    >

      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled
            ? "left-6"
            : "left-1"
        }`}
      />

    </button>
  );
}


function SelectBox({
  value,
  onChange,
  children,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#9ED7BA]"
    >
      {children}
    </select>
  );
}


export default function Settings() {

  const [profile, setProfile] = useState({
    name: "Akanksha Mishra",
    email: "akanksha@example.com",
    phone: "+91 98XXXXXX21",
  });

  const [preferences, setPreferences] =
    useState({
      notifications: true,
      weeklySummary: true,
      goalAlerts: true,
      aiInsights: true,
      darkMode: false,
    });

  const [language, setLanguage] =
    useState("English");

  const [currency, setCurrency] =
    useState("INR");

  const [saved, setSaved] =
    useState(false);


  const updatePreference = (key) => {

    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));

    setSaved(false);
  };


  const handleSave = () => {

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };


  return (
    <div className="min-h-screen bg-[#F7F9F8]">


      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">
            <User size={21} />
          </div>

          <div>

            <p className="text-sm font-medium text-slate-500">
              Personalize your Finova experience
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>

          </div>

        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your profile, notifications, preferences,
          security, and financial display settings.
        </p>

      </div>


      {/* PROFILE */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-slate-900">
            Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Keep your account information up to date.
          </p>

        </div>


        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <label className="text-xs font-semibold text-slate-600">
              Full name
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-white px-3">

              <User
                size={16}
                className="text-slate-400"
              />

              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-700 outline-none"
              />

            </div>

          </div>


          <div>

            <label className="text-xs font-semibold text-slate-600">
              Email address
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-white px-3">

              <Mail
                size={16}
                className="text-slate-400"
              />

              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-700 outline-none"
              />

            </div>

          </div>


          <div>

            <label className="text-xs font-semibold text-slate-600">
              Phone number
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-white px-3">

              <Smartphone
                size={16}
                className="text-slate-400"
              />

              <input
                value={profile.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value,
                  })
                }
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-700 outline-none"
              />

            </div>

          </div>

        </div>

      </section>


      {/* PREFERENCES */}

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">

        <div className="mb-2">

          <h2 className="text-xl font-bold text-slate-900">
            Preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose how Finova communicates with you.
          </p>

        </div>


        <SettingRow
          icon={Bell}
          title="Notifications"
          description="Receive important updates about your financial activity."
        >
          <Toggle
            enabled={preferences.notifications}
            onClick={() =>
              updatePreference("notifications")
            }
          />
        </SettingRow>


        <SettingRow
          icon={Mail}
          title="Weekly financial summary"
          description="Receive a weekly overview of spending, goals, and financial health."
        >
          <Toggle
            enabled={preferences.weeklySummary}
            onClick={() =>
              updatePreference("weeklySummary")
            }
          />
        </SettingRow>


        <SettingRow
          icon={Shield}
          title="Goal alerts"
          description="Get notified when your goals are falling behind or reaching milestones."
        >
          <Toggle
            enabled={preferences.goalAlerts}
            onClick={() =>
              updatePreference("goalAlerts")
            }
          />
        </SettingRow>


        <SettingRow
          icon={Wallet}
          title="AI financial insights"
          description="Allow Finova to surface proactive insights based on your financial activity."
        >
          <Toggle
            enabled={preferences.aiInsights}
            onClick={() =>
              updatePreference("aiInsights")
            }
          />
        </SettingRow>

      </section>


      {/* DISPLAY */}

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">

        <div className="mb-2">

          <h2 className="text-xl font-bold text-slate-900">
            Display & Region
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customize how financial information appears.
          </p>

        </div>


        <SettingRow
          icon={Globe}
          title="Language"
          description="Choose the language used throughout the Finova interface."
        >

          <SelectBox
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >

            <option value="English">
              English
            </option>

            <option value="Hindi">
              Hindi
            </option>

          </SelectBox>

        </SettingRow>


        <SettingRow
          icon={Wallet}
          title="Currency"
          description="Choose the currency used for displaying financial values."
        >

          <SelectBox
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value)
            }
          >

            <option value="INR">
              INR — ₹
            </option>

            <option value="USD">
              USD — $
            </option>

            <option value="EUR">
              EUR — €
            </option>

          </SelectBox>

        </SettingRow>


        <SettingRow
          icon={Palette}
          title="Dark mode"
          description="Use a darker interface for low-light environments."
        >

          <Toggle
            enabled={preferences.darkMode}
            onClick={() =>
              updatePreference("darkMode")
            }
          />

        </SettingRow>

      </section>


      {/* SECURITY */}

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">

        <div className="mb-2">

          <h2 className="text-xl font-bold text-slate-900">
            Security
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage account protection and security controls.
          </p>

        </div>


        <SettingRow
          icon={Lock}
          title="Password"
          description="Change your account password regularly to keep your account secure."
        >

          <button className="flex items-center gap-1 text-xs font-bold text-[#123C35]">

            Change

            <ChevronRight size={14} />

          </button>

        </SettingRow>


        <SettingRow
          icon={Shield}
          title="Two-factor authentication"
          description="Add another layer of protection to your Finova account."
        >

          <button className="flex items-center gap-1 text-xs font-bold text-[#123C35]">

            Enable

            <ChevronRight size={14} />

          </button>

        </SettingRow>

      </section>


      {/* DATA */}

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-900">
            Account & Data
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your account data and connected information.
          </p>

        </div>


        <div className="space-y-2">

          <button className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50">

            <div>

              <p className="text-sm font-semibold text-slate-700">
                Download my data
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Export the financial information associated with your account.
              </p>

            </div>

            <ChevronRight
              size={17}
              className="text-slate-400"
            />

          </button>


          <button className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50">

            <div>

              <p className="text-sm font-semibold text-slate-700">
                Manage connected accounts
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Review the financial accounts connected to Finova.
              </p>

            </div>

            <ChevronRight
              size={17}
              className="text-slate-400"
            />

          </button>

        </div>

      </section>


      {/* SAVE */}

      <div className="sticky bottom-5 z-20 mt-8 flex justify-end">

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#123C35] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#0d302a]"
        >

          {saved ? (
            <>
              <Check size={17} />
              Saved
            </>
          ) : (
            <>
              <Save size={17} />
              Save Changes
            </>
          )}

        </button>

      </div>


      {/* FOOTER */}

      <div className="mt-8 border-t border-slate-200 pt-6">

        <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">

          <p>
            Finova Financial Intelligence
          </p>

          <div className="flex gap-4">

            <button className="hover:text-slate-600">
              Privacy
            </button>

            <button className="hover:text-slate-600">
              Terms
            </button>

            <button className="hover:text-slate-600">
              Help
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}