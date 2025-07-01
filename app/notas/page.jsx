'use client'

import { useEffect, useState } from "react";
import { DocumentBox , CreateDocumentBox } from "../components/notes/notesDashboard/NoteBoxes";
import {gatewayHost,gatewayPort} from "../../gateway.js"

export default function Page() {

    const [notas, setNotas] = useState([]);

    useEffect(() => {
        async function fetchNotes() {
            let response = await fetch(`/api/notas/getNotas`, {
                method: "GET",
                credentials: "include"
            });
            let data = await response.json();
            if (data.error) return console.log(data)
            let { notes } = data;
            setNotas(notes);
        }
        fetchNotes();
    }, [])

    return (
        <div className="h-full w-full">
            {/* Header Section */}
            <header className="h-[10%] w-full ">
                <h1 className="text-xl font-bold">Tus documentos</h1>
            </header>
            {/* Main Content Section */}
            <main className="h-[88%] w-[99%] m-2 grid grid-cols-6 grid-rows-2 gap-0 overflow-auto">
                {/* Box to Create a New Document */}
                <CreateDocumentBox />

                {/* List of Notes */}
                {notas.map((nota, index) => (
                    <article key={index} className="note-box">
                        <DocumentBox id={nota.id_note} title={nota.title} />
                    </article>
                ))}
            </main>
        </div>

    )
}
