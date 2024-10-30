import { Component, ReactNode } from "react";
import { BookPreview } from "./BookPreview";
import { Book } from "../assets/models/favoriteBooks.models";

interface BooksProps {
  books: Book[];
}

export class Books extends Component<BooksProps> {
  render(): ReactNode {
    return (
      <section>
        {this.props.books.map((book: Book) => (
          <BookPreview book={book} key={book.id}/>
        ))}
      </section>
    );
  }
}
