import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { SearchPage } from "./components/SearchPage";
import { BookDetails } from "./components/BooksDetails/BookDetails";
import { BookText } from "./components/BookText";
import { Signup } from "./components/Auth/Signup";
import { App } from "./App";
import { Login } from "./components/Auth/Login";
import { ResetPassRequest } from "./components/Auth/ResetPassRequest";
import { ResetPass } from "./components/Auth/ResetPass";

export class RootCmp extends Component {
  render() {
    const HeaderAnd = (ChildComponent: React.ComponentType) => {
      return () => (
        <>
          <Header />
          <ChildComponent />
        </>
      );
    };
    return (
      <section>
        <main>
          <App>
            <Switch>
              <Route path={"/signup"} component={Signup} />
              <Route path={"/login"} component={Login} />
              <Route path={"/resetPassword/:token"} component={ResetPass} />
              <Route path={"/resetPassword"} component={ResetPassRequest} />
              <Route path={"/profile"} component={ResetPassRequest} />
              <Route path={"/:id/txt"} component={HeaderAnd(BookText)} />
              <Route path={"/:id"} component={HeaderAnd(BookDetails)} />
              <Route component={HeaderAnd(SearchPage)} />
            </Switch>
          </App>
        </main>
      </section>
    );
  }
}
