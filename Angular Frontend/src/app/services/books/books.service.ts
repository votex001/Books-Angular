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
} from 'rxjs/operators';
import { Book, booksFetch, SearchFilter } from '../../models/book/book.model';
import { environment } from '../../../env/environment';
import { ShelfPaginatorService } from '../ShelfPaginator/shelf-paginator.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(
    private http: HttpClient,
    private shelfPaginatorService: ShelfPaginatorService
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

  private cachedData: { [key: string]: any } = {}; // Cache for API responses

  public query(): Observable<any> {
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
          tap((count) => {
            if (this.shelfPaginatorService) {
              this.shelfPaginatorService.setTotalBooks(count); // Update paginator with total books
            }
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
}
