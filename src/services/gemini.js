// src/services/gemini.js

import { geminiModel } from "../config/firebase";


// ============================================
// FINOVA AI SYSTEM PROMPT
// ============================================

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


// ============================================
// CREATE CHAT
// ============================================

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


// ============================================
// ASK FINOVA
// ============================================

export async function askFinova(chat, question) {

  // Make sure the chat exists
  if (!chat) {
    throw new Error(
      "Finova AI chat has not been initialized."
    );
  }

  // Make sure question is actually a string
  if (
    typeof question !== "string" ||
    !question.trim()
  ) {
    throw new Error(
      "Question must be a non-empty string."
    );
  }

  console.log(
    "Sending question to Gemini:",
    question
  );


  // Send message through the existing chat
  const result =
    await chat.sendMessage(
      question.trim()
    );


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
}