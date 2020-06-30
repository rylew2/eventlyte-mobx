import * as React from "react";
import globalData from "./GlobalData";
import { observer } from "mobx-react";
const traverse = function(o, fn) {
  for (var i in o) {
    const value = o["__dynimic__" + i];
    if (value) {
      //@ts-ignore
      fn.apply(o, [i, o[i]]);
    } else {
      if (o[i] !== null && typeof o[i] === "object") {
        traverse(o[i], fn);
      }
    }
  }
};
@observer
class HocComponents extends React.Component {
  render() {
    const { config, children } = this.props;
    traverse(config, function(i, val) {
      const meta = this["__dynimic__" + i];
      const { scope, name } = meta;
      this[i] = globalData[scope].getValue(name);
    });
    return <React.Fragment>{children(config)}</React.Fragment>;
  }
}
export default HocComponents;
