'use client'

import { useState } from "react"
import { ToolContext } from "./ToolContext";
import { ToolsArea, ToolsMenu, ToolsResponsive } from "../../components/course/Tools";
import { Titles, TitlesResponsive } from "../../components/course/Titles";
import { Content } from "../../components/course/Content";

export default function ModuleCourse({ id_course }) {

    const [showResTitle, setShowResTitle] = useState(false);
    const [showResTools, setShowResTools] = useState(false);
    const [title, setTitle] = useState("", null);
    const [tool, setTool] = useState(null);

    return (
        <div className="relative h-[100%] w-[100%] ">
            <ResponsiveBar setShowResTitle={setShowResTitle} setShowResTools={setShowResTools}></ResponsiveBar>
            <TitlesResponsive showResTitle={showResTitle} setTitle={setTitle} id={id_course}></TitlesResponsive>
            <section className="flex flex-col md:flex-row  flex-nowrap h-[94%] bg-purple-400 lg:h-[100%] "
                onClick={() => {
                    setShowResTitle(false);
                    setShowResTools(false);
                }}>

                <Titles setTitle={setTitle} id={id_course}></Titles>
                <Content title={title} id_course={id_course} ></Content>
                <ToolContext.Provider value={{ tool, setTool }}>
                    <ToolsArea></ToolsArea>
                    <ToolsMenu></ToolsMenu>
                    <ToolsResponsive showResTools={showResTools} setTitle={setTitle}></ToolsResponsive>
                </ToolContext.Provider>
            </section>
        </div>
    )

}

function ResponsiveBar({ setShowResTitle, setShowResTools }) {

    return (
        <section className="barra-responsive flex flex-row justify-between w-[100%] h-[6%] bg-green-400  lg:hidden 
        lg:justify-end">
            <button className="block md:hidden" onClick={() => { setShowResTitle(prev => !prev); setShowResTools(false); }}>Titulos</button>
            <button className="block lg:hidden" onClick={() => { setShowResTools(prev => !prev); setShowResTitle(false); }}>Herrmientas</button>
        </section>
    )
}