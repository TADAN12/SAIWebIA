'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {gatewayHost,gatewayPort} from "../../gateway.js"

export default function Page() {

    const [myCourses, setMyCourses] = useState([])
    const [allCourses, setAllCourses] = useState([])
    const [subs, setSub] = useState(1);
    const router = useRouter();

    useEffect(() => {

        async function fetchCourses() {
            try {
                let [resAllCourses, resMyCourses] = await Promise.all([
                    fetch(`/api/contenido/getCourses/1`, {
                        credentials: "include"
                    }),
                    fetch(`/api/contenido/getMyCourses/1`, {
                        credentials: "include"
                    })
                ]);

                if (!resAllCourses.ok || !resMyCourses.ok) throw new Error("Failed to fetch one or more resources");

                let dataAllCourses = await resAllCourses.json();
                let dataMyCourses = await resMyCourses.json();

                if (dataAllCourses.error) return console.log(dataAllCourses)
                if (dataMyCourses.error) return console.log(dataAllCourses)

                setAllCourses(dataAllCourses);
                setMyCourses(dataMyCourses);

            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }

        fetchCourses()

    }, [subs])


    return (
        <>
            <div className="flex flex-col overflow-auto overflow-x-hidden h-[90vh] mx-2">
                <strong>Tus cursos</strong>
                {myCourses.map(course => (
                    <div key={course.id_course} className="bg-white rounded-lg shadow-md p-6 my-2 hover:shadow-lg transition-shadow"
                        onClick={() => router.push(`/cursos/${course.id_course}`)}
                    >
                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.course_name}</h3>
                            <p className="text-gray-600 mb-4">Instructor: {course.scope}</p>
                        </section>
                    </div>
                ))}
                <strong>Mas cursos</strong>
                {allCourses.map((course) => (
                    <div key={course.id_course} className="bg-white rounded-lg shadow-md p-6 my-2 hover:shadow-lg transition-shadow flex justify-between">
                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.course_name}</h3>
                            <p className="text-gray-600 mb-4">Instructor: {course.scope}</p>
                        </section>
                        <section>
                            <button onClick={() => subscribeToCourse(course.id_course, setSub)}>
                                Ingresar
                            </button>
                        </section>
                    </div>
                ))}
            </div>
        </>
    )
}


async function subscribeToCourse(id_course, setSub) {

    let response = await fetch(`/api/contenido/subscribeCourse/${id_course}`, {
        method: "POST",
        credentials: "include",
        body:JSON.stringify({
            id_course:id_course // no se usa, solo para reolver problema de obtener el cuerpo en el Router handler
        })
    })

    let data = await response.json();
    if (data.error) return console.log(data);
    setSub(2); // actualiza la pagina cuando te suscribes, cambiar

}