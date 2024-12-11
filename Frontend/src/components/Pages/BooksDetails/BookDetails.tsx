import { Component, ReactNode } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Book } from "../../../assets/models/favoriteBooks.models";
import { BookQuotes } from "./BookQuotes";
import { bookService } from "../../../services/book.service";
import { connect } from "react-redux";
import { RootState } from "../../../../store/store";
import { User } from "../../../assets/models/user.model";
import { favService } from "../../../services/fav.service";
import { httpService } from "../../../services/http.service";

interface Params {
  id: string;
}
interface BookDetailsProps extends RouteComponentProps<Params> {
  user: User | null;
}
interface BookDetailsState {
  book?: Book | null;
  isFavorite: boolean;
}

class _bookDetails extends Component<BookDetailsProps, BookDetailsState> {
  componentDidMount(): void {
    this.fetchBook();
    this.checkIfInFav();
  }

  private id = this.props.match.params.id;

  async fetchBook() {
    const book = await bookService.getBookById(this.id);
    this.setState({
      book,
    });
  }

  onAddToFavorites = async () => {
    if (!this.props.user) {
      this.props.history.push("/login");
    } else {
      try {
        if (this.state.isFavorite) {
          await favService.deleteFromFavorite(this.id);
          this.setState({ isFavorite: false });
        } else {
          const book = await favService.addToFavorite(
            this.props.match.params.id
          );
          if (book) {
            this.setState({ isFavorite: true });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  checkIfInFav = async () => {
    const boolean = await favService.ifBookInFav(this.id);
    this.setState({ isFavorite: boolean });
  };

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
                        <p key={author.name}>{author.name}</p>
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
              <section>
                <button onClick={this.onAddToFavorites}>
                  {this.state.isFavorite
                    ? "Delete from favorite"
                    : "Add to favorites"}
                </button>{" "}
                <Link to={`/${book.id}/txt`}>Read</Link>
              </section>
            </header>
            <main>
              <BookQuotes />
            </main>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    );
  }
}
const mapStateToProp = (state: RootState) => ({
  user: state.userModule.user,
});
export const BookDetails = connect(mapStateToProp)(withRouter(_bookDetails));
