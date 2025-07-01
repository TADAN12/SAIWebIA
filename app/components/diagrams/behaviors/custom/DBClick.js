import { BaseBehavior, NodeEvent, CommonEvent, EdgeEvent, ComboEvent, CanvasEvent } from '@antv/g6';


export default class DBClickAddEdge extends BaseBehavior {

    ASSIST_EDGE_ID = 'g6-create-edge-assist-edge-id';
    ASSIST_NODE_ID = 'g6-create-edge-assist-node-id';

    constructor(context, options) {
        super(context, Object.assign({}, DBClickAddEdge.defaultOptions, options));
        this.drop = async (event) => {
            const { targetType } = event;
            if (['combo', 'node'].includes(targetType) && this.source) {
                await this.handleCreateEdge(event);
            }
            else {
                await this.cancelEdge(event);
            }
        };


        this.handleCreateEdge = async (event) => {
            var _a, _b, _c;
            if(!event.ctrlKey) return
            if (!this.validate(event)) return;

            const { graph, canvas, batch, element } = this.context;
            const { style } = this.options;

            if (this.source) {
                this.createEdge(event);
                await this.cancelEdge(event);
                return;
            }

            batch.startBatch();
            canvas.setCursor('crosshair');
            this.source = this.getSelectedNodeIDs([event.target.id])[0];
            const sourceNode = graph.getElementData(this.source);
            graph.addNodeData([
                {
                    id: this.ASSIST_NODE_ID,
                    style: {
                        visibility: 'hidden',
                        ports: [{ key: 'port-1', placement: [0.5, 0.5] }],
                        x: (_a = sourceNode.style) === null || _a === void 0 ? void 0 : _a.x,
                        y: (_b = sourceNode.style) === null || _b === void 0 ? void 0 : _b.y,
                    },
                },
            ]);
            graph.addEdgeData([
                {
                    id: this.ASSIST_EDGE_ID,
                    source: this.source,
                    target: this.ASSIST_NODE_ID,
                    style: Object.assign({ pointerEvents: 'none' }, style),
                },
            ]);
            await ((_c = element.draw({ animation: false })) === null || _c === void 0 ? void 0 : _c.finished);
        };


        this.updateAssistEdge = async (event) => {
            var _a;
            if (!this.source) return;
            const { model, element } = this.context;
            model.translateNodeTo(this.ASSIST_NODE_ID, [event.canvas.x, event.canvas.y]);
            await ((_a = element.draw({ animation: false, silence: true })) === null || _a === void 0 ? void 0 : _a.finished);
        };

        this.createEdge = (event) => {
            var _a, _b;
            const { graph } = this.context;
            const { style, onFinish, onCreate } = this.options;
            const targetId = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id;
            if (targetId === undefined || this.source === undefined)
                return;
            const target = (_b = this.getSelectedNodeIDs([event.target.id])) === null || _b === void 0 ? void 0 : _b[0];
            const id = `${this.source}-${target}-${1}`;
            const edgeData = onCreate({ id, source: this.source, target, style });
            if (edgeData) {
                graph.addEdgeData([edgeData]);
                onFinish(edgeData);
            }
        };

        this.cancelEdge = async (event) => {
            var _a;
            if (!event.ctrlKey) return
            if (!this.source)
                return;
            const { graph, element, batch } = this.context;
            graph.removeNodeData([this.ASSIST_NODE_ID]);
            this.source = undefined;
            await ((_a = element.draw({ animation: false })) === null || _a === void 0 ? void 0 : _a.finished);
            batch.endBatch();
        };

        this.bindEvents();
    }

    update(options) {
        super.update(options);
        this.bindEvents();
    }
    bindEvents() {
        const { graph } = this.context;
        this.unbindEvents();

        graph.on(NodeEvent.CLICK, this.handleCreateEdge);
        graph.on(ComboEvent.CLICK, this.handleCreateEdge);
        graph.on(CanvasEvent.CLICK, this.cancelEdge);
        graph.on(EdgeEvent.CLICK, this.cancelEdge);

        graph.on(CommonEvent.POINTER_MOVE, this.updateAssistEdge);
    }

    getSelectedNodeIDs(currTarget) {
        return Array.from(new Set(this.context.graph
            .getElementDataByState('node', this.options.state)
            .map((node) => node.id)
            .concat(currTarget)));
    }

    isFunction(val) {
        return typeof val === 'function';
    }

    validate(event) {
        if (this.destroyed)
            return false;
        const { enable } = this.options;
        if (this.isFunction(enable))
            return enable(event);
        return !!enable;
    }



    unbindEvents() {
        const { graph } = this.context;

        graph.off(NodeEvent.CLICK, this.handleCreateEdge);
        graph.off(ComboEvent.CLICK, this.handleCreateEdge);
        graph.off(CanvasEvent.CLICK, this.cancelEdge);
        graph.off(EdgeEvent.CLICK, this.cancelEdge);

    }
    destroy() {
        this.unbindEvents();
        super.destroy();
    }
}

DBClickAddEdge.defaultOptions = {
    animation: true,
    enable: true,
    style: {},
    onCreate: (data) => data,
    onFinish: () => { },
};