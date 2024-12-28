import { Component, Input } from '@angular/core';
import { Book } from '../../models/book/book.model';

@Component({
  selector: 'book-preview',
  standalone: false,
  templateUrl: './book-preview.component.html',
  styleUrl: './book-preview.component.scss',
})
export class BookPreviewComponent {
  @Input() book!: Book;
}
