import {
  Bot,
  Send,
  Sparkles,
} from "lucide-react";

function AICopilot() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5B8C78]">
          FINOVA AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
          Your financial copilot
        </h1>

        <p className="mt-2 text-sm text-[#66736F]">
          Ask questions about your money and understand your options.
        </p>

      </div>


      <div className="overflow-hidden rounded-2xl border border-[#E5EAE7] bg-white">

        <div className="border-b border-[#E5EAE7] p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123C35] text-[#B9E8D0]">
              <Bot size={20} />
            </div>

            <div>

              <p className="font-semibold text-[#123C35]">
                Finova Copilot
              </p>

              <p className="text-xs text-[#66736F]">
                Ready to help
              </p>

            </div>

          </div>

        </div>


        <div className="min-h-[420px] bg-[#F7F9F8] p-6">

          <div className="max-w-2xl rounded-2xl rounded-tl-sm bg-white p-5 shadow-sm">

            <div className="flex items-center gap-2">

              <Sparkles
                size={16}
                className="text-[#5B8C78]"
              />

              <p className="text-sm font-semibold text-[#123C35]">
                Hello! I'm Finova.
              </p>

            </div>

            <p className="mt-3 text-sm leading-6 text-[#66736F]">
              I can help you understand your spending, savings,
              goals and financial decisions.
            </p>

          </div>


          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            {[
              "Can I afford a ₹25,000 purchase?",
              "How can I improve my financial health?",
              "Why did my spending increase?",
              "How much should I save each month?",
            ].map((question) => (

              <button
                key={question}
                className="rounded-xl border border-[#DCE5E1] bg-white p-4 text-left text-sm text-[#123C35] transition hover:border-[#B9E8D0]"
              >
                {question}
              </button>

            ))}

          </div>

        </div>


        <div className="border-t border-[#E5EAE7] p-4">

          <div className="flex items-center gap-3">

            <input
              type="text"
              placeholder="Ask Finova anything..."
              className="flex-1 rounded-xl bg-[#F7F9F8] px-4 py-3 text-sm outline-none"
            />

            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123C35] text-white">

              <Send size={18} />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AICopilot;