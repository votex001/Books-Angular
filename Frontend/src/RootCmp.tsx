import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";

export class RootCmp extends Component {
  render() {
    return (
      <section>
        <Header/>
        <main>
          <Switch>
            <Route path={"/hello"} component={() => "lol"} />
          </Switch>
        </main>
      </section>
    );
  }
}
