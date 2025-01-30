import { Component, Input, input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, map } from 'rxjs';

@Component({
  selector: 'pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  public page = 1;
  @Input() totalItems: number = 0;
  @Input() onSetPage?: (page: number) => void;
  @Input() itemsPerPage?: number = 8;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        filter((q) => q['q']), //filtering queryParams
        map((q) => +q['q']) //getting only number
      )
      .subscribe((num) => {
        this.onChangePage(num); // its gonna get number only if it has q=<**>
      });
  }

  onChangePage(page: number) {
    if (this.onSetPage) {
      this.onSetPage(page);
    }
    this.page = page;
  }
}
