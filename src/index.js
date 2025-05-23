import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider i18n={{}}>
    <App />
  </AppProvider>
); 