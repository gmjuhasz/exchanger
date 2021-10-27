import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Card className="AppContainer">
        <App />
      </Card>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
