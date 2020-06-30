class FlowNode {
  id: string;
  type: string;
  pid: string;
  config: any;
  /**
   * 下一个流指向的节点，由于每个节点可能由多个出口，每个出口可能对应了多个节点，因此这个结构应该是一个二维数组
   */
  wires: any[];
  private _closeCallbacks: Array<(msg: any, send: () => void) => void>;
  private _inputCallbacks: Array<(msg: any, send: () => void) => void>;
  private _flow: any;

  static factory: Map<any, any>;
  static registerType: (typeName: string, fn: typeof FlowNode) => void;
  static getNodeClassByType: (typeName: string) => typeof FlowNode;
  constructor(options: any) {
    const { id, type, pid, flow, wires, ...config } = options;
    this.id = id;
    this.type = type;
    this.pid = pid;
    this.config = config;
    this.wires = wires;
    this._closeCallbacks = [];
    this._flow = flow;
    this._inputCallbacks = [];
    this.init(options);
  }
  init(options: any): void {
    throw new Error("需子类实例化");
  }
  on(event: string, callback: (msg: any) => any) {
    if (event === "close") {
      this._closeCallbacks.push(callback);
    } else if (event === "input") {
      this._inputCallbacks.push(callback);
    } else {
      //调用EventEmmit
    }
  }
  emit(event: string, ...args: any) {
    if (event === "input") {
      var c = this._inputCallbacks.length;
      for (var i = 0; i < c; i++) {
        var cb = this._inputCallbacks[i];
        //错误处理，后续增加
        cb(args, () => {
          this.send.apply(this, arguments as any);
        });
      }
    } else {
      //处理其他自定义事件，使用on
    }
  }
  /**
   * 向下游节点发送消息
   * @param msg
   */
  receive(msg = {}) {
    this.emit("input", msg);
  }
  /**
   *
   * @param payLoad 一维数组，对应节点每个出口的数据
   */
  send(payLoads: any[]) {
    if (payLoads === null || typeof payLoads === "undefined") {
      return;
    }

    const numOutputs = this.wires.length;
    const sendEvents = [];
    for (let i = 0; i < numOutputs; i++) {
      //当前出口对应的下游节点
      const wires = this.wires[i];
      const payLoad = payLoads[i];
      console.log(i, "-------", payLoad, "-fff-");
      if (payLoad !== null && payLoad !== undefined) {
        //如果当前出口有消息，就触发下游节点
        for (let j = 0; j < wires.length; j++) {
          const nextNode = this._flow.getNode(wires[j]);
          if (nextNode) {
            sendEvents.push({ n: nextNode, m: payLoad });
          }
        }
      }
    }
    for (let i = 0; i < sendEvents.length; i++) {
      var ev = sendEvents[i];
      ev.n.receive(ev.m);
    }
  }
}
FlowNode.factory = new Map();
FlowNode.registerType = function(typeName, fn) {
  FlowNode.factory.set(typeName, fn);
};
FlowNode.getNodeClassByType = function(typeName) {
  return FlowNode.factory.get(typeName);
};
export default FlowNode;
