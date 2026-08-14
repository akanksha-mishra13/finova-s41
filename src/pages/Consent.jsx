import {
  CheckCircle2,
  Database,
  Eye,
  ShieldCheck,
} from "lucide-react";

function Consent() {
  return (
    <div className="space-y-6">

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5B8C78]">
          CONSENT CENTER
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
          You're in control of your data
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66736F]">
          Review what information Finova uses and why it is needed.
        </p>

      </div>


      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-6">

          <Database
            size={22}
            className="text-[#123C35]"
          />

          <h2 className="mt-4 font-semibold text-[#123C35]">
            Data usage
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#66736F]">
            Understand how financial information contributes to insights.
          </p>

        </div>


        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-6">

          <Eye
            size={22}
            className="text-[#123C35]"
          />

          <h2 className="mt-4 font-semibold text-[#123C35]">
            Visibility
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#66736F]">
            Review which permissions and connections are active.
          </p>

        </div>


        <div className="rounded-2xl border border-[#E5EAE7] bg-white p-6">

          <ShieldCheck
            size={22}
            className="text-[#123C35]"
          />

          <h2 className="mt-4 font-semibold text-[#123C35]">
            Consent
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#66736F]">
            You can review or withdraw permissions.
          </p>

        </div>

      </div>


      <div className="rounded-2xl border border-[#E5EAE7] bg-white p-6">

        <h2 className="text-xl font-semibold text-[#123C35]">
          Active permissions
        </h2>

        <div className="mt-5 space-y-3">

          {[
            "Transaction history",
            "Financial goals",
            "Income information",
          ].map((permission) => (

            <div
              key={permission}
              className="flex items-center justify-between rounded-xl bg-[#F7F9F8] p-4"
            >

              <span className="text-sm font-medium text-[#17211F]">
                {permission}
              </span>

              <span className="flex items-center gap-2 text-xs font-semibold text-[#287A55]">

                <CheckCircle2 size={15} />

                Active

              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Consent;