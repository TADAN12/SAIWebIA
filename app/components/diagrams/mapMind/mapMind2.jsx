"use client"

import { useRef, useEffect } from "react";
import { ExtensionCategory, Graph, HoverActivate, idOf, register } from '@antv/g6';


export default function MapMind2() {
    const containerRef = useRef();

    useEffect(() => {
        fetch('https://assets.antv.antgroup.com/g6/performance-diagnosis.json')
            .then((res) => res.json())
            .then((data) => {
                const graph = new Graph({
                    container: containerRef.current,
                    data,
                    layout: {
                        type: 'mindmap',
                        direction: 'H',
                        preLayout: false,
                        getHeight: () => 32,
                        getWidth: () => 32,
                        getVGap: () => 2,
                        getHGap: () => 2,
                    },
                    behaviors: ['drag-canvas', 'zoom-canvas', 'collapse-expand-tree', 'drag-element'],

                });

                graph.render();
            });
    }, []);

    return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
};

