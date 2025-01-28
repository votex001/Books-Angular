import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetPassPageComponent } from './request-reset-pass-page.component';

describe('ResetPassPageComponent', () => {
  let component: RequestResetPassPageComponent;
  let fixture: ComponentFixture<RequestResetPassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestResetPassPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestResetPassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
