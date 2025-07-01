'use client'

import React, { useEffect, useRef, useState } from 'react';
import {gatewayHost,gatewayPort} from "../../../gateway.js"

import { TabPanel } from '../../components/examen/dashboardExamenes/TablePanel';
import { BookOpen, GraduationCap } from 'lucide-react';
import { SolvedQuizzes } from '../../components/examen/dashboardExamenes/SolvedQuizzes';
import { CreatedQuizzes } from '../../components/examen/dashboardExamenes/CreatedQuizzes';

import { SearchBar } from '../../components/examen/SearchBar';
import { ArrowLeft } from 'lucide-react';

export default function Page() {

  const [activeTab, setActiveTab] = useState('Created');
  const [mockExams, setMockExams] = useState([]);
  const [mockQuizzes, setMockQuizzes] = useState([]);

  useEffect(() => {

    async function getQuiz() {
      try {
        console.log("Before fetch")

        const [answered, created] = await Promise.all([
          fetch(`/api/quiz/getQuizzesAnswered`, { credentials: "include" }),
          fetch(`/api/quiz/getQuizzes`, { credentials: "include" })
        ]);
        
        console.log("After fetch")
        console.log(await answered.json())
        // Parse JSON data for both responses
        const answer = await answered.json();
        const create = await created.json();

        console.log("Quizzes")
        console.log(answer)

        setMockQuizzes(answer);
        setMockExams(create);

      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    }

    // Fetch data and handle it properly
    console.log("Buscar quizzes")
    getQuiz(mockQuizzes, mockExams);

  }, []);

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Learning Dashboard</h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex space-x-6 border-b">
            <button
              onClick={() => setActiveTab('Created')}
              className={`flex items-center pb-4 px-2 border-b-2 font-medium ${activeTab === 'exams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <GraduationCap className="h-5 w-5 mr-2" />
              My Exams
            </button>
            <button
              onClick={() => setActiveTab('Solved')}
              className={`flex items-center pb-4 px-2 border-b-2 font-medium ${activeTab === 'quizzes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Completed Quizzes
            </button>
          </div>

          <TabPanel active={activeTab === 'Created'}>
            <CreatedQuizzes exams={mockExams} />
          </TabPanel>

          <TabPanel active={activeTab === 'Solved'}>
            <SolvedQuizzesP quizzes={mockQuizzes} />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

function SolvedQuizzesP({ quizzes }) {
  const [isQuizSelected, setIsQuizSelected] = useState(false);
  const [idQuiz,setIdQuiz] = useState();
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  const [quizSearch, setQuizSearch] = useState('');
  const answers = useRef();

  useEffect(() => {

    let tmpFilteredQuizzes = quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(quizSearch.toLowerCase())
    );
    setFilteredQuizzes(tmpFilteredQuizzes);

  }, [quizSearch, quizzes]);

  return (
    <>
      {
        isQuizSelected ?
          <>
            <button onClick={() => { setIsQuizSelected(false) }}> <ArrowLeft /> </button>
            <SolvedQuizzes id_quiz={idQuiz} />
          </>
          :
          <>
            <div className="mb-6">
              <SearchBar
                placeholder="Search completed quizzes..."
                value={quizSearch}
                onChange={setQuizSearch}
              />
            </div>
            < div className="grid gap-4" >
              {
                filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz.id_quiz}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    onClick={() => { setIsQuizSelected(true); setIdQuiz(quiz.id_quiz); }}
                  >
                    <div className="flex justify-between items-start"
                      
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
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
