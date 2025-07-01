import { UNDO_COMMAND, REDO_COMMAND, FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, OUTDENT_CONTENT_COMMAND, INDENT_CONTENT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function CustomHistoryActions(){
    const [editor] = useLexicalComposerContext();

    const ToolEditor = ({ command, children }) => {
        return (<button className='hover:bg-gray-500 rounded-lg p-1' onClick={command}>{children}</button>)
    }

    return (
        <aside className='editorTools  max-w-[100%] mx-auto mb-2 p-2 flex justify-between flex-row border-y-black border-x-0  overflow-x-auto border-2'>
            <ToolEditor command={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Edit / Undo">
                        <path id="Vector" d="M10 8H5V3M5.29102 16.3569C6.22284 17.7918 7.59014 18.8902 9.19218 19.4907C10.7942 20.0913 12.547 20.1624 14.1925 19.6937C15.8379 19.225 17.2893 18.2413 18.3344 16.8867C19.3795 15.5321 19.963 13.878 19.9989 12.1675C20.0347 10.4569 19.5211 8.78001 18.5337 7.38281C17.5462 5.98561 16.1366 4.942 14.5122 4.40479C12.8878 3.86757 11.1341 3.86499 9.5083 4.39795C7.88252 4.93091 6.47059 5.97095 5.47949 7.36556" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>


            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Edit / Redo">
                        <path id="Vector" d="M13.9998 8H18.9998V3M18.7091 16.3569C17.7772 17.7918 16.4099 18.8902 14.8079 19.4907C13.2059 20.0913 11.4534 20.1624 9.80791 19.6937C8.16246 19.225 6.71091 18.2413 5.66582 16.8867C4.62073 15.5321 4.03759 13.878 4.00176 12.1675C3.96593 10.4569 4.47903 8.78001 5.46648 7.38281C6.45392 5.98561 7.86334 4.942 9.48772 4.40479C11.1121 3.86757 12.8661 3.86499 14.4919 4.39795C16.1177 4.93091 17.5298 5.97095 18.5209 7.36556" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>

            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path fill="#000000" fillRule="evenodd" d="M4 1a1 1 0 00-1 1v16a1 1 0 001 1v-1 1h8a5 5 0 001.745-9.687A5 5 0 0010 1H4zm6 8a3 3 0 100-6H5v6h5zm-5 2v6h7a3 3 0 100-6H5z" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M10 4v3h2.21l-3.42 10H6v3h8v-3h-2.21l3.42-10H18V4z" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17c3.31 0 6-2.69 6-6V4h-2v7c0 2.21-1.79 4-4 4s-4-1.79-4-4V4H6v7c0 3.31 2.69 6 6 6zM5 20v2h14v-2H5z" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")}>
                <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m20.707 5.826-3.535-3.533a.999.999 0 0 0-1.408-.006L7.096 10.82a1.01 1.01 0 0 0-.273.488l-1.024 4.437L4 18h2.828l1.142-1.129 3.588-.828c.18-.042.345-.133.477-.262l8.667-8.535a1 1 0 0 0 .005-1.42zm-9.369 7.833-2.121-2.12 7.243-7.131 2.12 2.12-7.242 7.131zM4 20h16v2H4z" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.3181 6.04842C17.6174 5.75945 18.1021 5.79767 18.3524 6.12997C18.5536 6.39707 18.5353 6.76978 18.3088 7.01579L15.2643 10.3227C14.9955 10.6147 14.9248 11.0382 15.0842 11.4017C15.2437 11.7652 15.6031 12 16 12H20C20.5523 12 21 11.5523 21 11C21 10.4477 
                    20.5523 10 20 10H18.2799L19.7802 8.37041C20.6607 7.41399 20.7321 5.96504 19.95 4.92665C18.9769 3.63478 17.0925 3.48621 15.929 4.60962L15.3054 5.21165C14.9081 5.59526 14.897 6.22833 15.2806 6.62564C15.6642 7.02296 16.2973 7.03406 16.6946 6.65045L17.3181 6.04842ZM4.7433 8.33104C4.37384 7.92053 3.74155
                     7.88725 3.33104 8.25671C2.92053 8.62616 2.88726 9.25845 3.25671 9.66896L7.15465 14L3.25671 18.331C2.88726 18.7415 2.92053 19.3738 3.33104 19.7433C3.74155 20.1128 4.37384 20.0795 4.7433 19.669L8.50001 15.4948L12.2567 19.669C12.6262 20.0795 13.2585 20.1128 13.669 19.7433C14.0795 19.3738 14.1128 18.7415 
                     13.7433 18.331L9.84537 14L13.7433 9.66896C14.1128 9.25845 14.0795 8.62616 13.669 8.25671C13.2585 7.88725 12.6262 7.92053 12.2567 8.33104L8.50001 12.5052L4.7433 8.33104Z" fill="#000000" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.7433 5.33104C4.37384 4.92053 3.74155 4.88726 3.33104 5.25671C2.92053 5.62617 2.88726 6.25846 3.25671 6.66897L7.15465 11L3.25671 15.331C2.88726 15.7416 2.92053 16.3738 3.33104 16.7433C3.74155 17.1128 4.37384 17.0795 4.7433 16.669L8.50001 12.4949L12.2567
                     16.669C12.6262 17.0795 13.2585 17.1128 13.669 16.7433C14.0795 16.3738 14.1128 15.7416 13.7433 15.331L9.84537 11L13.7433 6.66897C14.1128 6.25846 14.0795 5.62617 13.669 5.25671C13.2585 4.88726 12.6262 4.92053 12.2567 5.33104L8.50001 9.50516L4.7433 5.33104ZM17.3181 14.0484C17.6174 13.7595 18.1021 13.7977 
                     18.3524 14.13C18.5536 14.3971 18.5353 14.7698 18.3088 15.0158L15.2643 18.3227C14.9955 18.6147 14.9248 19.0382 15.0842 19.4017C15.2437 19.7652 15.6031 20 16 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H18.2799L19.7802 16.3704C20.6607 15.414 20.7321 13.965 19.95 12.9267C18.9769 11.6348
                      17.0925 11.4862 15.929 12.6096L15.3054 13.2116C14.9081 13.5953 14.897 14.2283 15.2806 14.6256C15.6642 15.023 16.2973 15.0341 16.6946 14.6505L17.3181 14.0484Z" fill="#000000" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M3 15h14v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h14V9H3v2zm0-6v2h18V5H3z" />
                </svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}>
                c
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}>
                <svg fill="#000000" width="24" height="24" viewBox="0 -2.5 29 29" xmlns="http://www.w3.org/2000/svg">
                    <path d="m27.999 21.333h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z" />
                    <path d="m27.999 16h-13.332c-.011 0-.024-.001-.037-.001-.737 0-1.334.597-1.334 1.334s.597 1.334 1.334 1.334c.013 0 .026 0 .039-.001h-.002 13.333c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333h-.002z" />
                    <path d="m27.999 10.667h-13.332c-.011 0-.024-.001-.037-.001-.737 0-1.334.597-1.334 1.334s.597 1.334 1.334 1.334c.013 0 .026 0 .039-.001h-.002 13.333c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333h-.002z" />
                    <path d="m1.334 2.666h26.665c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z" />
                    <path d="m27.999 5.333h-13.332c-.011 0-.024-.001-.037-.001-.737 0-1.334.597-1.334 1.334s.597 1.334 1.334 1.334c.013 0 .026 0 .039-.001h-.002 13.333c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002z" />
                    <path d="m5.724 5.723-5.333 5.334c-.241.241-.39.574-.39.942s.149.701.39.942l5.333 5.333c.241.241.574.39.942.39.736 0 1.333-.596 1.334-1.332v-10.666c-.001-.736-.598-1.332-1.334-1.332-.368 0-.701.149-.942.39z" /></svg>
            </ToolEditor>
            <ToolEditor command={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}>
                <svg fill="#000000" width="24" height="24" viewBox="0 -2.5 29 29" xmlns="http://www.w3.org/2000/svg">
                    <path d="m27.999 21.333h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z" />
                    <path d="m27.999 16h-13.332c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 13.333c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002z" />
                    <path d="m27.999 10.667h-13.332c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 13.333c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002z" />
                    <path d="m1.334 2.666h26.665c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z" />
                    <path d="m27.999 5.333h-13.332c-.011 0-.024-.001-.037-.001-.737 0-1.334.597-1.334 1.334s.597 1.334 1.334 1.334c.013 0 .026 0 .039-.001h-.002 13.333c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002z" />
                    <path d="m.823 18.565c.151.064.326.102.51.102.368 0 .701-.149.943-.391l5.333-5.333c.241-.241.39-.574.39-.942s-.149-.701-.39-.942l-5.333-5.335c-.241-.241-.574-.39-.942-.39-.736 0-1.333.596-1.334 1.332v10.667.001c0 .552.336 1.026.814 1.228z" /></svg>
            </ToolEditor>

        </aside>
    );
}
