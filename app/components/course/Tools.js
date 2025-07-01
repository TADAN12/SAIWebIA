import NoteTemplate from "../notes/NoteTemplate";
import { useContext,useState } from "react";
import { ToolContext } from "../../cursos/[id]/ToolContext";
import Calculator from "../calculator/Calculator";
import NoteSelection from "../notes/NoteSelection";

function NoteArea() {

    const [isSelectingNote, setIsSelectingNote] = useState(true)
    const [idNote, setIdNote] = useState(null);

    return <>
        {isSelectingNote ? <NoteSelection setIdNote={setIdNote} setIsSelectingNote={setIsSelectingNote}></NoteSelection> : <NoteTemplate id={idNote} ></NoteTemplate>}

    </>

}

export function ToolsArea() {
    const tools = {
        notes: function Notes() {
            return (
                <div className="h-[100%] w-[98%] mx-auto my-auto">
                    <NoteArea></NoteArea>
                </div>
            );
        },
        calc: function Calc() {
            return <Calculator />;
        },
    };

    const value = useContext(ToolContext);
    let ToolComponent = tools[value?.tool];

    return (
        <div className={tools[value?.tool] ? "h-[100%] w-[100%] bg-green-400 md:w-[50%]" : "hidden"}>
            <aside className="h-[10%] md:h-[6%] w-[96%] mx-auto border-2 border-black">
                <button onClick={() => value?.setTool(null)}>X</button>
            </aside>
            <div className="tools h-[90%] md:h-[94%] max-w-[96%] mx-auto bg-white border-black border-2">
                {ToolComponent ? <ToolComponent /> : null}
            </div>
        </div>
    );
}

export function ToolsMenu() {
    const value = useContext(ToolContext);

    return (
        <div className="tools-menu h-[100%] w-[6%] bg-red-400 border-black border-2 hidden lg:block">
            tools menu
            <button onClick={() => {
                if (value.tool) {
                    value?.setTool(null);
                }
                value?.setTool("calc")
            }}>Calc</button>
            <br />
            <button onClick={() => {
                if (value.tool) {
                    value?.setTool(null)
                }
                value?.setTool("notes")
            }}>Notas</button>
        </div>
    );
}

export function ToolsResponsive({ showResTools }) {
    const value = useContext(ToolContext);

    return (
        <aside className={showResTools ? "absolute z-10 h-[94%] bottom-0 right-0 w-2/6 bg-blue-600 lg:hidden" : "hidden"}>
            tools responsive
            <button onClick={() => value?.setTool("calc")}>Calculadora</button>
            <br />
            <button onClick={() => value?.setTool("notes")}>Notas</button>
        </aside>
    );
}
