import { Component } from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  public page = 0
}
