import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTxtComponent } from './book-txt.component';

describe('BookTxtComponent', () => {
  let component: BookTxtComponent;
  let fixture: ComponentFixture<BookTxtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookTxtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
