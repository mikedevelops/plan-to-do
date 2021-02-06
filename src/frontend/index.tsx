import { render } from "react-dom";
import React from "react";
import App from "./App/App";

const root = document.getElementById("root");

if (root === null) {
  throw new Error("Could not find #root");
}

render(<App/>, root);