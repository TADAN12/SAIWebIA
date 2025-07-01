import { useState, useEffect } from "react";
import { ModalNotes } from "../modal/ModalNotes";
import { Trash2Icon } from "lucide-react";
import {gatewayHost,gatewayPort} from "../../../gateway.js"

export default function NoteSelection({ setIsSelectingNote, setIdNote }) {


    const [notas, setNotas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

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


    function NoteButton({ idx, title, deleteNote, id_note }) {
        return (
            <div className='flex flex-row w-[90%] m-auto  '>
                <button className='bg-red-600 my-2 rounded-xl p-3 w-[15%] flex justify-center '
                    onClick={() => {
                        deleteNote(idx)
                    }}
                >
                    <Trash2Icon/>
                </button>
                <div className='text-center text-md w-[85%] '>
                    <button className='bg-gray-600 h-[50px] w-[95%] m-2 rounded-xl'
                        onClick={() => { setIsSelectingNote(false); setIdNote(id_note) }}
                    >
                        <strong>{title}</strong>
                    </button>
                </div>
            </div>
        )
    }

    function deleteNote(index) {
        let tmp = [...notas]; // Create a copy of the notes array
        tmp.splice(index, 1); // Remove the element at the specified index
        setNotas(tmp); // Update the state with the new array
    }

    return (

        <>
            <div className=' bg-blue-600  h-full w-full rounded-lg'>
                <div className='border-4 border-black rounded-md m-1'>
                    <strong className='block  my-3 mx-6'>Notas</strong>
                </div>
                <div className=' my-2 mx-auto  overflow-auto overflow-x-hidden'>
                    {
                        notas.map((note, index) => {
                            return (
                                <>
                                    <NoteButton key={note.id_note} idx={index} title={note.title} id_note={note.id_note} deleteNote={deleteNote}></NoteButton>
                                </>
                            )
                        })
                    }
                    <div className='flex flex-row w-[90%] m-auto  '>
                        <div className='text-center text-[30px] w-[100%] '>
                            <button className='bg-gray-600 h-[50px] w-[90%] m-2 rounded-xl'
                                onClick={() => {
                                    setIsModalOpen(true)
                                }}
                            >
                                <strong>+</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <ModalNotes setIsModalOpen={setIsModalOpen}></ModalNotes>}
        </>

    )
}


