export const WIDTH = 800;
export const HEIGHT = 600;

// Renderer as callback function (not string in 5.x)
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
export const RENDERER = () => new CanvasRenderer(); // or () => new SVGRenderer()

// Auto fit configuration (replaces fitView/fitCenter)
export const AUTO_FIT = {
    type: 'view',           // 'view', 'center', or 'position'
    options: {
        padding: [20, 20, 20, 20],  // replaces fitViewPadding
        direction: 'both',          // 'x', 'y', or 'both'
    }
};

// Zoom range (replaces minZoom/maxZoom)
export const ZOOM_RANGE = [0.5, 2];

// Animation configuration (replaces animate/animateCfg)
export const ANIMATION = {
    duration: 500,
    easing: 'easeLinear',
    // enable: true,  // can be boolean or object
};

// Behaviors (replaces modes)
export const BEHAVIORS = [
    'drag-element',     
    'zoom-canvas',
    'drag-canvas',
    'click-select',
    'dbclick-add-EDGE'
];

// Layout configuration
export const LAYOUT = {
    type: 'force',
    options: {
        linkDistance: 100,
        preventOverlap: true,
        nodeSize: 30,
        // Additional force layout options
        alpha: 0.3,
        alphaDecay: 0.028,
        velocityDecay: 0.4,
    }
};

// Data structure for G6 5.x (changed format)
/*
export const DATA = {
    nodes: [
        {
            id: 'node1',
            data: {
                label: 'Node 1',            // non-style data goes in 'data'
                // other business data...
            },
            style: {
                x: 100,
                y: 100,
                size: 40,                   // style attributes go in 'style'
                fill: '#fff',
                stroke: '#000',
                lineWidth: 2,
            }
        }
    ],
    edges: [],
    combos: []
};
*/
// Node configuration (replaces defaultNode)
export const NODE_CONFIG = {
    type: 'rect',                   // Built-in types: 'circle', 'rect', 'ellipse', 'diamond', 'triangle', 'star', 'image', 'donut'
    style: {
        size: [100, 40],           // [width, height] for rect
        fill: '#fff',
        stroke: '#000',
        lineWidth: 2,
        radius: 4,                 // border radius for rect
        // Label styling
        labelText: (d) => d.data?.label || d.id,
        fill: '#000',
        labelFontSize: 14,
        labelOffsetY: 0,
    },
    // State styles (replaces nodeStateStyles)
    state: {
        selected: {
            fill: '#e3f2fd',
            stroke: '#1976d2',
            lineWidth: 3,
        },
        hover: {
            fill: '#f5f5f5',
            stroke: '#666',
        }
    }
};

// Edge configuration (replaces defaultEdge)
export const EDGE_CONFIG = {
    type: 'line',                  // Built-in types: 'line', 'polyline', 'quadratic', 'cubic', 'loop'
    style: {
        stroke: '#888',
        lineWidth: 2,
        endArrow: true,           // Show arrow at target
        endArrowType: 'triangle', // 'triangle', 'circle', 'diamond', 'rect'
        // Label styling
        labelText: (d) => d.data?.label || '',
        labelFill: '#555',
        labelFontSize: 12,
        labelOffsetY: -10,
    },
    // State styles (replaces edgeStateStyles)
    state: {
        selected: {
            stroke: '#1976d2',
            lineWidth: 3,
        },
        hover: {
            stroke: '#666',
            lineWidth: 3,
        }
    }
};

// Combo configuration (replaces defaultCombo)
export const COMBO_CONFIG = {
    type: 'rect',
    style: {
        fill: '#f0f0f0',
        stroke: '#aaa',
        lineWidth: 1,
        radius: 8,
        // Label styling
        labelText: (d) => d.data?.label || d.id,
        labelFill: '#666',
        labelFontSize: 12,
    },
    state: {
        selected: {
            fill: '#e8f5e8',
            stroke: '#4caf50',
            lineWidth: 2,
        }
    }
};

// Plugins configuration
export const PLUGINS = [
    {
        type: 'minimap',
        key: 'minimap',
        size: [200, 120],
        position: 'right-bottom',
        background: '#fff',
        viewportFill: 'rgba(25, 118, 210, 0.1)',
        viewportStroke: '#1976d2',
    },
    {
        type: 'grid',
        key: 'grid',
        img: 'data:image/svg+xml;base64,...', // Optional grid pattern
    },
    {
        type: 'toolbar',
        key: 'toolbar',
        position: 'top-left',
        getItems: () => [
            { id: 'zoomIn', name: 'Zoom In', icon: 'zoom-in' },
            { id: 'zoomOut', name: 'Zoom Out', icon: 'zoom-out' },
            { id: 'resetZoom', name: 'Reset Zoom', icon: 'zoom-reset' },
        ]
    }
    // Other available plugins: 'tooltip', 'contextmenu', 'history', 'snapline', 'hull', 'watermark'
];

// Optional theme configuration
export const THEME = 'light'; // 'light' or 'dark' or custom theme object

export const DATA = {
    nodes: [
        { id: 'node1', data: { label: 'Nodo 1' }, style: { x: 100, y: 100 } },
        { id: 'node2', data: { label: 'Nodo 2' }, style: { x: 200, y: 200 } }
    ],
    edges: [
        { source: 'node1', target: 'node2' }
    ]
}