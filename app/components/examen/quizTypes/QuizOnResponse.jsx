"use client"

import Results from "./Results";
import { useCallback, useEffect, useRef, useState } from "react"

function Quiz({ setIsFinish, quiz, prevAnswers }) {

    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(0);
    const [indexQ, setIndexQ] = useState(0);
    const [isDisable, setIsDisable] = useState(false);

    const handleVerifyOnClick = () => {
        prevAnswers.current[indexQ].answer = selectedAnswer;
        setIsDisable(true);
        setIsAnswered(true);
        if (selectedAnswer === quiz[indexQ].correctAnswer) {
            setIsCorrect(1);
        }
        else setIsCorrect(-1)
    }
    const background = useRef("bg-white");

    function handleLeftClick() {
        if (indexQ === 0) return
        setIndexQ(prev => prev - 1)
        setSelectedAnswer("")
    }

    function handleRightClick() {
        if (indexQ === quiz.length - 1) return
        if (!isAnswered) {
            alert("Debes berificar primero la pregunta o se tomara como no respondida")
        }
        setIndexQ(prev => prev + 1)
        setSelectedAnswer("")
    }

    useEffect(() => {
        console.log("Onresponse")
        prevAnswers.current = quiz.map(element => {
            return {
                question: element.question,
                answer: "",
                correctAnswer: element.correctAnswer,
            };
        });


    }, [])

    useEffect(() => {
        if (prevAnswers.current[indexQ].answer === "") {
            setIsDisable(false);
            setIsAnswered(false);
        } else {
            setSelectedAnswer(prevAnswers.current[indexQ].answer);
            setIsDisable(true);
            setIsAnswered(true);
            if (selectedAnswer === quiz[indexQ].correctAnswer) {
                setIsCorrect(1);
            }
            else setIsCorrect(-1)
        }
    }, [indexQ])

    useEffect(() => {

        if (isCorrect === 1) background.current = "bg-green-200";
        if (isCorrect === -1) background.current = "bg-red-200";

    }, [isCorrect])

    function checkAnswer(answer) { //compara con cada opcion la opcion correcta y la seleccionada para determinar que opcion pintar y cual no
        if (isAnswered) {
            if (answer === quiz[indexQ].correctAnswer) {//valida que la respuesta correcta se pinte de verde

                return ("block w-full p-1 rounded-md bg-green-400 text-black my-2");
            }
            if (answer === selectedAnswer) {  // valida que solo la respuesa selccionada sea la que se pinte de rojo

                return ("block w-full p-1 rounded-md bg-red-400 text-black my-2"); // para todos los casos en donde no se seleccione o no sea la respuesta correcta
            }
            return ("block w-full p-1 rounded-md bg-white text-black  hover:bg-black hover:text-white my-2");
        } else {
            if (answer === selectedAnswer) {  // solo la respuesta seleccionada sera la colocara un borde para identificarla
                return ("block w-full p-1 rounded-md border-black border-2 my-2");
            }
            return ("  block w-full p-1 rounded-md disabled hover:bg-black hover:text-white my-2");
        }

    }

    return (
        <>

            <div className="flex flex-row justify-between">
                <div className=" flex justify-center ">
                    <button className=" hover:bg-gray-600 rounded-md my-auto mx-2" onClick={handleLeftClick} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
                <div className={` p-2  w-[100%] rounded-lg  my-2 ${isAnswered ? (selectedAnswer === quiz[indexQ].correctAnswer ? "bg-green-200" : "bg-red-200") : "bg-white"}`}>

                    <strong> {quiz[indexQ].question} </strong>|
                    <aside className="my-5">
                        {
                            quiz[indexQ].options.map((option,index) => {
                                return (
                                    <button key={index} className={checkAnswer(option)}
                                        disabled={isDisable}
                                        onClick={() => { setSelectedAnswer(option) }}
                                    >
                                        {option}
                                    </button>)
                            })
                        }
                    </aside>

                </div>
                <div className=" flex justify-center  ">
                    <button className="mx-2 my-auto hover:bg-gray-600 rounded-md" onClick={handleRightClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                </div>
            </div>
            <div className="flex flex-row justify-between">
                <button className="p-1 bg-gray-200 hover:bg-gray-600 border-[2px] rounded-md"
                    onClick={() => handleVerifyOnClick()}
                >
                    Verificar
                </button>
                <button className="p-1 bg-gray-200 hover:bg-gray-600 border-[2px] rounded-md"
                    onClick={() => setIsFinish(true)}
                >
                    Terminar
                </button>
            </div>
        </>
    )
}


export default function QuizOnResponse({quizProp}) {
    let quiz = quizProp;
    const [isFinish, setIsFinish] = useState(false);
    const prevAnswers = useRef([]);

    useEffect(()=>{
        console.log("Quiz on response")
    },[])

    return (
        <>
            <div className="flex flex-row m-auto bg-white p-4 min-w-[200px]  rounded-xl">

                <div className="p-4">

                    <h1 className="">Tema</h1>
                    {
                        isFinish ?
                            <Results prevAnswers={prevAnswers.current}></Results>
                            :
                            <Quiz setIsFinish={setIsFinish} quiz={quiz} prevAnswers={prevAnswers}></Quiz>
                    }

                </div>

            </div>
        </>
    )
}