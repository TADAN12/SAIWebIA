import QuizOnEnd from "./QuizOnEnd";
import QuizOnResponse from "./QuizOnResponse";
import { lazy, Suspense, useEffect, useState, useRef } from "react";
import quizAI from "../../../lib/quizAI";
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

export default function ModuleQuizContent({ typeOfQuiz, quizID, idx }) {
    const [quiz, setQuiz] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {

        if (hasFetched.current) return;
        hasFetched.current = true;

        async function fetchQuizContent() {
            if (!quizID) {
                try {
                    let titlesTmp = [];
                    let contentForQuiz = "";

                    // Fetch titles
                    const titlesResponse = await fetch(`/api/contenido/getTitulos/1/s`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });

                    const titlesData = await titlesResponse.json();
                    if(titlesData.error) console.log(titlesData);
                    // Se obtienen los titulos para pasarlos a la iteracion que agrega los examenes
                    for (let i = idx - 1; i >= 0; i--) { // obtiene los titulos de abajo hacia arriba para pedir la informacion despues
                        if (titlesData[i].id === "Quiz") break;
                        titlesTmp.push(titlesData[i].dato);
                    }

                    console.log("Solicitando contenido de titulos para test");
                    // Fetch content for each title
                    for (const title of titlesTmp.reverse()) {
                        const contentResponse = await fetch(
                            `/api/contenido/getTema/1/${title}`,
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",
                            }
                        );

                        const contentData = await contentResponse.json();
                        if(contentData.error) return console.log(contentData) 
                        contentData.forEach((element) => {
                            contentForQuiz += element.dato + "\n";
                        });
                    }
                    console.log("Llamanado y pasando el contenido a la IA");
                    // Call the quiz AI handler if necessary

                    // cambiar
                    const quizResult = await quizAI(contentForQuiz);
                    setQuiz(JSON.parse(quizResult));
                } catch (error) {
                    console.error("Error fetching quiz data:", error);
                }
            }
        }

        fetchQuizContent();
    }, [idx]);

    return (
        <>
            {quiz ? (
                typeOfQuiz === "end" ? (
                    <QuizOnEnd quizProp={quiz} />
                ) : typeOfQuiz === "response" ? (
                    <QuizOnResponse quizProp={quiz} />
                ) : (
                    <p>Invalid quiz type</p>
                )
            ) : (
                <p>Loading quiz data...</p>
            )}
        </>
    );
}
