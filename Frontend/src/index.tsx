import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RootCmp } from "./RootCmp";
import './assets/styles/main.scss'

createRoot(document.getElementById("root")!).render(
  <Router>
    <RootCmp />
  </Router>
);
