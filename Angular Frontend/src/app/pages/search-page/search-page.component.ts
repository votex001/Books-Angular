import { Component } from '@angular/core';

@Component({
  selector: 'search-page',
  standalone: false,

  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  books: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9,1,2312];
}
