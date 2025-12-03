import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningMapDisplay } from './screening-map-display';

describe('ScreeningMapDisplay', () => {
  let component: ScreeningMapDisplay;
  let fixture: ComponentFixture<ScreeningMapDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreeningMapDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreeningMapDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
