import * as React from "react";
import ReactDOM from "react-dom";
import HocComponent from "./HocComponent";
import globalData from "./GlobalData";
import Header from "./Components/Header";
class Root extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      globalData["page"].setValue("aa", "cc11");
    }, 2000);
  }
  updateData() {
    globalData["page"].setValue("aa", "ff");
  }
  render() {
    const config = {
      func: {
        title: "header"
      },
      data: {
        __dynimic__cc: {
          type: "dynimic",
          scope: "page",
          name: "aa"
        },
        __dynimic__cat: {
          type: "dynimic",
          scope: "page",
          name: "cat2"
        },
        cc: "test",
        cat: {
          id: "3e6",
          url: "https://cdn2.thecatapi.com/images/3e6.jpg",
          width: 500,
          height: 343
        }
      },
      optbtn: {
        type: "flow",
        value: [
          {
            id: "d319c70b.93b9b8",
            type: "request",
            name: "request",
            url: "https://api.thecatapi.com/v1/images/search",
            wires: [["d319c70b.93b9b2"]]
          },
          {
            id: "d319c70b.93b9b2",
            type: "inject",
            name: "request",
            varname: "cat2",
            scope: "page",
            wires: []
          }
        ]
      }
    };
    return (
      <div>
        <span onClick={this.updateData}>点击更新22</span>
        <HocComponent config={config}>
          {options => <Header {...options} />}
        </HocComponent>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
