import { FileText, Upload, FilePlus } from 'lucide-react';
import { FileUpload } from "./FileUpload";
import { TextInput } from "./TextInput";
import CrearExamen from './CrearExamen';
import { useState } from 'react';

export default function QuizMenu({ setGenerateQuiz, setQuizAI, quiz, setQuizTitle, text, setText }) {

    const [activeSection, setActiveSection] = useState('text');

    return (
        <div className="min-h-full w-[100%] bg-gray-100 py-8 px-4  sm:px-6 lg:px-8">

            <div className="max-w-3xl mx-auto  ">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                        <h1 className="text-2xl font-bold text-white">Quiz Generator</h1>
                        <p className="text-blue-100 mt-1">
                            Upload text or a file to generate your quiz
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveSection('text')}
                                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${activeSection === 'text'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <FileText className="w-5 h-5 inline-block mr-2" />
                                Enter Text
                            </button>
                            <button
                                onClick={() => setActiveSection('file')}
                                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${activeSection === 'file'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Upload className="w-5 h-5 inline-block mr-2" />
                                Upload File
                            </button>
                            <button
                                onClick={() => setActiveSection('create')}
                                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${activeSection === 'create'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <FilePlus className="w-5 h-5 inline-block mr-2" />
                                Create Quiz
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 h-[100%] w-[100%] bg-purple-500 ">
                        {activeSection === 'text' ? (
                            <TextInput setQuizAI={setQuizAI} setQuizTitle={setQuizTitle} setGenerateQuiz={setGenerateQuiz} text={text} setText={setText} />
                        ) : null}
                        {activeSection === 'file' ? (
                            <FileUpload setQuizAI={setQuizAI} setQuizTitle={setQuizTitle} setGenerateQuiz={setGenerateQuiz} />
                        ) : null}
                        {activeSection === 'create' ? (
                            <CrearExamen quiz={quiz} ></CrearExamen>
                        ) : null}

                    </div>
                </div>
            </div>
        </div>
    );
}

