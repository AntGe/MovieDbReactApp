import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const wrapper = document.getElementById("container");
console.log(wrapper);
wrapper
  ? ReactDOM.render(
      <div>
        <App />
      </div>,
      wrapper
    )
  : false;
