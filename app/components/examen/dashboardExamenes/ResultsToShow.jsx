import { useState,useEffect,useRef } from "react";

export default function ResultsToShow({ prevAnswers }) {
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);


    useEffect(() => {
        // Reset counts to avoid accumulation if `prevAnswers` changes.
        setCorrectAnswers(0);
        setIncorrectAnswers(0);

        prevAnswers.forEach(element => {
            if (element.answer === element.correctAnswer) {
                setCorrectAnswers(prev => prev + 1);
            } else {
                setIncorrectAnswers(prev => prev + 1);
            }
        });

    }, [prevAnswers]);

    return (
        <>
            <div className="text-center">
                <strong>Resultados finales</strong>
            </div>
            <div className="h-[45vh] rounded-lg p-2 my-2 flex flex-col flex-nowrap overflow-auto border-2">
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

