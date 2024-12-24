import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book/book.model';

@Component({
  selector: 'search-page',
  standalone: false,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  public books: Book[] = [];
  private bookService = inject(BooksService);

  ngOnInit(): void {
    this.bookService.books.subscribe({
      next: (res) => {
        this.books = res.results;
      },
    });
  }
}
