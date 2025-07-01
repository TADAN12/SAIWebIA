import { useState,useEffect,useRef } from "react";
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

export default function Results({ prevAnswers , id }) {
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const hasFetched = useRef(false);

    useEffect(() => {
        // Reset counts to avoid accumulation if `prevAnswers` changes.
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        let correct = 0;
        prevAnswers.forEach(element => {
            if (element.answer === element.correctAnswer) {
                setCorrectAnswers(prev => prev + 1);
                correct++;
            } else {
                setIncorrectAnswers(prev => prev + 1);
            }
        });

        let score = correct * 10 / prevAnswers.length;
        console.log("Score:")
        console.log(score);
        if (hasFetched.current) return;
        hasFetched.current = true;
        saveAnswers(id,prevAnswers,score);

    }, [prevAnswers]);

    return (
        <>
            <div className="text-center">
                <strong>Resultados finales</strong>
            </div>
            <div className="h-[400px] rounded-lg p-2 my-2 flex flex-col flex-nowrap overflow-auto border-2">
                {
                    prevAnswers.map((quizAnswer, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="border-2 border-black"></div>
                            <strong>Pregunta {index + 1}</strong>
                            <p>{quizAnswer.question}</p>
                            <p>Respuesta correcta: <strong>{quizAnswer.correctAnswer}</strong></p>
                            <p>Respuesta seleccionada:
                                <strong className={quizAnswer.answer === quizAnswer.correctAnswer ? "text-green-500" : "text-red-500"}>
                                    {quizAnswer.answer === "" ? "No se seleccionó respuesta" : quizAnswer.answer}
                                </strong>
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-between">
                <strong>Correctas: {correctAnswers}</strong>
                <strong> {correctAnswers * 10 / prevAnswers.length} </strong>
                <strong>Incorrectas: {incorrectAnswers}</strong>
            </div>
        </>
    );
}

function saveAnswers(id,answers,score) {
   console.log(id)
    fetch(`/api/quiz/saveQuizAnswered/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        answers: answers ,
        score: score ,
      })
    }).then(res=>{
        return res.json()
    }).then(data=>{
        if(data.error) throw new Error(data.error)
        console.log(data.message);
    })
  
  }