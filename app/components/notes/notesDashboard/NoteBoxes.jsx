
import Link from "next/link";
import { FilePlus } from "lucide-react";
import { ModalNotes } from "../../modal/ModalNotes";
import { useState } from "react";



export function CreateDocumentBox() {

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <section onClick={() => { setIsModalOpen(true) }}>
                <aside className="h-[80%] w-[80%] border-4 border-black rounded-xl">
                    <FilePlus className="h-[70%] w-[70%] m-auto mt-8  " ></FilePlus>
                </aside>
            </section>
            {isModalOpen && <ModalNotes setIsModalOpen={setIsModalOpen}></ModalNotes>}
        </>
    )

}


export function DocumentBox({ id , title}) {

    return (
        <Link href={`/notas/${id}`}>
            <aside className="h-[80%] w-[80%] border-4 border-black rounded-xl flex justify-center">
                <strong className="my-auto border-2 h-8">{title}</strong>
            </aside>
        </Link>
    )

}