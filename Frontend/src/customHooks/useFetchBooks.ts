export class useFetchBooks {
  private url: string;
  private query?: { search?: string; lang?: string };
  private page: number;

  public data: any = {};
  public cachedData: any = {};
  constructor(
    url: string,
    query?: { search?: string; lang?: string },
    page: number = 0
  ) {
    this.url = url;
    this.query = query;
    this.page = page;
  }
  public async fetchBooks() {
    const queryParams = new URLSearchParams();
    if (this.query) {
      if (this.query.search) {
        queryParams.append("search", this.query.search);
      }
      if (this.query.lang) {
        queryParams.append("lang", this.query.lang);
      }
    }
    if (this.page) queryParams.append("page", this.page.toString());
    const finalUrl = `${this.url}${
      queryParams.size > 0 ? "?" + queryParams.toString() : ""
    }`;
    
    if (this.cachedData[finalUrl]) {
      this.data = this.cachedData[finalUrl];
      return;
    }

    try {
      const res = await fetch(finalUrl);
      const result = await res.json();
      this.data = result;
      this.cachedData[finalUrl] = result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  public componentDidUpdate(
    newQuery: { search?: string; lang?: string },
    newPage: number
  ) {
    const isQueryChanged =
      JSON.stringify(this.query) !== JSON.stringify(newQuery);
    const isPageChanged = newPage !== this.page;

    if (isQueryChanged || isPageChanged) {
      this.query = newQuery;
      this.page = newPage;

      // Clear cache if search has changed
      if (isQueryChanged) {
        this.cachedData = {};
      }
    }
  }
}
