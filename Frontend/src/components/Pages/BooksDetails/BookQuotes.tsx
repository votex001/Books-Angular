import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
interface params {
  id: string;
}

interface BookQuotesParams extends RouteComponentProps<params> {}
class _bookQuotes extends Component<BookQuotesParams> {
  render() {
    const { id } = this.props.match.params;
    return (
      <section>
        <h2>Quotes</h2>
      </section>
    );
  }
}

export const BookQuotes = withRouter(_bookQuotes);
