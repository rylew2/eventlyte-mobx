import * as React from "react";
import Flow from "../flow/index";
console.log(Flow);
const runFlow = function(config, param) {
  const flow = new Flow(config);
  flow.start("aa");
  console.log(config);
};
class Header extends React.Component {
  render() {
    console.log(this.props, "kkk", this.props.data.cc);
    return (
      <div>
        <h1>
          Hello --{this.props.data.cc ? this.props.data.cc : "load"}
          <div onClick={() => runFlow(this.props.optbtn.value, 1)}>
            点击操作
          </div>
          {this.props.data.cat ? (
            <img src={this.props.data.cat.url} alt="test" />
          ) : null}
        </h1>
      </div>
    );
  }
}
export default Header;
