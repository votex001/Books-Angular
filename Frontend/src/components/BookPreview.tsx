import { Component, ReactNode } from "react";
import { Book } from "../assets/models/favoriteBooks.models.ts";

interface BookPreviewProps {
  book: Book;
}

export class BookPreview extends Component<BookPreviewProps> {
  num = 7;
  render(): ReactNode {
    const { book } = this.props;
    return (
      <section>
        <a href={book.previewLink} target="_blank">
          <img src={book.imageLinks.thumbnail} />
          <h1 className="title">
            {book.title.split(" ").slice(0, this.num).join(" ")}
            {book.title.split(" ").length > this.num && "..."}
          </h1>
          <p className="subtitle">
            <span>{book.publishedDate}</span>
            {/* {book.subtitle.split(" ").slice(0, 5).join(" ")}... */}
            {book.categories ? ", " + book?.categories : ""}
          </p>
        </a>
      </section>
    );
  }
}
