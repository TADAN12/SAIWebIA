import React, { useEffect, useState, useRef } from 'react';
import { Clock, Award, Calendar, ArrowLeft } from 'lucide-react';
import ResultsToShow from './ResultsToShow';
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

export function SolvedQuizzes({ id_quiz }) {

  const [isQuizSelected, setIsQuizSelected] = useState()
  const answers = useRef();
  const [quizzes,setQuizzes] = useState([]);
  
  useEffect(()=>{

    async function getQuizzes(){
      console.log(id_quiz)
      let response = await fetch(`/api/quiz/getQuizzesAnsweredByQuiz/${id_quiz}`,{
        method:"GET",
        credentials:"include"
      })
      let data = await response.json();
      if(data.error) return console.log(data);
      console.log("data")
      console.log(data)
      setQuizzes(data);
    }
    getQuizzes();

  },[])

  return (
    <>
      {
        isQuizSelected ?
          <>
            <button onClick={() => { setIsQuizSelected(false) }}> <ArrowLeft /> </button>
            <ResultsToShow prevAnswers={answers.current} ></ResultsToShow>
          </>
          :
          <>
            < div className="grid gap-4" >
              {
                quizzes.map((quiz) => (
                  <div
                    key={quiz.id_userQuiz}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    onClick={() => { getQuiz(quiz.id_userQuiz, setIsQuizSelected, answers); }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Completed: {quiz.date_time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{quiz.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Award className="h-4 w-4 mr-2" />
                            <span>Score: {quiz.score}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div >
          </>
      }
    </>

  );
}

async function getQuiz(id, setIsQuizSelected, answers) {

  let response = await fetch(`/api/quiz/getQuizAnswers/${id}`, { credentials: "include" })
  let data = await response.json();
  if (data.error) return console.error(data)
  answers.current = data[0].answers;
  setIsQuizSelected(true);

}