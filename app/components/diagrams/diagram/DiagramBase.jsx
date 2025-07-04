
'use client'

import { useEffect, useRef, useState } from 'react';
import { ExtensionCategory, register, Graph } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import {
    Plus,
    Minus,
    Trash2,
    Link,
    Unlink,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    Settings,
    Play,
    Square,
    Circle,
    Diamond,
    Triangle,
    Save,
    Download,
    Upload,
    Eye,
    EyeOff,
    Move,
    MousePointer
} from 'lucide-react';

import * as graphConfigs from "./graphConfigs"
import DBClickAddEdge from '../behaviors/custom/DBClick';

register(ExtensionCategory.BEHAVIOR, 'dbclick-add-EDGE', DBClickAddEdge);

export default function DiagramInterface() {
    const graph = useRef(null);
    const containerRef = useRef(null);

    // Estados para la interfaz
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [selectedEdges, setSelectedEdges] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [currentTool, setCurrentTool] = useState('select');
    const [nodeCounter, setNodeCounter] = useState(3);

    // Estados para configuraciones
    const [zoomLevel, setZoomLevel] = useState(1);
    const [layoutType, setLayoutType] = useState('force');
    const [nodeShape, setNodeShape] = useState('circle');
    const [nodeSize, setNodeSize] = useState(40);
    const [nodeColor, setNodeColor] = useState('#5B8FF9');
    const [edgeColor, setEdgeColor] = useState('#e2e2e2');
    const [showLabels, setShowLabels] = useState(true);
    const [animationEnabled, setAnimationEnabled] = useState(true);
    const [isShiftPressed, setIfShiftPressed] = useState(false);

    let graphOptions = {}

    useEffect(() => {
        if (!containerRef.current) return;

        graphOptions = {
            container: containerRef.current,
            width: containerRef.current.offsetWidth - 5,
            height: containerRef.current.offsetHeight - 5,
            renderer: graphConfigs.RENDERER,
            autoFit: graphConfigs.AUTO_FIT,
            zoomRange: graphConfigs.ZOOM_RANGE,
            animation: animationEnabled ? graphConfigs.ANIMATION : false,
            behaviors: graphConfigs.BEHAVIORS,
            layout: getLayoutConfig(),
            node: getNodeConfig(),
            edge: getEdgeConfig(),
            combo: graphConfigs.COMBO_CONFIG,
            plugins: graphConfigs.PLUGINS,
            theme: graphConfigs.THEME,
        }

        graph.current = new Graph(graphOptions);

        graph.current.setData(graphConfigs.DATA);
        graph.current.render();
        console.log(graph.current)
        // Event listeners
        graph.current.on('click', (event) => {

            console.log("click")

            if (event.target.type === 'node') {
                setSelectedNodes(prev => [...prev, event.target.id]);

            } else if (event.target.type === 'edge') {
                setSelectedEdges([event.target.id]);
            }
        });

        graph.current.on('canvas:click', () => {
            setSelectedNodes([]);
            setSelectedEdges([]);
        });

        return () => {
            console.log("Desmontando componente")
            if (graph.current) {
                graph.current.destroy();
                graph.current = null;
            }
        };
    }, []);

    useEffect(() => {
        console.log(selectedNodes)
    }, [selectedNodes])

    useEffect(() => {

        // actualizar nodos seleccionados, si no los hay cambiar todos
        graphOptions = {
            container: containerRef.current,
            width: containerRef.current.offsetWidth - 5,
            height: containerRef.current.offsetHeight - 5,
            renderer: graphConfigs.RENDERER,
            autoFit: graphConfigs.AUTO_FIT,
            zoomRange: graphConfigs.ZOOM_RANGE,
            animation: animationEnabled ? graphConfigs.ANIMATION : false,
            behaviors: getBehaviors(),
            layout: getLayoutConfig(),
            node: getNodeConfig(),
            edge: getEdgeConfig(),
            combo: graphConfigs.COMBO_CONFIG,
            plugins: graphConfigs.PLUGINS,
            theme: graphConfigs.THEME,
        }
        graph.current.setOptions(graphOptions);
        graph.current.draw();


    }, [isShiftPressed, nodeShape, nodeSize, nodeColor, edgeColor, showLabels, animationEnabled, currentTool])

    const getBehaviors = () => {
        let behaviors = [];
        if (isShiftPressed) {
            behaviors = [{
                key: 'brush-select',
                type: 'brush-select',
                enable: true,
                animation: false,
                mode: 'default', // union intersect diff default
                state: 'selected', // 'active', 'selected', 'inactive', ...
                trigger: [], // ['Shift', 'Alt', 'Control', 'Drag', 'Meta', ...]
                onSelect: (elements) => {

                    let elementsKeys = Object.keys(elements);
                    let nodes = elementsKeys.filter(node => !node.includes("-"))
                    let edges = elementsKeys.filter(edge => edge.includes("-"))
                    setSelectedNodes(prev => prev.concat(nodes))
                    setSelectedEdges(prev => prev.concat(edges))

                    return elements
                }
            }, 'zoom-canvas', 'dbclick-add-EDGE'];
        } else {
            behaviors = ['drag-canvas', 'zoom-canvas', 'dbclick-add-EDGE'];
        }

        switch (currentTool) {
            case 'select':
                behaviors.push('click-select',);
                break;
            case 'move':
                behaviors.push('drag-element', 'click-select');
                break;
            case 'connect':
                behaviors.push('create-edge');
                break;
            default:
                behaviors.push('click-select');
        }
        return behaviors;
    };

    const getLayoutConfig = () => {
        const layouts = {
            force: { type: 'force', options: { linkDistance: 100, preventOverlap: true } },
            grid: { type: 'grid', options: { rows: 5, cols: 5 } },
            circular: { type: 'circular', options: { radius: 150 } },
            dagre: { type: 'dagre', options: { direction: 'TB', nodeSize: [nodeSize, nodeSize] } }
        };
        return layouts[layoutType] || layouts.force;
    };

    const getNodeConfig = () => ({
        type: nodeShape,
        style: {
            size: nodeShape === 'rect' ? [nodeSize, nodeSize * 0.6] : nodeSize,
            fill: nodeColor,
            stroke: '#1890FF',
            lineWidth: 2,
            labelText: showLabels ? ((d) => d.data?.label || d.id) : '',
            labelFill: '#000',
            labelFontSize: 12,
            labelPlacement: 'middle',
        }
    });

    const getEdgeConfig = () => ({
        type: 'line',
        style: {
            stroke: edgeColor,
            lineWidth: 2,
            endArrow: true,
        }
    });

    // Funciones de control
    const addNode = () => {
        const newNodeId = `node${nodeCounter}`;
        const randomX = Math.random() * 400 + 50;
        const randomY = Math.random() * 300 + 50;

        graph.current.addNodeData([{
            id: newNodeId,
            data: { label: `Nodo ${nodeCounter}` },
            style: { x: randomX, y: randomY }
        }]);

        setNodeCounter(nodeCounter + 1);
        graph.current.draw();
    };

    const deleteSelectedNodes = () => {
        if (selectedNodes.length > 0) {
            graph.current.removeNodeData(selectedNodes);
            setSelectedNodes([]);
            graph.current.draw();
        }
    };

    const deleteSelectedEdges = () => {
        if (selectedEdges.length > 0) {
            graph.current.removeEdgeData(selectedEdges);
            setSelectedEdges([]);
            graph.current.draw();
        }
    };

    const connectSelectedNodes = () => {
        if (selectedNodes.length === 2) {
            const edgeId = `edge-${selectedNodes[0]}-${selectedNodes[1]}`;
            graph.current.addEdgeData([{
                id: edgeId,
                source: selectedNodes[0],
                target: selectedNodes[1]
            }]);
            graph.current.draw();
        }
    };

    const zoomIn = () => {
        graph.current.zoomBy(1.2);
        setZoomLevel(graph.current.getZoom());
    };

    const zoomOut = () => {
        graph.current.zoomBy(0.8);
        setZoomLevel(graph.current.getZoom());
    };

    const resetZoom = () => {
        graph.current.zoomTo(1);
        graph.current.fitView();
        setZoomLevel(1);
    };

    const applyLayout = () => {
        graph.current.setLayout(getLayoutConfig());
        graph.current.layout();
    };

    const exportData = () => {
        const data = graph.current.getData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph-data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Shift") {
            setIfShiftPressed(true);
        }
    })
    document.addEventListener("keyup", (e) => {
        if (e.key === "Shift") {
            setIfShiftPressed(false);
        }

    })


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Toolbar lateral */}
            <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Herramientas</h2>

                {/* Herramientas principales */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2 text-gray-600">HERRAMIENTAS</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setCurrentTool('select')}
                            className={`p-2 rounded flex items-center justify-center ${currentTool === 'select' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}
                            title="Seleccionar"
                        >
                            <MousePointer size={18} />
                        </button>
                        <button
                            onClick={() => setCurrentTool('move')}
                            className={`p-2 rounded flex items-center justify-center ${currentTool === 'move' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}
                            title="Mover"
                        >
                            <Move size={18} />
                        </button>
                    </div>
                </div>

                {/* Operaciones de nodos */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2 text-gray-600">NODOS</h3>
                    <div className="space-y-2">
                        <button
                            onClick={addNode}
                            className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-green-600"
                        >
                            <Plus size={16} />
                            Agregar Nodo
                        </button>
                        <button
                            onClick={deleteSelectedNodes}
                            disabled={selectedNodes.length === 0}
                            className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Trash2 size={16} />
                            Eliminar Nodo
                        </button>
                    </div>
                </div>

                {/* Operaciones de enlaces */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2 text-gray-600">ENLACES</h3>
                    <div className="space-y-2">
                        <button
                            onClick={connectSelectedNodes}
                            disabled={selectedNodes.length !== 2}
                            className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Link size={16} />
                            Conectar Nodos
                        </button>
                        <button
                            onClick={deleteSelectedEdges}
                            disabled={selectedEdges.length === 0}
                            className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Unlink size={16} />
                            Eliminar Enlace
                        </button>
                    </div>
                </div>

                {/* Controles de vista */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2 text-gray-600">VISTA</h3>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        <button
                            onClick={zoomIn}
                            className="bg-gray-200 p-2 rounded flex items-center justify-center hover:bg-gray-300"
                            title="Acercar"
                        >
                            <ZoomIn size={16} />
                        </button>
                        <button
                            onClick={zoomOut}
                            className="bg-gray-200 p-2 rounded flex items-center justify-center hover:bg-gray-300"
                            title="Alejar"
                        >
                            <ZoomOut size={16} />
                        </button>
                        <button
                            onClick={resetZoom}
                            className="bg-gray-200 p-2 rounded flex items-center justify-center hover:bg-gray-300"
                            title="Restablecer"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                        Zoom: {Math.round(zoomLevel * 100)}%
                    </div>
                </div>

                {/* Layout */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2 text-gray-600">DISEÑO</h3>
                    <select
                        value={layoutType}
                        onChange={(e) => setLayoutType(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="force">Force</option>
                        <option value="grid">Grid</option>
                        <option value="circular">Circular</option>
                        <option value="dagre">Dagre</option>
                    </select>
                    <button
                        onClick={applyLayout}
                        className="w-full bg-purple-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-purple-600"
                    >
                        <Play size={16} />
                        Aplicar Diseño
                    </button>
                </div>

                {/* Configuraciones */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="w-full bg-gray-600 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-700"
                    >
                        <Settings size={16} />
                        Configuración
                        {showSettings ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                </div>

                {/* Panel de configuración expandible */}
                {showSettings && (
                    <div className="space-y-4 p-3 bg-gray-50 rounded">
                        {/* Forma del nodo */}
                        <div>
                            <label className="block text-xs font-semibold mb-1">Forma del Nodo</label>
                            <div className="grid grid-cols-2 gap-1">
                                {[
                                    { value: 'circle', icon: Circle },
                                    { value: 'rect', icon: Square },
                                    { value: 'diamond', icon: Diamond },
                                    { value: 'triangle', icon: Triangle }
                                ].map(({ value, icon: Icon }) => (
                                    <button
                                        key={value}
                                        onClick={() => setNodeShape(value)}
                                        className={`p-2 rounded flex items-center justify-center ${nodeShape === value ? 'bg-blue-500 text-white' : 'bg-white'
                                            }`}
                                    >
                                        <Icon size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tamaño del nodo */}
                        <div>
                            <label className="block text-xs font-semibold mb-1">
                                Tamaño: {nodeSize}px
                            </label>
                            <input
                                type="range"
                                min="20"
                                max="200"
                                value={nodeSize}
                                onChange={(e) => setNodeSize(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        {/* Color del nodo */}
                        <div>
                            <label className="block text-xs font-semibold mb-1">Color del Nodo</label>
                            <input
                                type="color"
                                value={nodeColor}
                                onChange={(e) => setNodeColor(e.target.value)}
                                className="w-full h-8 rounded"
                            />
                        </div>

                        {/* Color del enlace */}
                        <div>
                            <label className="block text-xs font-semibold mb-1">Color del Enlace</label>
                            <input
                                type="color"
                                value={edgeColor}
                                onChange={(e) => setEdgeColor(e.target.value)}
                                className="w-full h-8 rounded"
                            />
                        </div>

                        {/* Opciones booleanas */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs">
                                <input
                                    type="checkbox"
                                    checked={showLabels}
                                    onChange={(e) => setShowLabels(e.target.checked)}
                                />
                                Mostrar Etiquetas
                            </label>
                            <label className="flex items-center gap-2 text-xs">
                                <input
                                    type="checkbox"
                                    checked={animationEnabled}
                                    onChange={(e) => setAnimationEnabled(e.target.checked)}
                                />
                                Animaciones
                            </label>
                        </div>
                    </div>
                )}

                {/* Exportar/Importar */}
                <div className="mt-6">
                    <h3 className="text-sm font-semibold mb-2 text-gray-600">ARCHIVO</h3>
                    <button
                        onClick={exportData}
                        className="w-full bg-yellow-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-yellow-600"
                    >
                        <Download size={16} />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Área principal del diagrama */}
            <div className="flex-1 flex flex-col">
                {/* Barra de estado */}
                <div className="bg-white border-b p-2 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex gap-4">
                        <span>Nodos seleccionados: {selectedNodes.length}</span>
                        <span>Enlaces seleccionados: {selectedEdges.length}</span>
                        <span>Herramienta: {currentTool}</span>
                    </div>
                    <div>
                        Zoom: {Math.round(zoomLevel * 100)}%
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 relative">
                    <div
                        ref={containerRef}
                        className="w-full h-full bg-white"
                        style={{ cursor: currentTool === 'move' ? 'move' : 'default' }}
                    />
                </div>
            </div>
        </div>
    );
}