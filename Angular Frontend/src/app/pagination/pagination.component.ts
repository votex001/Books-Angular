import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  public page = 1;
  @Input() totalItems: number = 0;
  @Input() onSetPage?: (page: number) => void;

  onChangePage(page: number) {
    if (this.onSetPage) {
      this.onSetPage(page);
    }
    this.page = page;
  }
}
