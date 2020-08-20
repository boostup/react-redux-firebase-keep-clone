import firebase, { config } from "./database";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import App from "./App";

ReactDOM.render(
  <FirebaseAuthProvider {...config} firebase={firebase}>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </FirebaseAuthProvider>,
  document.querySelector("#root")
);
