"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Results from "./Results";

export default function QuizOnEnd({ quizProp, id ,quizTMP}) {
  const [isFinish, setIsFinish] = useState(false);
  const prevAnswers = useRef([]);

  useEffect(()=>{
    console.log(id)
    console.log(quizProp)
  },[])

  if(!quizProp){
    return (
      <>
        <strong>Cargando...</strong>
      </>
    )
  }

  return (
    <div className="flex flex-row m-auto bg-white p-4  md:min-w-[500px] rounded-xl">
      <div className="p-4">
        <h1 className="">Tema</h1>
        {isFinish ?
          <Results prevAnswers={prevAnswers.current} id={id} />
          :
          <Quiz setIsFinish={setIsFinish} quiz={quizProp} prevAnswers={prevAnswers}  />
        }
      </div>
    </div>
  );
}
function Quiz({ setIsFinish, quiz, prevAnswers }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [indexQ, setIndexQ] = useState(0);

  function handleLeftClick() {
    if (indexQ > 0) {
      setIndexQ((prev) => prev - 1);
      setSelectedAnswer(""); // Reset selected answer
    }
  }

  function handleRightClick() {
    if (indexQ < quiz.length - 1) {

      setIndexQ((prev) => prev + 1);
      setSelectedAnswer(""); // Reset selected answer
    }
  }

  useEffect(() => {
    // Initialize answers only on the first render or when quiz changes
    console.log(quiz[indexQ])
    if (quiz && prevAnswers.current.length === 0) {
      prevAnswers.current = quiz.map((element) => ({
        question: element.question,
        answer: "",
        correctAnswer: element.correctAnswer,
      }));

    }
  }, [quiz]);

  useEffect(() => {
    // Set the selected answer based on current question's saved answer
    if (prevAnswers.current[indexQ]?.answer) {
      setSelectedAnswer(prevAnswers.current[indexQ].answer);
    }
  }, [indexQ, prevAnswers]);

  function checkAnswer(option) {
    return option === selectedAnswer
      ? "block w-full p-1 rounded-md hover:bg-black hover:text-white border-2 border-black my-2"
      : "block w-full p-1 rounded-md bg-white text-black hover:bg-black hover:text-white my-2";
  }

  return (
    <>
      <div className="flex flex-row justify-between min-w-[500px] " >
        <button className="hover:bg-gray-600 rounded-md my-auto mx-2" onClick={handleLeftClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="p-2 w-[100%] rounded-lg my-2 bg-white  ">
          <strong className="block mx-auto text-center">{quiz[indexQ].question}</strong>
          <aside className="my-5">
            {quiz[indexQ].options.map((option, idx) => {
              return <button
                key={idx}
                className={checkAnswer(option)}
                onClick={() => {
                  prevAnswers.current[indexQ].answer = option;
                  setSelectedAnswer(option);
                }}
              >
                {option}
              </button>
            })}
          </aside>
        </div>
        <button className="mx-2 my-auto hover:bg-gray-600 rounded-md" onClick={handleRightClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex flex-row justify-center">
        <button className="p-1 bg-gray-200 hover:bg-gray-600 border-[2px] rounded-md" onClick={() => setIsFinish(true)}>
          Terminar
        </button>
      </div>
    </>
  );
}
