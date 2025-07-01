'use client'

import React, { useState, useRef, useEffect } from 'react';
import AbstractMenu from '../components/abstract/createAbstract/AbstractMenu';

export default function Page() {

  const [isGenerateAbstract, setIsGenerateAbstract] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [abstractAI, setAbstractAI] = useState('');
  const [abstractTitle, setAbstractTitle] = useState("");

  useEffect(()=>{
    console.log(abstractTitle)
  },[abstractTitle])

  return (
    <>
      {
        !isGenerateAbstract ?
          <AbstractMenu setIsGenerateAbstract={setIsGenerateAbstract} setAbstractAI={setAbstractAI}  text={textInput} setAbstractTitle={setAbstractTitle} setText={setTextInput}></AbstractMenu> :
          <ModuleAbstract abstractAI={abstractAI} title={abstractTitle}  ></ModuleAbstract>
      }
    </>
  )
}


function ModuleAbstract({abstractAI,title}){
    return(
        <>
            <div>
                <strong>{title}</strong>
                <p>{abstractAI}</p>
            </div>
        </>
    )
}
