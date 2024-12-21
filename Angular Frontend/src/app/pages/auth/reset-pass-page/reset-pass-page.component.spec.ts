import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassPageComponent } from './reset-pass-page.component';

describe('ResetPassPageComponent', () => {
  let component: ResetPassPageComponent;
  let fixture: ComponentFixture<ResetPassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPassPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
