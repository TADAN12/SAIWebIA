'use client'

//import { useCallback, useEffect, useState } from "react";
import React, { useEffect, useRef } from "react";
import Images from "./Images";
import Texts from "./Texts";
import "./line.css";
import "../common.css";


function Content({ contenido, setSideBar, children, tema, arrowPage, setTema, scrollPos, workArea , courseId }) {

    const indexPage = useRef(0);



    const handleOnClickArrowRigth = () => {

    }

    const handleOnClickArrowLeft = () => { 
        
    }

    let activeWorkArea = workArea ? "border bg-white w-[100%] md:w-[80%]  lg:w-[75%] lg:mx-[2%] h-[50%] sm:h-[100%] lg:mr-0 flex flex-row " : "border bg-white w-[100%] md:w-[100%]  lg:w-[100%] lg:mx-[2%] h-[100%] sm:h-[100%] lg:mr-0 flex flex-row "

    return (
        <div className={activeWorkArea}>
            <div className=" w-[4%] mx-1 flex justify-center ">
                <button className="my-auto hover:bg-gray-600 rounded-md" onClick={handleOnClickArrowLeft} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <div ref={scrollPos} onClick={(e) => { setSideBar(null); console.log(e.target.value) }} className='common w-[92%] lg:mx-[0%] h-[100%] lg:mr-0 overflow-y-auto'>

                <div className="mx-8 my-4">
                    <strong className=" text-[30px]">{tema}</strong>
                    <div className=" mt-2 border-[1px] border-black"></div>
                </div>
                {children.map((element, index) => {
                    return (element.id === 'img' ? <Images element={element} id={index} /> : <Texts element={element} id={index} />)

                })}

            </div>
            <div className=" w-[4%] mx-1 flex justify-center">
                <button className="my-auto hover:bg-gray-600 rounded-md" onClick={handleOnClickArrowRigth}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

    );
}
export default React.memo(Content);