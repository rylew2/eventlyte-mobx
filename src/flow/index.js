import FlowNode from "./core/FlowNode";
import Flow from "./core/Flow";
import { RequestNode } from "./nodes/request";
import InjectNode from "./nodes/inject";
FlowNode.registerType("request", RequestNode);
FlowNode.registerType("inject", InjectNode);
export default Flow;
