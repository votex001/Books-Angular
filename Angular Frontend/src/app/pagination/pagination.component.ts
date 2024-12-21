import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: false,

  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() collection: any[] = [];
  p: number = 1;
}
