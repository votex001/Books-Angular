import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bookService } from "../../../services/book.service";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
interface params {
  id: string;
}

interface BookQuotesState {
  books: string[];
}

interface BookQuotesParams extends RouteComponentProps<params> {}
class _bookQuotes extends Component<BookQuotesParams, BookQuotesState> {
  constructor(props: any) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount(): void {
    this.renderBook();
  }
  async renderBook() {
    const html = await bookService.getBookTxt(this.props.match.params.id);
    if (!(html instanceof Document)) return;
    const paragraphs = Array.from(html.querySelectorAll("p"))
      .map((p) => p.textContent?.trim() || "") // Extract and trim text content
      .filter(
        (text) =>
          text.replace(/\s/g, "").length >= 50 &&
          text.replace(/\s/g, "").length <= 70
      );
    const quotes = this.getRandomItems(paragraphs, 5).map((q) =>
      q.replace(/[”“]/g, "")
    );
    this.setState({ books: quotes });
  }

  getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, count); // Take first `count` items
  }

  render() {
    return (
      <section>
        <h2>Quotes</h2>
        <main>
          {this.state.books.map((book, index) => {
            return (
              <div key={index}>
                <ImQuotesLeft />
                <p>{book}</p>
                <ImQuotesRight />
              </div>
            );
          })}
        </main>
      </section>
    );
  }
}

export const BookQuotes = withRouter(_bookQuotes);
