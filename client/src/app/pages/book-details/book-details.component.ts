import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/book/book.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user.model';
import { BooksService } from '../../services/books/books.service';

@Component({
  selector: 'book-details',
  standalone: false,

  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  public langName = new Intl.DisplayNames(['en'], { type: 'language' });
  book_ = toSignal<Book>(this.route.data.pipe(map((data) => data['book'])));
  private subscription: Subscription | null = null;
  private userService = inject(UserService);
  private bookService = inject(BooksService);
  public user: User | null = null;
  public isAdded: boolean = false;
  public isHovered: boolean = false;
  ngOnInit(): void {
    this.subscription = this.userService.login().subscribe((user) => {
      this.user = user;
    });

    this.bookService.getMyFavBooks().subscribe((ans: any) => {
      const bookId = this.book_()?.id;
      this.isAdded = ans.books.some((book: any) => book.id === bookId);
    });
  }

  onAddToFavorites = async () => {
    const book = this.book_();
    if (book && !this.isAdded) {
      this.isAdded = true;
      this.bookService.addBookToFav(book.id).subscribe();
    } else if (book && this.isAdded) {
      this.isAdded = false;
      this.bookService.removeFromFav(book.id).subscribe();
    }
  };

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
