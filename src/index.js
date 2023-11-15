// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const root = document.getElementById("root");

const renderApp = () => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Initial render
renderApp();

// Hot module replacement (HMR) support
if (module.hot) {
  module.hot.accept("./App", () => {
    // When the App component changes, re-render the app
    renderApp();
  });
}
