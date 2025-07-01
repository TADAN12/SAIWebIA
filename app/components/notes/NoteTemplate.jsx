"use client"

import { useMemo, useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import CustomHistoryActions from './CustomHistoryActions';
//import './note.css';
import {gatewayHost,gatewayPort} from "../../../gateway.js"


export default function NoteTemplate({ id }) {

    const [content, setContent] = useState();
    const [lexicalConfig, setLexicalConfig] = useState();
    
    useEffect(() => {
        fetchData(setContent, id);
    }, []);

    useEffect(() => {
        if (!content) return

        setLexicalConfig({
            namespace: 'My Rich Text Editor',
            editorState: content,
            onError: (e) => {
                console.log('ERROR:', e);
            },
            theme: {
                text: {
                    bold: "text-bold",
                    italic: "text-italic",
                    underline: "text-underline",
                    code: 'text-code',
                    highlight: 'text-highlight',
                    strikethrough: 'text-strikethrough',
                    subscript: 'text-subscript',
                    superscript: 'text-superscript',
                },
            }
        });
    }, [content]);


    // Memoized ContentEditable to avoid unnecessary re-renders
    const CustomContent = useMemo(() => {
        return (
            <ContentEditable
                style={{
                    position: 'relative',
                    borderColor: 'black',
                    border: '2px solid black',
                    borderRadius: '5px',
                    maxWidth: '100%',
                    padding: '10px',
                }}
            />
        );
    }, []);

    // Editor configuration, including initial state and theme

    if (!lexicalConfig) {
        return (
            <div className='Editor mx-[20%] my-6 h-[90%]'>
                Cargando
            </div>
        )
    }

    return (
        <div className='Editor h-[94%] w-[100%] border-2 border-white'>
            <LexicalComposer initialConfig={lexicalConfig}>
                <CustomHistoryActions />
                <RichTextPlugin
                    contentEditable={CustomContent}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin id={id} AutoSave={AutoSave}  />
                <EditorFocus  />
            </LexicalComposer>
        </div>
    );
}

let timeoutID;

async function debounce(func, listener, id, delay) {

    clearTimeout(timeoutID); // Clear the previous timeout
    timeoutID = setTimeout(async () => {
        console.log("Guardando nota")
        await func(id, listener)
        
    }, delay); // Set a new timeout
    
}

const OnChangePlugin = ({ id, AutoSave }) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        const updateListener = editor.registerUpdateListener((listener) => {
            debounce(
                AutoSave,
                listener.editorState.toJSON(),
                id,
                1500
            );
        });
        // Cleanup listener on component unmount
        return () => {
            updateListener(); // Remove listener when component unmounts
        };
    }, [editor, id]);

};

const EditorFocus = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        if (editor) editor.focus(); // Automatically focus the editor on load
    }, [editor]);

};

async function fetchData(setContent, id) {
    try {

        const res = await fetch(`/api/notas/getNota/${id}`, {
            method: "GET",
            credentials: "include",
        });
        let data = await res.json();
        if (data.error) return console.log(data)
        let contenido = data[0].note_content;
        setContent(contenido)

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}



async function AutoSave(id, editorState) {

    let contentido_actual = JSON.stringify({
        "contenido": editorState, // Properly stringify the content
    });

    fetch(`/api/notas/saveNota/${id}`, { // doesnt find a note with index -1 to force create a new note 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: contentido_actual,
    })
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            if (data.error) return console.log(data)
            console.log(data.message)
        })
        .catch(error => console.error("Fetch error:", error.message))

}