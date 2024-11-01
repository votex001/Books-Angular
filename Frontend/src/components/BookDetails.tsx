import { Component, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Book } from "../assets/models/favoriteBooks.models";
import { useFetchBooks } from "../customHooks/useFetchBooks";

interface Params {
  id: string;
}
interface BookDetailsProps extends RouteComponentProps<Params> {}
interface BookDetailsState {
  book: Book | null;
}

class _bookDetails extends Component<BookDetailsProps, BookDetailsState> {
  private bookFetcher: useFetchBooks;
  constructor(props: any) {
    super(props);
    const { params } = this.props.match;
    this.state = {
      book: null,
    };
    this.bookFetcher = new useFetchBooks(
      `http://127.0.0.1:2027/api/books/${params.id}`
    );
  }
  componentDidMount(): void {
    this.fetchBook();
  }
  async fetchBook() {
    await this.bookFetcher.fetchBooks();

    this.setState({
      book: this.bookFetcher.data,
    });
  }

  render(): ReactNode {
    return (
      <section>
        {this.state.book && (
          <pre>{JSON.stringify(this.state.book, null, 2)}</pre>
        )}
      </section>
    );
  }
}
export const BookDetails = withRouter(_bookDetails);
