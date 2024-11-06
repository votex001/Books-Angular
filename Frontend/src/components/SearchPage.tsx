// components/SearchPage.tsx
import React, { Component, ReactNode } from "react";
import { Books } from "./Books"; // Assuming you have this component for displaying books
import { useFetchBooks } from "../customHooks/useFetchBooks";
import { Book } from "../assets/models/favoriteBooks.models"; // Assuming you have a Book model
import { Pagination } from "antd";
import UseFindPage from "../customHooks/useFindPage";

interface SearchPageState {
  data: {
    results: Book[];
    count: number;
  };
  search: string;
  page: number;
}

export class SearchPage extends Component<{}, SearchPageState> {
  private bookFetcher: useFetchBooks;
  private bookPager: UseFindPage;
  constructor(props: any) {
    super(props);
    this.state = {
      data: { results: [], count: 0 },
      search: "",
      page: 1, // Default to page 1
    };
    // Instantiate useFetchBooks with the appropriate URL
    this.bookFetcher = new useFetchBooks("http://127.0.0.1:2027/api/books");
    this.bookPager = new UseFindPage(0)
  }

  componentDidMount(): void {
    this.fetchBooks(); // Fetch initial data
  }

  // Fetch books based on current search and page
  fetchBooks = async () => {
    await this.bookFetcher.fetchBooks();
    this.bookPager.setTotalBooks(this.bookFetcher.data.count)
    this.setState({
      data: this.bookFetcher.data,
      search: this.bookFetcher.data.search || this.state.search,
    });
  };
  addFetchedBooks = async () => {
    await this.bookFetcher.fetchBooks();
    this.setState({
      data: {
        ...this.state.data,
        results: [...this.state.data.results, ...this.bookFetcher.data.results],
      },
    });
  };

  // Handle form submission for search
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const value = target["search"].value;
    this.setState({ search: value, page: 1 }); // Reset page to 1 on new search
    this.bookFetcher.componentDidUpdate({ search: value }, 1); // Update query and reset page
    this.fetchBooks();
  };

  // Handle pagination
  onChangePage = (page: number) => {
    this.setState({ page });
    // this.bookFetcher.componentDidUpdate({ search: this.state.search }, page);
    // this.fetchBooks();
  };


  renderedBooks = (slicedBooks: Book[]) => {
    this.bookPager.setPage(this.state.page);

    if (slicedBooks.length < 9) {
      const page = this.bookPager.findPage();
      console.log(page);
      return slicedBooks;
    } else {
      return slicedBooks;
    }
  };

  render(): ReactNode {
    const booksPerPage = 9;
    const startIndex = (this.state.page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const books = this.state.data.results.length
      ? this.renderedBooks(this.state.data.results.slice(startIndex, endIndex))
      : undefined;
    return (
      <section className="search-page">
        <header>
          <form onSubmit={this.onSubmit}>
            <label>
              <input type="text" name="search" />
            </label>
            <button type="submit">Search</button>
          </form>
        </header>
        <main>
          {!!this.state.data.results.length && <Books books={books} />}{" "}
          {/* Pass the books to Books component */}
          <Pagination
            total={this.bookFetcher.data.count} // Total number of books
            defaultCurrent={1} // Default to page 1
            current={this.state.page} // Current page from state
            defaultPageSize={9} // Show 9 books per page
            showSizeChanger={false}
            size="default"
            align="center"
            onChange={this.onChangePage}
          />
        </main>
      </section>
    );
  }
}
