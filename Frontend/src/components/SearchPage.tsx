import { Component, ReactNode } from "react";
import { Books } from "./Books";
import { useFetchBooks } from "../customHooks/useFetchBooks";
import { Book } from "../assets/models/favoriteBooks.models";
import { data } from "./text";
import { Pagination } from "antd";
interface SearchPageState {
  data: {
    items: Book[];
  };
  search: string;
  page: number;
}
export class SearchPage extends Component<{}, SearchPageState> {
  private bookFetcher: useFetchBooks;

  constructor(props: any) {
    super(props);
    this.state = {
      data: { items: [] },
      search: "",
      page: 0,
    };
    this.bookFetcher = new useFetchBooks(
      "http://127.0.0.1:2027/api/books",
      undefined,
      0
    );
  }

  componentDidMount(): void {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    await this.bookFetcher.fetchBooks();
    this.setState({
      data: this.bookFetcher.data,
      search: this.bookFetcher.data.search,
    });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const value = target["search"].value;
    this.setState({ search: value });
    this.bookFetcher.componentDidUpdate({ search: value }, 0);
    this.fetchBooks();
  };

  onChangePage = (page: number) => {
    this.setState({ page: page });
    this.bookFetcher.componentDidUpdate({ search: this.state.search }, page);
    this.fetchBooks();
  };

  render(): ReactNode {
    console.log(this.state.data)
    return (
      <section className="search-page">
        <header>
          <form onSubmit={this.onSubmit}>
            <label>
              <input type="text" name="search" />
            </label>
            <button>Search</button>
          </form>
        </header>
        <main>
          <Books books={this.state.data.items} />
          <Pagination
            total={this.bookFetcher.data.totalItems}
            defaultCurrent={1}
            defaultPageSize={9}
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
