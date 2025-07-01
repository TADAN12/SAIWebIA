import ModuleCourse from "./ModuleCourse";

export default async function Page({ params }) {

    let id_course = (await params).id;

    return (
        <div>
            <ModuleCourse id_course={id_course} ></ModuleCourse>
        </div>
    )
}