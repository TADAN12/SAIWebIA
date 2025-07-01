"use client"
import { useEffect, useRef, useState } from "react";
import { Trash2Icon } from "lucide-react";
//import "./WorkSpace/common.css"
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

function AddQuestion({ setStatusQuiz, quiz }) {
    const [answers, setAnswers] = useState([""]);
    const question = useRef();
    const correctAnswer = useRef();

    function handleOnClickAdd(event) {
        event.preventDefault();
        setAnswers((prevAnswers) => [...prevAnswers, ""]);
    }

    function handleOnClickDelete(event) {
        if (answers.length === 1) return;
        event.preventDefault();
        setAnswers((prevAnswers) => prevAnswers.slice(0, -1));
    }

    function handleOnClickAddQuestion(event) {
        event.preventDefault();
        quiz.current.push({
            question: question.current.value,
            options: answers,
            correctAnswer: correctAnswer.current.value,
        });
        question.current.value = "";
        correctAnswer.current.value = "";
        setAnswers([""]);
        console.log(quiz.current);
    }

    return (
        <div className="border-2 border-gray-300 bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">Crear Nueva Pregunta</h1>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className="space-y-6">
                        <div>
                            <label className="block font-semibold mb-2">Pregunta:</label>
                            <input
                                ref={question}
                                type="text"
                                placeholder="Escribe la pregunta aquí..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Respuesta correcta:</label>
                            <input
                                ref={correctAnswer}
                                type="text"
                                placeholder="Escribe la respuesta correcta..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                                onClick={handleOnClickAddQuestion}
                            >
                                Agregar Pregunta
                            </button>
                            <button
                                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded-lg transition"
                                onClick={() => setStatusQuiz("end")}
                            >
                                Revisar Quiz
                            </button>
                        </div>
                    </section>
                    <section className="space-y-4">
                        <label className="block font-semibold">Respuestas:</label>
                        <div className="space-y-2 max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                            {answers.map((element, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={element}
                                    onChange={(e) => {
                                        const newAnswers = [...answers];
                                        newAnswers[index] = e.target.value;
                                        setAnswers(newAnswers);
                                    }}
                                    placeholder={`Respuesta ${index + 1}`}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                />
                            ))}
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                                onClick={handleOnClickAdd}
                            >
                                Agregar Respuesta
                            </button>
                            <button
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                                onClick={handleOnClickDelete}
                            >
                                Eliminar Respuesta
                            </button>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    );
}

