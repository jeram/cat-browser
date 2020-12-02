import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './styles.css';

document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
        <App />,
        document.getElementById("mount")
    );
});
