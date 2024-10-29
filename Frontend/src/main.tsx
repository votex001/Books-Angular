import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RootCmp } from "./RootCmp";
import "./assets/main.scss";
import { Provider } from "react-redux";
import { store } from "../store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
);
