import { Component, inject, Input, OnInit } from '@angular/core';
import { Book } from '../../../models/book/book.model';
import { BooksService } from '../../../services/books/books.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'books-quotes',
  standalone: false,
  templateUrl: './books-quotes.component.html',
  styleUrl: './books-quotes.component.scss',
})
export class BooksQuotesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  @Input() public bookId?: number;
  public bookQuotes: string[] = [];
  constructor(private bookService: BooksService) {}
  book_ = toSignal<Book>(this.route.data.pipe(map((data) => data['book'])));
  ngOnInit(): void {
    this.bookService
      .qetBookQuotes(this.book_()!.id)
      .subscribe((quotes) =>(this.bookQuotes = quotes));
  }
}
