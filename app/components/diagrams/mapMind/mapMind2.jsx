"use client"

import { useRef, useEffect, useState } from "react";
import { ExtensionCategory, Graph, HoverActivate, idOf, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Badge, Flex, Input, Tag, Typography } from 'antd';

register(ExtensionCategory.NODE, 'react-node', ReactNode);

const Node = ({ style, data, centerNode, graph, initialSize }) => {
    const [nodeText, setNodeText] = useState(data.data.text);
    const [debouncedText, setDebouncedText] = useState(nodeText);
    const [nodeHeigh, setNodeHeigh] = useState("100%");
    const [nodeWidth, setNodeWidth] = useState("100%");
    const divRef = useRef();
    const textAreaRef = useRef();

    const countVisibleLines = (textarea) => {
        return textarea.scrollHeight; // Ya es altura total
    };

    const [backgroundColor, setBackgroundColor] = useState(
        data.id === centerNode ? style.centerBackgroundColor : style.backgroundColor
    );
    const [borderColor, setBorderColor] = useState(
        data.id === centerNode ? style.centerBorderColor : style.borderColor
    );
    const [borderSize, setBorderSize] = useState(
        data.id === centerNode ? style.centerBorderSize : style.borderSize
    );
    const [borderCorners, setBorderCorners] = useState(
        data.id === centerNode ? style.centerBorderCorners : style.borderCorners
    );



    const handleChange = (e) => {
        const value = e.target.value;
        setNodeText(value);
        setDebouncedText(value);
        setNodeHeigh(countVisibleLines(e.target) + 30); // ajusta el alto
        setNodeWidth(divRef.current.offsetWidth); // ajusta el ancho
    };

    return (
        <div
            style={{
                width: nodeWidth,
                height: nodeHeigh,
                fontFamily: style.nodeTextFont,
                fontSize: style.nodeTextSize,
            }}
            className={`${backgroundColor} ${borderColor} ${borderSize} ${borderCorners} ${style.nodeAlignText} p-4 hover:border-black`}
            id={data.id}
            onClick={(e) => console.log("Clicked node ID:", e.target.id)}
            ref={divRef}
        >
            <textarea
                className="w-full h-full bg-transparent border-none outline-none text-center resize-none overflow-hidden focus:outline-none focus:ring-0"
                value={nodeText}
                onChange={handleChange}
                ref={textAreaRef}
                id={data.id}
            />
        </div>
    );
};


export default function MapMind2() {

    const containerRef = useRef();
    const graph = useRef();
    const initialSize = useRef();


    const nodeStyle = {
        backgroundColor: "bg-red-200",
        borderColor: "border-red-200",
        borderSize: "border-2",
        borderCorners: "rounded-md",
        nodeHeigh: "h-fit",
        nodeWidth: "w-fit +whitespace-nowrap",
        nodeAlignText: "text-center",

        centerBackgroundColor: "bg-red-400",
        centerBorderColor: "border-black",
        centerBorderSize: "border-2",
        centerBorderCorners: "rounded-xl",
        centerNodeHeigh: "h-fit",
        centerNodeWidth: "w-fit whitespace-nowrap max-w-[300px] ",
        nodeTextFont: "Times New Roman",
        nodeTextSize: "20px",
    };


    function getTextWidthCanvas(text, font) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = font; // ejemplo: "16px Arial"
        const metrics = context.measureText(text);
        console.log(metrics)
        return Math.round(metrics.width);
    }

    useEffect(() => {


        
        let data = `
{
  "nodes": [
    { "id": "0", "data": { "type": "pre-inspection", "text": "Verificar otros dispositivos" } },
    { "id": "1", "data": { "type": "pre-inspection", "text": "Realizar prueba de velocidad" } },
    { "id": "2", "data": { "type": "pre-inspection", "text": "Revisar si es por cable o WiFi" } },
    
    { "id": "3", "data": { "type": "problem", "text": "Problema general en red" } },
    { "id": "4", "data": { "type": "problem", "text": "Solo un dispositivo afectado" } },
    
    { "id": "5", "data": { "type": "inspection", "text": "¿La velocidad es baja?" } },
    { "id": "6", "data": { "type": "inspection", "text": "¿Hay congestión en la red local?" } },
    { "id": "7", "data": { "type": "inspection", "text": "¿Conexión WiFi débil?" } },
    
    { "id": "8", "data": { "type": "solution", "text": "Reiniciar módem/router" } },
    { "id": "9", "data": { "type": "solution", "text": "Conectar por cable" } },
    { "id": "10", "data": { "type": "solution", "text": "Ubicar mejor el router o usar repetidor" } },
    { "id": "11", "data": { "type": "solution", "text": "Limitar dispositivos o ancho de banda" } },
    { "id": "12", "data": { "type": "solution", "text": "Contactar al proveedor de internet" } }
  ],
  "edges": [
    { "source": "0", "target": "3", "data": { "text": "Varios afectados" } },
    { "source": "0", "target": "4", "data": { "text": "Solo uno" } },
    
    { "source": "3", "target": "5", "data": {} },
    { "source": "5", "target": "8", "data": { "text": "Sí" } },
    { "source": "5", "target": "12", "data": { "text": "No" } },
    
    { "source": "4", "target": "6", "data": {} },
    { "source": "6", "target": "11", "data": { "text": "Sí" } },
    { "source": "6", "target": "7", "data": { "text": "No" } },
    
    { "source": "7", "target": "10", "data": { "text": "Sí" } },
    { "source": "7", "target": "9", "data": { "text": "No" } }

  ]
}
        `
        data = JSON.parse(data)

        let targets = new Set(data.edges.map((path) => path.target))
        let sources = new Set(data.edges.map((path) => path.source))

        let uniqueSource = [...sources].filter((item) => ![...targets].includes(item));

        graph.current = new Graph({
            container: containerRef.current,
            data,
            node: {
                type: 'react-node',
                style: {
                    size: (d) => {
                        console.log(d.id)
                        initialSize.current = getTextWidthCanvas(d.data.text, nodeStyle.nodeTextSize + " " + nodeStyle.nodeTextFont);
                        console.log(initialSize.current);
                        return [initialSize.current, 90] // ajustar el tamaño del laargo confomrme al numero de pixeles??, ajustar las lineas que se muestran
                        // ajustar el hGap
                    },
                    component: (d) => <Node style={nodeStyle} centerNode={uniqueSource[0]} data={d} graph={graph} initialSize={initialSize} />,
                },
            },
            layout: {
                type: 'mindmap',
                direction: 'H',
                preLayout: false,
                getHeight: () => 32,
                getWidth: () => 32,
                getVGap: (d) => {
                    let textLength = getTextWidthCanvas(d.data.text, nodeStyle.nodeTextSize + " " + nodeStyle.nodeTextFont);
                    return 100
                },
                getHGap: (d) => {
                    let textLength = getTextWidthCanvas(d.data.text, nodeStyle.nodeTextSize + " " + nodeStyle.nodeTextFont);
                    console.log(d.id)
                    if(d.id === "0" ){
                        console.log("central")
                        return textLength 
                    }
                    return textLength
                },

            },
            behaviors: ['drag-canvas', 'zoom-canvas', 'collapse-expand-tree', 'drag-element'],
        });

        graph.current.render();

    }, []);

    return <div style={{ width: '200%', height: '100%' }} className="" ref={containerRef}></div>;
};

