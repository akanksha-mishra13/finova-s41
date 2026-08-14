import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Lightbulb,
  MessageCircle,
  Mic,
  MoreHorizontal,
  PieChart,
  Send,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";

import { useState } from "react";

const quickPrompts = [
  {
    icon: Wallet,
    title: "Can I afford this?",
    prompt: "Can I afford a ₹30,000 phone?",
  },
  {
    icon: Target,
    title: "Help me save",
    prompt: "How can I reach my emergency fund goal faster?",
  },
  {
    icon: TrendingDown,
    title: "Reduce spending",
    prompt: "Where can I reduce my monthly spending?",
  },
  {
    icon: PieChart,
    title: "Explain my finances",
    prompt: "Give me a quick summary of my financial health.",
  },
];

const insights = [
  {
    icon: TrendingUp,
    title: "Dining spending increased",
    description:
      "Your dining expenses are 18% higher than your usual monthly average.",
    type: "Attention",
  },
  {
    icon: Target,
    title: "Emergency fund is progressing",
    description:
      "You have completed 59% of your emergency fund target.",
    type: "Positive",
  },
  {
    icon: Wallet,
    title: "Savings opportunity",
    description:
      "You may be able to redirect around ₹2,500 this month toward your goals.",
    type: "Opportunity",
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "ai",
    text:
      "Good evening, Akanksha 👋 I’m your Finova Financial Copilot. I can help you understand your money, evaluate decisions, and find safer ways to reach your goals.",
  },
];

