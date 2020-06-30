import FlowNode from "./FlowNode";
function generateId() {
  return (1 + Math.random() * 4294967295).toString(16);
}
class Flow {
  id: string;
  type: string;
  flowNodes: Record<string, any>;
  firstId?: string;
  constructor(config: any[]) {
    this.id = generateId();
    this.type = "flow";
    this.flowNodes = new Map();
    this.initFlowNode(config);
  }
  initFlowNode(config: any[]) {
    config.forEach((item, index) => {
      const { id, type } = item;
      if (index === 0) {
        this.firstId = id;
      }
      const NodeFactory = FlowNode.getNodeClassByType(type);
      this.flowNodes.set(id, new NodeFactory({ ...item, flow: this }));
    });
  }
  getNode(id: string) {
    return this.flowNodes.get(id);
  }
  start(msg: string) {
    this.flowNodes.get(this.firstId).receive("aaa");
  }
}
export default Flow;
