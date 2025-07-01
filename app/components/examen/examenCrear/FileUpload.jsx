import React, { ChangeEvent, useRef } from 'react';
import { Upload } from 'lucide-react';
import { send } from 'process';
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

export function FileUpload({ setQuizAI , setQuizTitle,setGenerateQuiz }) {

  const form = useRef();
  const doc = useRef();

  return (
    <>
      <form ref={form} encType="multipart/from-data" >
        <div className="w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">TXT, PDF, DOC or DOCX (MAX. 10MB)</p>
            </div>
            <input
              ref={doc}
              type="file"
              name="fileQuiz"
              className="hidden"
              accept=".txt,.pdf,.doc,.docx"

            />
          </label>
        </div>
        <button
          type='sumbit'
          className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={(e) => { sendFile(e, doc, setQuizAI,setQuizTitle,setGenerateQuiz) }}
        >
          Generate Quiz
        </button>
      </form>
    </>
  );

}

async function sendFile(event,doc,setQuizAI,setQuizTitle,setGenerateQuiz) {

  event.preventDefault();

  let formData = new FormData();

  formData.append("file", doc.current.files[0])

  let response = await fetch(`/api/quiz/uploadFileQuiz`, {

    method: "POST",
    credentials: 'include',
    body: formData,

  })

  let data = await response.json();

  if (data.error) return console.log({ error: "Error " + data.error })
  let { title, quiz } = data;
  setQuizAI(quiz);
  setQuizTitle(title.title); // In sendText function
  setGenerateQuiz(true)

}