import { Component, inject } from '@angular/core';
import { Book } from '../../../models/book/book.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'book-details',
  standalone: false,

  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  public langName = new Intl.DisplayNames(['en'], { type: 'language' });
  book_ = toSignal<Book>(this.route.data.pipe(map((data) => data['book'])));
  onAddToFavorites = async () => {
    console.log('clicked!');
  };
}
