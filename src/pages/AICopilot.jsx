import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const suggestions = [
  "How can I improve my financial health?",
  "Should I buy a laptop this month?",
  "How can I build my emergency fund?",
  "Where am I spending too much?",
];

function AICopilot() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getResponse = (text) => {

    const lower = text.toLowerCase();

    if (lower.includes("laptop") || lower.includes("buy")) {
      return "Based on your current financial health score of 82, the purchase looks manageable if your monthly payment stays below approximately ₹5,000. I would recommend simulating the decision first so we can compare its impact on your emergency fund and goals.";
    }

    if (
      lower.includes("emergency") ||
      lower.includes("fund")
    ) {
      return "Your emergency fund is currently the biggest opportunity in your financial profile. Consider building another ₹18,000 gradually. A consistent monthly contribution can strengthen this score without putting pressure on your spending.";
    }

    if (
      lower.includes("spend") ||
      lower.includes("expense")
    ) {
      return "Your spending health is currently strong. The main opportunity is to monitor discretionary categories and keep them within your monthly limits.";
    }

    return "Based on your current Finova profile, your financial health score is 82/100. Your strongest area is savings, while your emergency fund has the most room for improvement.";
  };


  const sendMessage = (text = message) => {

    if (!text.trim()) return;

    const reply = getResponse(text);

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
      },
      {
        type: "ai",
        text: reply,
      },
    ]);

    setMessage("");
  };


  return (
    <div className="mx-auto max-w-5xl">

      {/* Header */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123C35] text-[#B9E8D0]">
            <Bot size={24} />
          </div>

          <div>

            <p className="text-sm font-medium text-[#123C35]">
              Your personal financial assistant
            </p>

            <h1 className="text-3xl font-bold text-[#0F172A]">
              AI Copilot
            </h1>

          </div>

        </div>

        <p className="mt-3 max-w-2xl text-slate-500">
          Ask questions about your spending, goals and financial
          decisions. Finova uses your financial profile to provide
          personalized guidance.
        </p>

      </div>


      {/* Insight */}

      <div className="mb-5 rounded-2xl border border-[#CFEFE0] bg-[#F0FAF5] p-5">

        <div className="flex items-start gap-3">

          <Sparkles
            className="mt-1 text-[#123C35]"
            size={20}
          />

          <div>

            <h3 className="font-semibold text-[#123C35]">
              Today's insight
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Your financial health is strong at 82/100.
              Your biggest opportunity is improving your emergency fund.
            </p>

          </div>

        </div>

      </div>


      {/* Chat */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="min-h-[430px] p-5">

          {messages.length === 0 ? (

            <div className="flex min-h-[390px] flex-col items-center justify-center text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F7F0] text-[#123C35]">
                <Bot size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#0F172A]">
                How can I help?
              </h2>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Ask me about your financial health, spending,
                goals or an upcoming financial decision.
              </p>


              <div className="mt-6 grid w-full max-w-xl gap-2 sm:grid-cols-2">

                {suggestions.map((item) => (

                  <button
                    key={item}
                    onClick={() => sendMessage(item)}
                    className="rounded-xl border border-slate-200 p-3 text-left text-sm text-slate-600 transition hover:border-[#B9E8D0] hover:bg-[#F7F9F8]"
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

          ) : (

            <div className="space-y-5">

              {messages.map((item, index) => (

                <div
                  key={index}
                  className={`flex ${
                    item.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.type === "user"
                        ? "bg-[#123C35] text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.text}
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* Input */}

        <div className="border-t border-slate-200 p-4">

          <div className="flex gap-2">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask Finova anything..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#123C35]"
            />

            <button
              onClick={() => sendMessage()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#123C35] text-white transition hover:bg-[#0F172A]"
            >
              <Send size={18} />
            </button>

          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">

            <ShieldCheck size={13} />

            Your financial information stays protected.

          </div>

        </div>

      </div>

    </div>
  );
}

export default AICopilot;