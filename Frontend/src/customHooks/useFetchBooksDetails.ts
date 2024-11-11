export class useFetchBooksDetails {
  private url: string;
  public data: any = {};

  constructor(bookId: string) {
    const url = `http://127.0.0.1:2027/api/books/${bookId}`;
    this.url = url;
  }

  public async getBook() {
    const res = await fetch(this.url);
    const data = await res.json();
    this.data = data;
  }
}
