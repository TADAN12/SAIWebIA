
import { useState, useEffect } from "react";
import {gatewayHost,gatewayPort} from "../../../gateway.js"

async function getTitles(setTitles,id) {

        let res =   await  fetch(`/api/contenido/getTitulos/${id}/s`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Indicate the content type
            },
            credentials: "include",
        })

        let data = await res.json();
        if(data.error) return console.log(data.error)
        setTitles(data);

}

export function Titles({ setTitle , id}) {

    const [titles, setTitles] = useState([])
    let numQuiz = 0;

    useEffect(() => {
        getTitles(setTitles,id)
    }, [])


    return (
        <div className="titulos h-[100%] w-[30%] xl:w-[20%] bg-red-400 border-black border-2 hidden md:block overflow-auto overflow-x-hidden ">
            {titles.map((title, index) => {
                if (title.id === "Ttulo1" || title.id === "Heading1")
                    return <Title key={index} level={1} setTitle={setTitle} idx={index}>{title.dato}</Title>
                if (title.id === "Ttulo2" || title.id === "Heading2")
                    return <Title key={index} level={2} setTitle={setTitle} idx={index}>{title.dato}</Title>
                if (title.id === "Ttulo3" || title.id === "Heading3")
                    return <Title key={index} level={3} setTitle={setTitle} idx={index}>{title.dato}</Title>
                if (title.id === "Quiz") {
                    numQuiz++;
                    return <Title key={index} level={10} setTitle={setTitle} idx={index}>{`Examen ${numQuiz}`}</Title>
                }

            })}
        </div>
    )
}

export function TitlesResponsive({ showResTitle, setTitle , id }) {

    const [titles, setTitles] = useState([]);
    let numQuiz = 0;

    useEffect(() => {
        getTitles(setTitles,id)
    }, [])

    return (
        <aside className={showResTitle
            ? "absolute z-10 h-[94%] bottom-0 w-2/6 bg-purple-600 md:hidden overflow-auto overflow-x-hidden "
            : "hidden"}>
            {titles.map((title, index) => {
                if (title.id === "Ttulo1" || title.id === "Heading1")
                    return <Title key={index} level={1} setTitle={setTitle} idx={index} >{title.dato}</Title>
                if (title.id === "Ttulo2" || title.id === "Heading2")
                    return <Title key={index} level={2} setTitle={setTitle} idx={index}>{title.dato}</Title>
                if (title.id === "Ttulo3" || title.id === "Heading3")
                    return <Title key={index} level={3} setTitle={setTitle} idx={index}>{title.dato}</Title>
                if (title.id === "Quiz") {
                    numQuiz++;
                    return <Title key={index} level={10} setTitle={setTitle} idx={index}>{`Examen ${numQuiz}`} {numQuiz}</Title>
                }
            })}
        </aside>
    )

}

function Title({ level, idx, setTitle, children}) {

    let levels = {
        1: "block border-2 bg-blue-800 text-xl ",
        2: "block border-2 bg-blue-500 text-lg",
        3: "block border-2 bg-blue-300 text-md",
        10: "block border-2 bg-purple-400 text-xl",
    }

    let margins = {
        1: "block ml-1 text-left",
        2: "block ml-3 text-left",
        3: "block ml-6 text-left",
        10: "block ml-4 text-left"
    }

    return (
        <strong className={levels[level]} idx={idx}>
            <button className={margins[level]} onClick={() => { setTitle([children, idx]); console.log(children, idx) }}>
                {children}
            </button>
        </strong>
    )

}