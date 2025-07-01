import React from 'react';
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

export function TextInput({ setAbstractAI, setAbstractTitle, setIsGenerateAbstract, text, setText }) {
  return (
    <>
      <textarea
        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Enter your text here to generate an abstract..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        onClick={() => sendText(setIsGenerateAbstract, text, setAbstractAI, setAbstractTitle)}
      >
        Generate Abstract
      </button>
    </>
  );
}

async function sendText(setIsGenerateAbstract, text, setAbstractAI,setAbstractTitle) {
  let response = await fetch(`/api/abstract/uploadFileAbstract/1`, {
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
  let { title, abstract } = data;

  console.log("data quiz")
  console.log(abstract)
  setAbstractAI(abstract);
  setAbstractTitle(title); // In sendText function
  setIsGenerateAbstract(true)
}