import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user/user.model';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books/books.service';
import { Book, SearchFilter } from '../../models/book/book.model';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'profile-page',
  standalone: false,

  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription | null = null;
  private favoriteBooksSubscription: Subscription | null = null;
  private loadingSubscription: Subscription | null = null;

  public isLoading: boolean = false;
  public user: User | null = null;
  public favBooksInfo: {
    books: Book[];
    results: number;
    totalPages: number;
    currentPage: number;
  } = {
    books: [],
    results: 0,
    totalPages: 0,
    currentPage: 1,
  };
  constructor(
    private userService: UserService,
    private booksService: BooksService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loadingStatus$.subscribe(
      (boolean) => (this.isLoading = boolean)
    );
    this.userSubscription = this.userService.login().subscribe((ans) => {
      if (!ans) {
        this.router.navigate(['/login']);
      }
      this.user = ans;
    });

    this.favoriteBooksSubscription = this.booksService
      .getMyFavBooks()
      .subscribe((ans: any) => (this.favBooksInfo = ans));
  }

  onSubmit(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;
    if (this.user) {
      this.userService
        .updateUserPhoto(this.user, file)
        .subscribe((user: any) => {
          this.user = user;
        });
    }
  }

  onSetPage = (page: number) => {
    this.booksService.setFavorFilter({ page: page });
  };

  onSearch = (filter: Partial<SearchFilter>) => {
    this.booksService.setFavorFilter(filter);
  };

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.favoriteBooksSubscription) {
      this.favoriteBooksSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
