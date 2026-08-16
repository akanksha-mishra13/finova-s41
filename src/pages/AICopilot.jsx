import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUp,
  Bot,
  Sparkles,
  User,
  RotateCcw,
} from "lucide-react";

import {
  createFinovaChat,
  askFinova,
} from "../services/gemini";


function AICopilot() {

  const chatRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi! I'm Finova AI. Ask me anything about budgeting, saving, financial health, credit, goals, or everyday financial decisions.",
    },
  ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ============================================
  // CREATE CHAT SESSION
  // ============================================

  useEffect(() => {

    try {

      chatRef.current =
        createFinovaChat();

      console.log(
        "Finova AI chat initialized."
      );

    } catch (error) {

      console.error(
        "Failed to initialize Finova AI:",
        error
      );

    }

  }, []);


  // ============================================
  // SEND MESSAGE
  // ============================================

  const handleSend = async () => {

    const question =
      input.trim();


    if (
      !question ||
      loading
    ) {
      return;
    }


    // ------------------------------------------
    // SHOW USER MESSAGE
    // ------------------------------------------

    setMessages((previous) => [
      ...previous,

      {
        role: "user",
        text: question,
      },
    ]);


    setInput("");

    setLoading(true);


    try {

      // ----------------------------------------
      // MAKE SURE CHAT EXISTS
      // ----------------------------------------

      if (!chatRef.current) {

        chatRef.current =
          createFinovaChat();

      }


      // ----------------------------------------
      // ASK GEMINI
      // ----------------------------------------

      const answer =
        await askFinova(
          chatRef.current,
          question
        );


      // ----------------------------------------
      // SHOW AI RESPONSE
      // ----------------------------------------

      setMessages((previous) => [
        ...previous,

        {
          role: "assistant",
          text: answer,
        },
      ]);

    } catch (error) {

      console.error(
        "Gemini error:",
        error
      );


      let errorMessage =
        "Something went wrong while contacting Finova AI. Please try again.";


      // ----------------------------------------
      // FRIENDLY ERROR MESSAGES
      // ----------------------------------------

      if (
        error?.message?.includes(
          "api-not-enabled"
        )
      ) {

        errorMessage =
          "Finova AI is not fully enabled in the Firebase project yet. Please check Firebase AI Logic configuration.";

      }


      if (
        error?.message?.includes(
          "permission"
        )
      ) {

        errorMessage =
          "Finova AI does not currently have permission to access the Gemini API. Please check your Firebase configuration.";

      }


      if (
        error?.message?.includes(
          "quota"
        )
      ) {

        errorMessage =
          "Finova AI has temporarily reached its usage limit. Please try again later.";

      }


      setMessages((previous) => [
        ...previous,

        {
          role: "assistant",
          text: errorMessage,
          error: true,
        },
      ]);

    } finally {

      setLoading(false);

    }

  };


  // ============================================
  // ENTER KEY
  // ============================================

  const handleKeyDown =
    (event) => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        handleSend();

      }

    };


  // ============================================
  // RESET CHAT
  // ============================================

  const resetChat = () => {

    chatRef.current =
      createFinovaChat();


    setMessages([
      {
        role: "assistant",
        text:
          "Hi! I'm Finova AI. Ask me anything about budgeting, saving, financial health, credit, goals, or everyday financial decisions.",
      },
    ]);

  };


  // ============================================
  // UI
  // ============================================

  return (

    <div className="min-h-screen">


      {/* ======================================
          HEADER
      ======================================= */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123C35] text-white">

              <Sparkles size={19} />

            </div>


            <div>

              <h1 className="text-2xl font-bold text-[#123C35]">
                AI Copilot
              </h1>

              <p className="text-sm text-slate-500">
                Your personal financial intelligence assistant
              </p>

            </div>

          </div>

        </div>


        <button
          type="button"
          onClick={resetChat}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >

          <RotateCcw size={16} />

          New chat

        </button>

      </div>


      {/* ======================================
          CHAT CONTAINER
      ======================================= */}

      <div className="mt-6 overflow-hidden rounded-3xl border border-[#DCE5E1] bg-white shadow-sm">


        {/* AI STATUS */}

        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF4EF]">

            <Bot
              size={18}
              className="text-[#123C35]"
            />

          </div>


          <div>

            <p className="text-sm font-semibold text-[#123C35]">
              Finova AI
            </p>

            <p className="text-xs text-slate-500">
              Gemini-powered financial assistant
            </p>

          </div>


          <div className="ml-auto flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-xs text-slate-500">
              Online
            </span>

          </div>

        </div>


        {/* ====================================
            MESSAGES
        ===================================== */}

        <div className="h-[520px] overflow-y-auto bg-[#F8FAF9] p-6">

          {messages.map(
            (message, index) => (

              <div
                key={index}
                className={`mb-5 flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`flex max-w-[80%] gap-3 ${
                    message.role === "user"
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >

                  {/* AVATAR */}

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      message.role === "user"
                        ? "bg-[#123C35] text-white"
                        : "bg-[#DDEDE5] text-[#123C35]"
                    }`}
                  >

                    {message.role === "user" ? (
                      <User size={17} />
                    ) : (
                      <Bot size={17} />
                    )}

                  </div>


                  {/* MESSAGE */}

                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "rounded-tr-sm bg-[#123C35] text-white"
                        : "rounded-tl-sm border border-slate-200 bg-white text-slate-700"
                    }`}
                  >

                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {message.text}
                    </p>

                  </div>

                </div>

              </div>

            )
          )}


          {/* LOADING */}

          {loading && (

            <div className="mb-5 flex justify-start">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DDEDE5]">

                  <Bot size={17} />

                </div>


                <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-5 py-4">

                  <div className="flex gap-1">

                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{
                        animationDelay:
                          "150ms",
                      }}
                    />

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{
                        animationDelay:
                          "300ms",
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>


        {/* ====================================
            INPUT
        ===================================== */}

        <div className="border-t border-slate-100 bg-white p-4">

          <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-[#F8FAF9] p-2">

            <textarea
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              disabled={loading}
              rows={1}
              placeholder="Ask Finova anything..."
              className="max-h-32 min-h-[44px] flex-1 resize-none border-0 bg-transparent px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />


            <button
              type="button"
              onClick={handleSend}
              disabled={
                loading ||
                !input.trim()
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123C35] text-white transition hover:bg-[#0E302B] disabled:cursor-not-allowed disabled:opacity-40"
            >

              <ArrowUp size={19} />

            </button>

          </div>


          <p className="mt-3 text-center text-xs text-slate-400">

            Finova AI can make mistakes.
            Verify important financial information.

          </p>

        </div>

      </div>


      {/* ======================================
          SUGGESTIONS
      ======================================= */}

      <div className="mt-5">

        <p className="mb-3 text-sm font-semibold text-[#123C35]">
          Try asking
        </p>


        <div className="flex flex-wrap gap-2">

          {[
            "How can I save more money?",
            "How much should I keep as an emergency fund?",
            "How can I improve my credit score?",
            "Help me create a monthly budget",
            "What is compound interest?",
            "Should I pay off my debt first?",
          ].map(
            (question) => (

              <button
                key={question}
                type="button"
                onClick={() =>
                  setInput(question)
                }
                className="rounded-xl border border-[#DCE5E1] bg-white px-4 py-2.5 text-sm text-slate-600 transition hover:border-[#123C35] hover:text-[#123C35]"
              >

                {question}

              </button>

            )
          )}

        </div>

      </div>

    </div>
  );
}


export default AICopilot;