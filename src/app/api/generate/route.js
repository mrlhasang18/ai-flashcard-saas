import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const flashcardSystemPrompt = `
  You are a flashcard creator. Your task is to generate flashcards for a variety of subjects.
  Each flashcard should have a question on one side and the answer on the other.
  The questions should be concise and clear.
  The answers should be accurate and concise.
  You can use your knowledge of the subject to generate the flashcards.
  You can also use external resources such as textbooks, articles, and websites to gather information.
  Your goal is to create flashcards that will help students learn and retain new information.
  You should avoid using jargon or technical terms that might be unfamiliar to students.
  You should also avoid using ambiguous or unclear language.
  Only generate 10 flashcards.

  Return the flashcards in the following JSON format:
  {
    "flashcards":[{
        "front": "question",
        "back": "answer"
    }]
  }
`;

const quizSystemPrompt = `
  You are a quiz creator. Your task is to generate quiz questions for a variety of subjects.
  Each quiz question should have a question and four multiple-choice options, with one correct answer.
  The questions should be concise and clear.
  The options should be plausible, with only one clearly correct answer.
  You can use your knowledge of the subject to generate the quiz questions.
  You can also use external resources such as textbooks, articles, and websites to gather information.
  Your goal is to create quiz questions that will help students test their knowledge and learn new information.
  You should avoid using jargon or technical terms that might be unfamiliar to students.
  You should also avoid using ambiguous or unclear language.
  Generate 10 quiz questions.

  Return the quiz questions in the following JSON format:
  {
    "questions":[{
        "question": "What is the question?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A"
    }]
  }
`;

export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { content, type } = await req.json();
    const systemPrompt = type === 'quiz' ? quizSystemPrompt : flashcardSystemPrompt;
    const prompt = systemPrompt + "\n\nContent to create " + type + " from:\n" + content;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let parsedContent;
    try {
      parsedContent = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON:", text);
      return new NextResponse(JSON.stringify({ error: "Failed to parse response from AI" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json(type === 'quiz' ? parsedContent.questions : parsedContent.flashcards);
  } catch (error) {
    console.error("API route error:", error);
    return new NextResponse(JSON.stringify({ error: error.message, stack: error.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}