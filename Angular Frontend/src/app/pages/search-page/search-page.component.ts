import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book/book.model';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private booksSubscription: Subscription | null = null;
  private loadingSubscription: Subscription | null = null;
  public totalItems = 0;
  public viewBooks: Book[] = [];
  public isLoading: boolean = false;
  constructor(
    private BookService: BooksService,
    private router: Router,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loadingStatus$.subscribe(
      (boolean) => (this.isLoading = boolean)
    );
    this.booksSubscription = this.BookService.query().subscribe({
      next: (books) => {
        console.log(books)
        this.totalItems = books.count;
        const sliceParams = this.BookService.findPage();
        this.viewBooks = books.results.slice(
          sliceParams.firstIndex,
          sliceParams.lastIndex
        );
      },
      error: (e) => console.log(e),
    });
  }

  setPage = (page: number) => {
    this.BookService.setFilter({ page });
    this.router.navigate([], {
      queryParams: { q: page },
      queryParamsHandling: 'merge',
    });
  };
  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
