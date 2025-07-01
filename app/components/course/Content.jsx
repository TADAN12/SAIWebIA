import { useState , useRef , useEffect} from "react";
import ModuleQuizContent from "../../components/examen/quizTypes/ModuleQuizContent";
import Texts from "../../components/course/Texts";
import Images from "../../components/course/Images";
import {gatewayHost,gatewayPort} from "../../../gateway.js"


export function Content({ title, id_course }) {

    const [contenido, setContenido] = useState([{ id: "txt", dato: "Selecciona un contenido" }])
    const div = useRef(null);

    useEffect(() => {
        div.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [contenido])

    useEffect(() => {
        console.log(title[0])
        console.log(title)
        fetch(`/api/contenido/getTema/${id_course}/` + title[0], {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Indicate the content type
            },
            credentials: "include",
        }).then(res => {
            return res.json()
        }).then(data => {
            setContenido(data);
            console.log(data)
        }).catch(err => {
            console.log(err.message);
            setContenido[{ id: "txt", dato: "No se encontro el contenido" }]
        })
    }, [title])

    if (title[0]?.startsWith("Examen")) {
        return (
            <div className="mx-auto">
                <h1>Examen {title[1]} </h1>
                <ModuleQuizContent typeOfQuiz={"end"} quiz={null} idx={title[1]} ></ModuleQuizContent>
            </div>
        )
    }

    return (
        <main ref={div} className="contenido mx-auto h-[100%] w-[100%] bg-red-400 border-black border-2 md:w-[65%] lg:w-[50%] overflow-auto overflow-x-hidden">

            {contenido.map((element, index) => {
                return (element.id === 'img' ? <Images key={index} element={element} index={index} id_course={id_course} /> : <Texts key={index} element={element} index={index} />)

            })}

        </main>
    )
}
