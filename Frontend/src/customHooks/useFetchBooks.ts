export class useFetchBooks {
  private url: string;
  private query?: { search?: string; lang?: string };
  private page: number | number[];

  public data: any = {};
  public cachedData: any = {};

  constructor(
    url: string,
    query?: { search?: string; lang?: string },
    page: number | number[] = [1]
  ) {
    this.url = url;
    this.query = query;
    this.page = page;
  }

  public async fetchBooks() {
    // Create an array to hold promises if page is an array
    const pagesToFetch = Array.isArray(this.page) ? this.page : [this.page];

    const results: any[] = [];

    // Check cache first
    for (const page of pagesToFetch) {
      const queryParams = new URLSearchParams();
      if (this.query) {
        if (this.query.search) {
          queryParams.append("search", this.query.search);
        }
        if (this.query.lang) {
          queryParams.append("lang", this.query.lang);
        }
      }
      queryParams.append("page", page.toString());
      const finalUrl = `${this.url}${
        queryParams.size > 0 ? "?" + queryParams.toString() : ""
      }`;

      // Use cached data if available
      if (this.cachedData[finalUrl]) {
        results.push(this.cachedData[finalUrl]);
      } else {
        try {
          const res = await fetch(finalUrl);
          const result = await res.json();

          // Ensure result.results is an array before pushing
          const resultsArray = Array.isArray(result.results) ? result.results : [];
          
          results.push({ ...result, results: resultsArray });
          this.cachedData[finalUrl] = result; // Cache the result
        } catch (e) {
          console.log(e);
          throw e;
        }
      }
    }

    // Combine all results into a single response object
    this.data = results.reduce(
      (acc, result) => {
        acc.count += result.count;
        acc.results = [...acc.results, ...result.results];
        return acc;
      },
      { count: 0, results: [] }
    );
  }

  public componentDidUpdate(
    newQuery: { search?: string; lang?: string },
    newPage: number | number[]
  ) {
    const isQueryChanged =
      JSON.stringify(this.query) !== JSON.stringify(newQuery);
    const isPageChanged = JSON.stringify(this.page) !== JSON.stringify(newPage);

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
