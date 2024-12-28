import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'book-txt',
  standalone: false,
  templateUrl: './book-txt.component.html',
  styleUrl: './book-txt.component.scss',
})
export class BookTxtComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  book_ = toSignal<string>(this.route.data.pipe(map((data) => data['book'])));

  // Use SafeHtml type to indicate sanitized HTML content
  htmlContent: SafeHtml | undefined;

  ngOnInit() {
    // Sanitize the HTML content to make it safe for binding
    const rawHtml = this.book_();
    this.htmlContent = rawHtml
      ? this.sanitizer.bypassSecurityTrustHtml(rawHtml)
      : '';

   
  }


}
