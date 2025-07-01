'use client'

import React, { useState, useRef, useEffect } from 'react';
import QuizMenu from '../components/examen/examenCrear/QuizMenu';
import ModuleQuiz from "../components/examen/quizTypes/ModuleQuiz";


export default function Page() {

  const [isGenerateQuiz, setIsGenerateQuiz] = useState(false);
  const [text, setText] = useState("");
  const [quizAI, setQuizAI] = useState('');
  const [quizTitle, setQuizTitle] = useState("");
  const quiz = useRef([]);

  useEffect(()=>{
    console.log(quizTitle)
  },[quizTitle])

  return (
    <>
      {
        !isGenerateQuiz ?
          <QuizMenu setGenerateQuiz={setIsGenerateQuiz} setQuizAI={setQuizAI}  quiz={quiz} text={text} setQuizTitle={setQuizTitle} setText={setText}></QuizMenu> :
          <ModuleQuiz typeOfQuiz={"end"} text={text} quizAI={quizAI} title={quizTitle}  ></ModuleQuiz>
      }
    </>
  )
}

