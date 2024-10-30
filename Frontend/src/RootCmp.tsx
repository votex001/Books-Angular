import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { SearchPage } from "./components/SearchPage";

export class RootCmp extends Component {
  render() {
    return (
      <section>
        <Header />
        <main>
          <Switch>
            <Route path={"/"} component={SearchPage} />
          </Switch>
        </main>
      </section>
    );
  }
}
