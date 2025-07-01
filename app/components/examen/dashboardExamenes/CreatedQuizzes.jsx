import React, { useEffect, useRef, useState } from 'react';
import { Clock, Users, Edit, ArrowLeft } from 'lucide-react';
import { SearchBar } from '../SearchBar';
import CrearExamen from '../examenCrear/CrearExamen';
import QuizOnEnd from '../quizTypes/QuizOnEnd';
import { RotateCcw } from 'lucide-react';
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

export function CreatedQuizzes({ exams }) {

  const [isQuizSelected, setIsQuizSelected] = useState()
  const [filteredExams, setFilteredExams] = useState(exams);
  const [examSearch, setExamSearch] = useState('');
  const [id, setId] = useState(null);
  const [quizTMP,setQuizTMP] = useState(false) // this state need to be replaced instead quiz REF to managge properly the state
  const quiz = useRef();
  const [isRetryingQuiz, setIsRetryingQuiz] = useState(false)

  useEffect(() => {
    let tmpFilteredExams = exams?.filter(exam =>
      exam.title.toLowerCase().includes(examSearch.toLowerCase())
    );

    setFilteredExams(tmpFilteredExams)

  }, [examSearch, exams])

  if (isRetryingQuiz) {
    return (
      <>
        <QuizOnEnd quizProp={quiz.current} id={id} quizTMP={quizTMP} ></QuizOnEnd>
      </>
    )
  }

  return (
    <>
      {
        isQuizSelected ?
          <>
            <button onClick={() => { setIsQuizSelected(false) }}> <ArrowLeft /> </button>
            <CrearExamen quiz={quiz} id={id} quizTMP={quizTMP}></CrearExamen>
          </>
          :
          <>
            <div className="mb-6">
              <SearchBar
                placeholder="Search your exams..."
                value={examSearch}
                onChange={setExamSearch}
              />
            </div>

            <div className="grid gap-4">
              {filteredExams?.map((exam) => (
                <div
                  key={exam.id_quiz}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{exam?.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{exam?.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => { getQuiz(exam.id_quiz, quiz,setQuizTMP); setIsQuizSelected(true); setId(exam.id_quiz) }}
                    >
                      <Edit className="h-5 w-5 text-gray-600" />
                    </button>
                    <button onClick={() => { getQuiz(exam.id_quiz, quiz,setQuizTMP); setId(exam.id_quiz); setIsRetryingQuiz(true) }}>
                      <RotateCcw></RotateCcw>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
      }
    </>
  );
}

async function getQuiz(id, quiz,setQuizTMP) {
  console.log("ID:",id)
  let response = await fetch(`/api/quiz/getQuiz/${id}`, { credentials: "include" })
  let data = await response.json();
  console.log("quiz")
  console.log(data)
  console.log(data.content[0].quiz_content)
  if (data.error) return console.error(data.error)
  quiz.current = data.content[0].quiz_content;
  setQuizTMP(true);
}
