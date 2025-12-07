import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFailPage } from './booking-fail-page';

describe('BookingFail', () => {
  let component: BookingFailPage;
  let fixture: ComponentFixture<BookingFailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingFailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
