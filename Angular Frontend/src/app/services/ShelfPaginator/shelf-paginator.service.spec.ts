import { TestBed } from '@angular/core/testing';

import { ShelfPaginatorService } from './shelf-paginator.service';

describe('ShelfPaginatorService', () => {
  let service: ShelfPaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelfPaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