function MessageBubble({ message }) {
  const isAI = message.sender === "ai";

  return (
    <div
      className={`flex ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-[82%] items-end gap-3 ${
          isAI ? "" : "flex-row-reverse"
        }`}
      >
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            isAI
              ? "bg-[#D8F1E4] text-[#123C35]"
              : "bg-[#123C35] text-white"
          }`}
        >
          {isAI ? <Bot size={16} /> : "AM"}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            isAI
              ? "rounded-bl-md bg-slate-100 text-slate-700"
              : "rounded-br-md bg-[#123C35] text-white"
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

function QuickPrompt({ item, onClick }) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#B9E8D0] hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF7F0] text-[#123C35]">
          <Icon size={18} />
        </div>

        <ChevronRight
          size={16}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#123C35]"
        />
      </div>

      <p className="mt-4 text-sm font-bold text-slate-900">
        {item.title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {item.prompt}
      </p>
    </button>
  );
}

function InsightCard({ insight }) {
  const Icon = insight.icon;

  const positive = insight.type === "Positive";
  const opportunity = insight.type === "Opportunity";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">

      <div className="flex items-start justify-between gap-3">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : opportunity
              ? "bg-blue-50 text-blue-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          <Icon size={17} />
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : opportunity
              ? "bg-blue-50 text-blue-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {insight.type}
        </span>

      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-900">
        {insight.title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {insight.description}
      </p>

    </div>
  );
}

export default function AICopilot() {

  const [messages, setMessages] =
    useState(initialMessages);

  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const sendMessage = (text) => {

    const trimmed = text.trim();

    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {

      let response =
        "I’ll analyze that using your financial profile, recent spending, goals, and current obligations. Once connected to Finova’s backend, I’ll provide a personalized recommendation.";

      if (
        trimmed.toLowerCase().includes("phone") ||
        trimmed.toLowerCase().includes("afford")
      ) {
        response =
          "Based on your current financial position, I would first check whether the purchase can be made without reducing your emergency buffer or delaying your active goals. I’d recommend comparing the purchase against your monthly surplus before committing.";
      }

      if (
        trimmed.toLowerCase().includes("save") ||
        trimmed.toLowerCase().includes("saving")
      ) {
        response =
          "Your strongest opportunity is to redirect part of your discretionary spending toward your emergency fund. A consistent monthly contribution can help you reach your goal without creating additional debt.";
      }

      if (
        trimmed.toLowerCase().includes("spending") ||
        trimmed.toLowerCase().includes("expense")
      ) {
        response =
          "Your recent spending pattern suggests dining and discretionary purchases are the first areas worth reviewing. I can help you identify categories where a small reduction would have the biggest impact.";
      }

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: response,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setIsTyping(false);

    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8]">

      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#123C35]">
            <Bot size={22} />
          </div>

          <div>

            <p className="text-sm font-medium text-slate-500">
              Your personal financial intelligence
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              AI Copilot
            </h1>

          </div>

        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Ask Finova about your money, goals, spending, credit,
          or upcoming financial decisions. Your copilot is designed
          to help you make better-informed choices.
        </p>

      </div>


      {/* MAIN GRID */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">


        {/* CHAT */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* CHAT HEADER */}

          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="relative">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123C35] text-[#B9E8D0]">
                  <Bot size={19} />
                </div>

                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />

              </div>

              <div>

                <p className="text-sm font-bold text-slate-900">
                  Finova Copilot
                </p>

                <p className="text-[11px] text-emerald-600">
                  Online • Context-aware
                </p>

              </div>

            </div>


            <button
              type="button"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
            >
              <MoreHorizontal size={18} />
            </button>

          </div>


          {/* MESSAGES */}

          <div className="h-[500px] overflow-y-auto p-5">

            <div className="space-y-5">

              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                />
              ))}


              {isTyping && (
                <div className="flex items-end gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D8F1E4] text-[#123C35]">
                    <Bot size={16} />
                  </div>

                  <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3">

                    <div className="flex gap-1">

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />

                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>


          {/* INPUT */}

          <div className="border-t border-slate-100 p-4">

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-[#9ED7BA] focus-within:bg-white"
            >

              <button
                type="button"
                className="rounded-xl p-2.5 text-slate-400 transition hover:bg-white hover:text-slate-700"
              >
                <Mic size={18} />
              </button>

              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ask Finova anything about your finances..."
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123C35] text-white transition hover:bg-[#0d302a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={17} />
              </button>

            </form>

            <p className="mt-2 text-center text-[10px] text-slate-400">
              Finova provides decision support, not financial advice.
            </p>

          </div>

        </section>


        {/* RIGHT SIDEBAR */}

        <aside className="space-y-6">


          {/* COPILOT STATUS */}

          <section className="rounded-2xl bg-[#123C35] p-5 text-white">

            <div className="flex items-center gap-2 text-[#B9E8D0]">

              <Sparkles size={17} />

              <span className="text-xs font-bold uppercase tracking-wider">
                Copilot Context
              </span>

            </div>

            <h2 className="mt-3 text-lg font-bold">
              Finova knows your financial picture.
            </h2>

            <p className="mt-2 text-xs leading-5 text-white/60">
              Recommendations can use your spending patterns,
              goals, savings, and financial health indicators.
            </p>


            <div className="mt-5 space-y-2">

              <div className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5">

                <span className="text-xs text-white/60">
                  Spending
                </span>

                <CheckCircle2
                  size={15}
                  className="text-[#B9E8D0]"
                />

              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5">

                <span className="text-xs text-white/60">
                  Goals
                </span>

                <CheckCircle2
                  size={15}
                  className="text-[#B9E8D0]"
                />

              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5">

                <span className="text-xs text-white/60">
                  Financial health
                </span>

                <CheckCircle2
                  size={15}
                  className="text-[#B9E8D0]"
                />

              </div>

            </div>

          </section>


          {/* QUICK QUESTIONS */}

          <section>

            <div className="mb-3">

              <h2 className="text-sm font-bold text-slate-900">
                Ask Finova
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Start with one of these questions.
              </p>

            </div>

            <div className="space-y-3">

              {quickPrompts.map((item) => (

                <QuickPrompt
                  key={item.title}
                  item={item}
                  onClick={() =>
                    sendMessage(item.prompt)
                  }
                />

              ))}

            </div>

          </section>


          {/* PRIVACY */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Clock3 size={17} />
              </div>

              <div>

                <h3 className="text-sm font-bold text-slate-900">
                  Context matters
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Finova considers your recent financial context
                  instead of giving generic recommendations.
                </p>

              </div>

            </div>

          </section>

        </aside>

      </div>


      {/* INSIGHTS */}

      <section className="mt-8">

        <div className="mb-5 flex items-end justify-between">

          <div>

            <div className="flex items-center gap-2">

              <Lightbulb
                size={18}
                className="text-[#123C35]"
              />

              <h2 className="text-xl font-bold text-slate-900">
                What Finova noticed
              </h2>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Proactive insights from your financial activity.
            </p>

          </div>

          <button className="hidden items-center gap-1 text-xs font-semibold text-[#123C35] sm:flex">

            View all

            <ArrowRight size={14} />

          </button>

        </div>


        <div className="grid gap-4 md:grid-cols-3">

          {insights.map((insight) => (

            <InsightCard
              key={insight.title}
              insight={insight}
            />

          ))}

        </div>

      </section>


      {/* DECISION CTA */}

      <section className="mt-8 rounded-3xl border border-[#CFE9DD] bg-[#F0FAF5] p-6 lg:p-8">

        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">

          <div>

            <div className="flex items-center gap-2 text-[#123C35]">

              <MessageCircle size={18} />

              <span className="text-xs font-bold uppercase tracking-wider">
                Decision support
              </span>

            </div>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              Have a financial decision coming up?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Ask Finova before you commit. We can compare the
              cost, risk, goal impact, and alternatives.
            </p>

          </div>


          <button
            onClick={() =>
              sendMessage(
                "I have a financial decision coming up. Help me evaluate it."
              )
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-[#123C35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d302a]"
          >
            Start a Decision

            <ArrowRight size={17} />

          </button>

        </div>

      </section>


      {/* DISCLAIMER */}

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">

        <X
          size={15}
          className="mt-0.5 shrink-0 text-slate-400"
        />

        <p className="text-[11px] leading-5 text-slate-400">
          AI-generated insights are intended for educational and
          decision-support purposes. Users should independently
          verify important financial information before making
          financial decisions.
        </p>

      </div>

    </div>
  );
}