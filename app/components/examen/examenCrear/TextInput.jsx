import React from 'react';
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

export function TextInput({ setQuizAI, setQuizTitle, setGenerateQuiz, text, setText }) {
  return (
    <>
      <textarea
        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Enter your text here to generate a quiz..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        onClick={() => sendText(setGenerateQuiz, text, setQuizAI, setQuizTitle)}
      >
        Generate Quiz
      </button>
    </>
  );
}

async function sendText(setGenerateQuiz, text, setQuizAI,setQuizTitle) {
  console.log(text)
  let response = await fetch(`/api/quiz/uploadFileQuiz`, {
    method: "POST",
    credentials: 'include',
    body: JSON.stringify({
      content: text
    }),
    headers: {
      "Content-Type": "application/json",
    },

  })

  let data = await response.json();

  if (data.error) return console.log({ error: "Error " + data.error })
  let { title, quiz } = data;

  console.log("data quiz")
  console.log(quiz)
  setQuizAI(quiz);
  setQuizTitle(title.title); // In sendText function
  setGenerateQuiz(true)
}