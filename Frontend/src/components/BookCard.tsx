import { Component, ReactNode } from "react";
import { Book } from "../assets/models/favoriteBooks.models.ts";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export class BookCard extends Component<BookCardProps> {
  num = 7;
  render(): ReactNode {
    const { book } = this.props;
    return (
      <section>
        <Link to={`/${book.id}`}>
          <img src={book.cover} />
          <h1 className="title">{book.title}</h1>
          <p className="subtitle">
            {!!book.authors.length && <span>{book.authors[0].name}</span>}
            {/* {book.subtitle.split(" ").slice(0, 5).join(" ")}... */}
            {/* {book.categories ? ", " + book?.categories : ""} */}
          </p>
        </Link>
      </section>
    );
  }
}
