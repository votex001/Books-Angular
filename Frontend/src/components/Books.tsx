import { Component, ReactNode } from "react";
import { BookCard } from "./BookCard";
import { Book } from "../assets/models/favoriteBooks.models";

interface BooksProps {
  books: Book[];
}

export class Books extends Component<BooksProps> {
  render(): ReactNode {
    return (
      <section className="book-list">
        {this.props.books.map((book: Book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </section>
    );
  }
}
