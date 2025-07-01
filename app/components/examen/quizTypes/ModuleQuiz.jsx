import QuizOnEnd from "./QuizOnEnd";
import QuizOnResponse from "./QuizOnResponse";
import {useEffect, useState, useRef } from "react";
import {gatewayHost,gatewayPort} from "../../../../gateway.js"

export default function ModuleQuiz({ typeOfQuiz , quizAI , title }) {
    const [quiz, setQuiz] = useState(null);
    const hasFetched = useRef(false);
    const [id,setId] = useState();

    useEffect(() => {

        if (hasFetched.current) return;
        hasFetched.current = true;

        async function fetchQuizContent(quizAI) {

            setQuiz(quizAI);
            //user id -1 cuando cree desde 0 un examen y evitar una consulta para verificar si existe???
            fetch(`/api/quiz/saveQuiz/${-1}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials: "include" ,
                body:JSON.stringify({
                    title:title,
                    content:JSON.stringify(quizAI),
                })
            }).then(response=>{
                return response.json()
            }).then(data=>{
                console.log(data)
                let {message,last_id} = data;
                setId(last_id );
                if(data.error) throw new Error(data.error);
                console.log(message);
                console.log(id)
            }).catch(error=>{
                console.error(error)
            })
        }

        fetchQuizContent(quizAI);
    }, [quizAI]);

    return (
        <>
            {quiz ? (
                typeOfQuiz === "end" ? (
                    <QuizOnEnd quizProp={quiz} id={id} />
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
