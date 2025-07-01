'use client'

import { useEffect, useRef, useState } from 'react';
import DiagramBase from '../components/diagrams/diagram/DiagramBase';

export default function Diagram() {
   
    useEffect(() => {
        
    }, []); // Empty dependency array: runs once on mount to initialize the graph object

    return (
        <>
            <DiagramBase></DiagramBase>
        </>
    );
}
