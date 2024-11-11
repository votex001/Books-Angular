import { Component, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Book } from "../../assets/models/favoriteBooks.models";
import { useFetchBooksDetails } from "../../customHooks/useFetchBooksDetails";
import { ReadWindow } from "./ReadWindow";

interface Params {
  id: string;
}
interface BookDetailsProps extends RouteComponentProps<Params> {}
interface BookDetailsState {
  book?: Book | null;
}

class _bookDetails extends Component<BookDetailsProps, BookDetailsState> {
  private bookFetcher: useFetchBooksDetails;
  constructor(props: any) {
    super(props);
    const { params } = this.props.match;
    this.bookFetcher = new useFetchBooksDetails(params.id);
  }
  componentDidMount(): void {
    this.fetchBook();
  }
  async fetchBook() {
    await this.bookFetcher.getBook();
    this.setState({
      book: this.bookFetcher.data,
    });
  }

  render(): ReactNode {
    var book;
    if (this.state?.book) {
      book = this.state.book;
    }
    const langName = new Intl.DisplayNames(["en"], {
      type: "language",
    });
    return (
      <section>
        {book ? (
          <>
            <header>
              <img src={book?.cover} />
              <section className="details">
                <h1>{book?.title}</h1>
                {
                  <section className="authors">
                    <h2 className="title"> Authors:</h2>
                    <div className="names">
                      {book?.authors.map((author) => (
                        <p>{author.name}</p>
                      ))}
                    </div>
                  </section>
                }
                {!!book?.languages.length && (
                  <section className="languages">
                    <h2 className="title">Language:</h2>
                    {/* Each book has only one language, stored in an array, so no need to use map */}
                    <p>{langName.of(book?.languages[0])}</p>
                  </section>
                )}
                {!!book?.subjects?.length && (
                  <section className="subjects">
                    <h2 className="title">Subjects:</h2>
                    <ul>
                      {book?.subjects.length === 1
                        ? book.subjects[0]
                        : book.subjects.map((subject) => subject).join(", ")}
                    </ul>
                  </section>
                )}
                {book.download_count && (
                  <section className="downloads">
                    <h2 className="title">Downloads:</h2>
                    <p>{book?.download_count}</p>
                  </section>
                )}
              </section>
            </header>
            <main>
              <ReadWindow />
            </main>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    );
  }
}
export const BookDetails = withRouter(_bookDetails);
