import FlowNode from "../core/FlowNode";
import globalData from "../../GlobalData";
class InjectNode extends FlowNode {
  init(options: any) {
    this.on("input", msg => {
      const { varname, scope } = options;
      const [data] = msg;
      console.log(data, "eee");
      globalData[scope].setValue(varname, data);
      this.send(["cc", "eeaaa"]);
    });
  }
}

export default InjectNode;
