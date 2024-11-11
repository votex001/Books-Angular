import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { SearchPage } from "./components/SearchPage";
import { BookDetails } from "./components/BooksDetails/BookDetails";
import { BookText } from "./components/BookText";
import { Signup } from "./components/Signup";
import { ReadWindow } from "./components/BooksDetails/ReadWindow";

export class RootCmp extends Component {
  render() {
    return (
      <section>
        <Header />
        <main>
          <Switch>
            <Route path={"/signup"} component={Signup} />
            <Route path={"/:id/txt"} component={BookText} />
            <Route path={"/:id"} component={BookDetails} />
            <Route component={SearchPage} />
          </Switch>
        </main>
      </section>
    );
  }
}
