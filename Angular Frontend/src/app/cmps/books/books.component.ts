import { Component, Input } from '@angular/core';
import { Book } from '../../models/book/book.model';

@Component({
  selector: 'books',
  standalone: false,

  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  @Input() books: Book[] = [];
}
