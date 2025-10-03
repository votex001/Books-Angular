import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  concatMap,
  reduce,
  distinctUntilChanged,
  retry,
  filter,
  first,
} from 'rxjs/operators';
import {
  Book,
  booksFetch,
  BooksPerFavoritePage,
  Lang,
  SearchFilter,
} from '../../models/book/book.model';
import { environment } from '../../../env/environment';
import { ShelfPaginatorService } from '../ShelfPaginator/shelf-paginator.service';
import { LoadingService } from '../loading/loading.service';

export interface FavSearchFilter {
  lang: Lang;
  page: number;
  search: string;
  booksPerPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(
    private http: HttpClient,
    private shelfPaginatorService: ShelfPaginatorService,
    private loadingService: LoadingService
  ) {}

  private url = environment.apiUrl;
  private _books$ = new BehaviorSubject<Book[]>([]);
  public books$ = this._books$.asObservable();

  private _filterBy$ = new BehaviorSubject<SearchFilter>({
    lang: 'all',
    page: 1,
    search: '',
  });
  public filterBy$ = this._filterBy$
    .asObservable()
    .pipe(distinctUntilChanged());

  private _favorFilter$ = new BehaviorSubject<FavSearchFilter>({
    lang: 'all',
    page: 1,
    search: '',
    booksPerPage: BooksPerFavoritePage,
  });
  public favorFilter$ = this._favorFilter$
    .asObservable()
    .pipe(distinctUntilChanged());

  private cachedData: { [key: string]: any } = {}; // Cache for API responses

  public query(): Observable<any> {
    this.loadingService.setLoading(true);

    return this.filterBy$.pipe(
      switchMap((filter) => {
        if (this.cachedData[filter.page]) {
          return of(this.cachedData[filter.page]); // Return cached data if available
        }
        const queryParams = new URLSearchParams();
        if (filter.search) {
          queryParams.append('search', filter.search);
        }

        const url = queryParams.toString()
          ? `${this.url}/books?${queryParams.toString()}`
          : `${this.url}/books`;

        // Fetch and set total books count
        return this.http.get<booksFetch>(url).pipe(
          map((res) => res.count),
          tap({
            next: (count) => {
              if (this.shelfPaginatorService) {
                this.shelfPaginatorService.setTotalBooks(count); // Update paginator with total books
              }
            },
          }),
          catchError((error) => {
            console.error('Error fetching total books:', error);
            return of(0); // Return fallback in case of error
          }),
          switchMap(() => {
            const pages = this.shelfPaginatorService.findPage(
              filter.page
            ).shelfNumber;
            const pagesToFetch = Array.isArray(pages) ? pages : [pages];

            const requests = pagesToFetch.map((page) => {
              if (filter.lang && filter.lang !== 'all') {
                queryParams.append('lang', filter.lang);
              }
              queryParams.delete('page');
              queryParams.append('page', page.toString());

              const finalUrl = `${this.url}/books?${queryParams.toString()}`;

              // Fetch data from the API
              return this.http.get<booksFetch>(finalUrl).pipe(
                map((result) => {
                  const resultsArray = Array.isArray(result.results)
                    ? result.results
                    : [];

                  // If data is already cached, merge it
                  if (this.cachedData[filter.page]) {
                    this.cachedData[filter.page].results = [
                      ...this.cachedData[filter.page].results,
                      ...resultsArray,
                    ];
                  } else {
                    // Store the fetched data in the cache
                    this.cachedData[filter.page] = {
                      ...result,
                      results: resultsArray,
                    };
                  }

                  return { ...result, results: resultsArray };
                }),
                tap({
                  complete: () => {
                    this.loadingService.setLoading(false);
                  },
                }),
                catchError((error) => {
                  console.error('Error fetching data:', error);
                  return of({ count: 0, results: [] });
                })
              );
            });

            if (this.cachedData[filter.page]) {
              return this.cachedData[filter.page];
            } else {
              return forkJoin(requests).pipe(
                concatMap((request) => request),
                tap({
                  complete: () => {
                    this.loadingService.setLoading(false);
                  },
                }),
                reduce(
                  (acc: { count: number; results: Book[] }, result) => {
                    acc.count = result.count;
                    acc.results = [...acc.results, ...result.results];
                    return acc;
                  },
                  { count: 0, results: [] as Book[] }
                )
              );
            }
          })
        );
      })
    );
  }

