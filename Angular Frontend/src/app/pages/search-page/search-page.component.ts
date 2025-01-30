import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private booksSubscription: Subscription | null = null;
  public totalItems = 0;
  public viewBooks: Book[] = [];
  constructor(private BookService: BooksService, private router: Router) {}
  ngOnInit(): void {
    this.booksSubscription = this.BookService.query().subscribe({
      next: (books) => {
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
  }
}
