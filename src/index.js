import { Provider } from "mobx-react";
import * as React from "react";
import ReactDOM from "react-dom";
import EventListStore from "./store/EventListStore";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

class Root extends React.Component {
    render() {
        return (
            <Provider EventListStore={EventListStore}>
                <App />
            </Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("root"));

