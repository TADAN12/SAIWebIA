import NoteTemplate from "../../components/notes/NoteTemplate";

export default async function Page({ params }) {

    let id = (await params).id;

    return (
        <div className="h-[100%] w-[70%] m-auto border-2 border-blue-500 ">
            {<NoteTemplate id={id} />}
        </div>
    );
}
