import {
  Bell,
  Check,
  ChevronRight,
  Globe,
  Lock,
  LogOut,
  Download,
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

import { useEffect, useState } from "react";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";


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

  const { user, loading } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem("finova_settings_preferences");
      return saved
        ? JSON.parse(saved)
        : {
            notifications: true,
            weeklySummary: true,
            goalAlerts: true,
            aiInsights: true,
            darkMode: false,
          };
    } catch {
      return {
        notifications: true,
        weeklySummary: true,
        goalAlerts: true,
        aiInsights: true,
        darkMode: false,
      };
    }
  });

  const [language, setLanguage] = useState(() =>
    localStorage.getItem("finova_language") || "English"
  );
  const [currency, setCurrency] = useState(() =>
    localStorage.getItem("finova_currency") || "INR"
  );
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAccounts, setShowAccounts] = useState(false);

  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
    });

    const loadUserSettings = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        if (!snapshot.exists()) return;

        const data = snapshot.data();
        if (data.preferences) setPreferences((current) => ({ ...current, ...data.preferences }));
        if (data.language) setLanguage(data.language);
        if (data.currency) setCurrency(data.currency);
      } catch (error) {
        console.error("SETTINGS LOAD ERROR:", error);
      }
    };

    loadUserSettings();
  }, [user]);

  const updatePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const cleanName = profile.name.trim();
      if (cleanName && cleanName !== (user.displayName || "")) {
        await updateProfile(user, { displayName: cleanName });
        await user.reload();
      }

      localStorage.setItem(
        "finova_settings_preferences",
        JSON.stringify(preferences)
      );
      localStorage.setItem("finova_language", language);
      localStorage.setItem("finova_currency", currency);

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || cleanName || "",
          phoneNumber: user.phoneNumber || "",
          preferences,
          language,
          currency,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setMessage("Your Firebase profile and preferences were saved.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error(error);
      setMessage(error?.message || "Could not save your changes.");
    }
  };

  const handlePasswordChange = async () => {
    if (!user?.email) return;

    try {
      if (!currentPassword || newPassword.length < 6) {
        setMessage("Enter your current password and a new password of at least 6 characters.");
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setShowPasswordBox(false);
      setMessage("Password changed successfully.");
    } catch (error) {
      console.error(error);
      setMessage(
        error?.code === "auth/invalid-credential"
          ? "Current password is incorrect."
          : error?.message || "Could not change your password."
      );
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setMessage(`A password reset email was sent to ${user.email}.`);
    } catch (error) {
      setMessage(error?.message || "Could not send the reset email.");
    }
  };

  const handleDownloadData = () => {
    const data = {
      account: {
        uid: user?.uid || null,
        name: user?.displayName || null,
        email: user?.email || null,
        phone: user?.phoneNumber || null,
        photoURL: user?.photoURL || null,
        providers:
          user?.providerData?.map((provider) => provider.providerId) || [],
        createdAt: user?.metadata?.creationTime || null,
        lastSignInAt: user?.metadata?.lastSignInTime || null,
      },
      preferences,
      language,
      currency,
      transactions: JSON.parse(localStorage.getItem("finova_transactions") || "[]"),
      goals: JSON.parse(localStorage.getItem("finova_goals") || "[]"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "finova-my-data.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Your Finova data export has been downloaded.");
  };

  const providerNames =
    user?.providerData?.map((provider) =>
      provider.providerId === "google.com" ? "Google" : provider.providerId
    ) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9F8] p-8 text-sm text-slate-500">
        Loading your account information...
      </div>
    );
  }

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
                readOnly
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
                value={profile.phone || "Not provided by Firebase"}
                readOnly
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

        {showPasswordBox && (
          <div className="mb-2 rounded-2xl bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={handlePasswordChange} className="rounded-xl bg-[#123C35] px-4 py-2 text-xs font-bold text-white">
                Update password
              </button>
              <button type="button" onClick={handleResetPassword} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700">
                Email me a reset link
              </button>
            </div>
          </div>
        )}


        <SettingRow
          icon={Shield}
          title="Two-factor authentication"
          description="Add another layer of protection to your Finova account."
        >

          <button
            type="button"
            onClick={() => setMessage("Two-factor enrollment requires a verified phone number and Firebase multi-factor setup. Your current Firebase account does not expose an enrolled second factor here.")}
            className="flex items-center gap-1 text-xs font-bold text-[#123C35]"
          >
            {user?.multiFactor?.enrolledFactors?.length ? "Enabled" : "Set up"}
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

          <button type="button" onClick={handleDownloadData} className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50">

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


          <button type="button" onClick={() => setShowAccounts((value) => !value)} className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50">

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

        {showAccounts && (
          <div className="mt-3 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Firebase account</p>
            <p className="mt-1 text-sm font-bold text-slate-800">
              {user?.email || "No email"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Signed in with: {providerNames.length ? providerNames.join(", ") : "Unknown provider"}
            </p>
            <p className="mt-1 break-all text-xs text-slate-400">UID: {user?.uid}</p>
          </div>
        )}

      </section>


      {message && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          {message}
        </div>
      )}

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