function saveQuiz(quiz, title,setStatusQuiz,id) {
    if (title === "") return console.warn("El examen no tiene titulo")
    if (quiz.current.length === 0) return console.warn("El examen no tiene elementos")
    let quizResult = JSON.stringify(quiz.current)

    

    fetch(`/api/quiz/saveQuiz/${id||-1}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            title: title,
            content: quizResult,
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        let { message, last_id } = data;

        if (data.error) throw new Error(data.error);
        console.log(message);
        quiz.current = [];
        setStatusQuiz("create");
    }).catch(error => {
        console.error(error)
    })
}

function ShowQuiz({ id, setIndexQ, setStatusQuiz, quiz,title,setTitle }) {

    useEffect(()=>{
        console.log("show")
        console.log(quiz)
    },[])

    return (
        <div className="h-[50vh] w-full bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg overflow-y-auto">
            <div className="flex flex-row justify-between  ">
                <section>
                    <input  type="text"  placeholder="Titulo examen"  value={title}
                    className="m-2 text-black" onChange={(e)=>{setTitle(e.target.value)}}></input>
                    <h1 className="text-2xl font-bold m-2">Preguntas Añadidas</h1>
                </section>
                <div className="flex justify-between  w-1/3">
                    <button className=" m-auto p-2 bg-green-400 w-10 h-10 rounded-md " onClick={() => setStatusQuiz("create")}>+</button>
                    <button className=" m-auto p-2 bg-blue-600 rounded-md" onClick={() => { saveQuiz(quiz, title,setStatusQuiz,id);  }}>Terminar</button>
                </div>
            </div>
            <div className="space-y-6">
                {quiz.current?.map((element, index) => (
                    <div key={index} className="bg-white text-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <strong className="block text-lg mb-2">Pregunta {index + 1}</strong>
                        <p className="mb-2"><strong>Pregunta:</strong> {element.question}</p>
                        <p className="mb-2"><strong>Respuesta Correcta:</strong> {element.correctAnswer}</p>
                        <div>
                            <strong>Respuestas Alternativas:</strong>
                            <ul className="list-disc list-inside">
                                {element.options.map((answer, i) => (
                                    <li key={i}>{answer}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center mt-4 flex justify-around">
                            <button
                                className="w-[40%] bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                                onClick={() => {
                                    setIndexQ(index);
                                    setStatusQuiz("edit");
                                }}
                            >
                                Editar
                            </button>
                            <button
                                className="w-[40%] bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg transition"
                                onClick={() => {

                                    if (index > -1) {
                                        quiz.current.splice(index, 1);
                                    }
                                    setIndexQ(index);
                                }}
                            >
                                <Trash2Icon className="w-5 h-5 inline-block mr-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function EditQuiz({ indexQ, setStatusQuiz, quiz }) {
    const [answers, setAnswers] = useState(quiz.current[indexQ].options || [""]);
    const [questionInput, setQuestionInput] = useState("");
    const [correctInput, setCorrectInput] = useState("");

    useEffect(() => {
        setQuestionInput(quiz.current[indexQ].question || "");
        setCorrectInput(quiz.current[indexQ].correctAnswer || "");
    }, [indexQ]);

    function handleOnClickAdd(event) {
        event.preventDefault();
        setAnswers((prevAnswers) => [...prevAnswers, ""]);
    }

    function handleOnClickDelete(event) {
        event.preventDefault();
        if (answers.length === 1) return;
        setAnswers((prevAnswers) => prevAnswers.slice(0, -1));
    }

    function handleOnClickAddQuestion() {
        quiz.current[indexQ] = {
            question: questionInput,
            options: answers,
            correctAnswer: correctInput,
        };
        setStatusQuiz("end");
    }
    return (
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Editar Pregunta</h1>
            <form className="space-y-6">
                <div>
                    <label className="block font-semibold mb-2">Pregunta:</label>
                    <input
                        value={questionInput}
                        onChange={(e) => setQuestionInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                        type="text"
                        placeholder="Editar pregunta..."
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Respuesta Correcta:</label>
                    <input
                        value={correctInput}
                        onChange={(e) => setCorrectInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                        type="text"
                        placeholder="Editar respuesta correcta..."
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Respuestas Alternativas:</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                        {answers.map((element, index) => (
                            <input
                                key={index}
                                value={element}
                                onChange={(e) => {
                                    const newAnswers = [...answers];
                                    newAnswers[index] = e.target.value;
                                    setAnswers(newAnswers);
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                                type="text"
                                placeholder={`Editar respuesta ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                            onClick={handleOnClickAdd}
                        >
                            Agregar Respuesta
                        </button>
                        <button
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                            onClick={handleOnClickDelete}
                        >
                            Eliminar Respuesta
                        </button>
                    </div>
                </div>
            </form>
            <div className="text-center mt-6">
                <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                    onClick={handleOnClickAddQuestion}
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
}



export default function CrearExamen({ id,quiz,quizTMP }) {
    const [title,setTitle] = useState("");
    const [indexQ, setIndexQ] = useState(0);
    const [statusQuiz, setStatusQuiz] = useState("end");

    useEffect(()=>{
        console.log("create quiz")
        console.log(quiz.current)
    },[]);

    if(!quizTMP){
        return(
            <>
                <strong>Cargando...</strong>
            </>
        )
    }

    return (
        <div className="flex flex-row w-[100%]  m-auto bg-white p-2  rounded-xl">
            <div className="p-4 h-[80%] w-[100%]">
                {
                    statusQuiz === "create" ? (
                        <AddQuestion setStatusQuiz={setStatusQuiz} quiz={quiz} />
                    ) : statusQuiz === "end" ? (
                        <ShowQuiz id={id} title={title} setTitle={setTitle} setIndexQ={setIndexQ} setStatusQuiz={setStatusQuiz} quiz={quiz} />
                    ) : (
                        <EditQuiz indexQ={indexQ} setStatusQuiz={setStatusQuiz} quiz={quiz} />
                    )
                }
            </div>
        </div>
    );
}
