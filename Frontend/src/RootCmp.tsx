import { Route, Routes } from "react-router";
import svg from "../public/imgs/logo.svg";
import { ReactSVG } from "react-svg";

export function RootCmp() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="" />
          <Route
            path="/profile"
            element={
              <div>
                <ReactSVG src={svg} wrapper="span" />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