  public findPage = () => {
    return this.shelfPaginatorService.findPage(this._filterBy$.value.page);
  };

  public setFilter(params: Partial<SearchFilter>) {
    this.loadingService.setLoading(true);
    const { value: filter } = this._filterBy$;
    if (
      (params?.search && filter.search !== params.search) ||
      (params?.lang && filter.lang !== params.lang)
    ) {
      this.cachedData = {}; // Clear cache when search or language changes
    }

    this._filterBy$.next({
      search: params?.search ?? filter.search,
      lang: params?.lang ?? filter.lang,
      page: params?.page ?? filter.page,
    });
  }

  public getById(id: string | number) {
    const finalUrl = `${this.url}/books/${id}`;
    return this.http.get<Book>(finalUrl).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  public getBookTxt(id: string | number) {
    const finalUrl = `${this.url}/books/${id}/txt`;
    return this.http
      .get<any>(finalUrl, { responseType: 'text' as 'json' })
      .pipe(
        retry(1),
        map((data) => {
          return this.processHtml(data, id);
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  private processHtml(html: string, id: string | number): string {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string into a document
    const doc = parser.parseFromString(html, 'text/html');

    // Select all img elements and update their src attributes
    const images = doc.querySelectorAll('img');
    if (images) {
      images.forEach((img) => {
        const src = img.getAttribute('src');
        // Check if the src is a relative URL
        if (src && !src.startsWith('http')) {
          // Modify the src to include the full URL
          img.setAttribute(
            'src',
            `https://www.gutenberg.org/cache/epub/${id}/${src}`
          );
        }
      });
    }
    const links = doc.querySelectorAll('a.pginternal');
    if (links) {
      links.forEach((link) => {
        const href = link.getAttribute('href');
        // Check if the href is a relative anchor link
        if (href && href.startsWith('#')) {
          // Modify the href to include the book's URL and ID
          link.setAttribute(
            'href',
            `http://localhost:4200/book/${id}/txt${href}`
          );
        }
      });
    }

    // Return the modified HTML as a string
    return doc.body.innerHTML || '';
  }

  public qetBookQuotes(id: number) {
    return this.getBookTxt(id).pipe(
      map((data) => {
        const parser = new DOMParser();
        return parser.parseFromString(data, 'text/html');
      }),
      filter((data: any) => data instanceof Document),
      map((html) => {
        const paragraphs = Array.from(html.querySelectorAll('p'))
          .slice(0, -10)
          .map((p) => p.textContent?.trim() || '')
          .filter((text) => {
            return (
              text.replace(/\s/g, '').length >= 50 &&
              text.replace(/\s/g, '').length <= 70
            );
          });
        return this.getRandomItems(paragraphs, 5).map((q) =>
          q.replace(/[”“’‘]/g, '')
        );
      })
    );
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, count); // Take first `count` items
  }

  public getMyFavBooks() {
    return this.favorFilter$.pipe(
      switchMap((filter) => {
        this.loadingService.setLoading(true);
        const queryParams = new URLSearchParams();
        if (filter.booksPerPage) {
          queryParams.append('booksPerPage', String(filter.booksPerPage));
        }
        if (filter.search) {
          queryParams.append('search', filter.search);
        }
        if (filter.lang !== 'all') {
          queryParams.append('lang', filter.lang);
        }
        queryParams.append('page', String(filter.page));
        const url = `${this.url}/fav?${queryParams.toString()}`;
        return this.http.get(url, { withCredentials: true }).pipe(
          tap({
            complete: () => {
              this.loadingService.setLoading(false);
            },
          })
        );
      })
    );
  }

  public setFavorFilter(params: Partial<FavSearchFilter>) {
    const { value: filter } = this._favorFilter$;
    this._favorFilter$.next({
      search: params?.search ?? filter.search,
      lang: params?.lang ?? filter.lang,
      page: params?.page ?? filter.page,
      booksPerPage: params?.booksPerPage ?? filter.booksPerPage,
    });
  }

  public addBookToFav(bookId: string | number) {
    return this.http
      .post(`${this.url}/fav`, { bookId }, { withCredentials: true })
      .pipe(first());
  }

  public removeFromFav(bookId: string | number) {
    return this.http
      .delete(`${this.url}/fav/${bookId}`, {
        withCredentials: true,
      })
      .pipe(first());
  }
}
