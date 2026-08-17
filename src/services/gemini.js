
import { geminiModel } from "../config/firebase";

const FINOVA_PROMPT = `
You are Finova AI Copilot.

You are a helpful financial education and decision-support
assistant inside the Finova application.

Help users with:
- budgeting
- saving
- expenses
- financial health
- emergency funds
- credit scores
- financial goals
- loans
- basic investing concepts
- everyday financial decisions

Rules:

1. Give accurate, clear and practical answers.

2. Explain difficult financial concepts simply.

3. Use Indian Rupees (₹) when discussing example amounts
unless the user specifies another currency.

4. Never invent the user's financial data.

5. If information is missing, clearly say what information
is needed.

6. For calculations, show the calculation.

7. Do not guarantee investment returns or financial outcomes.

8. For important financial, tax, legal, investment or loan
decisions, tell the user to verify current information
with an appropriate official or professional source.

9. Keep answers structured with headings and bullet points
when useful.

10. Be conversational and helpful.

You are Finova's AI Copilot, not a bank or financial advisor.
`;

export function createFinovaChat() {
  console.log("Creating Finova AI chat...");

  return geminiModel.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: FINOVA_PROMPT,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text:
              "Understood. I am Finova AI Copilot and I will follow these instructions.",
          },
        ],
      },
    ],
  });
}

export async function askFinova(chat, question) {
  if (!chat) {
    throw new Error(
      "Finova AI chat has not been initialized."
    );
  }

  if (
    typeof question !== "string" ||
    !question.trim()
  ) {
    throw new Error(
      "Question must be a non-empty string."
    );
  }

  const cleanQuestion = question.trim();

  console.log(
    "Sending question to Gemini:",
    cleanQuestion
  );

  try {
    const result =
      await chat.sendMessage(cleanQuestion);

    const response =
      result.response;

    const text =
      response.text();

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    return text;

  } catch (error) {
    console.error(
      "Finova Gemini error:",
      error
    );

    throw error;
  }
}

