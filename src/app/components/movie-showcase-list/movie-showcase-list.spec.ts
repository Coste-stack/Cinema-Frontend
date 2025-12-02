import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowcaseList } from './movie-showcase-list';

describe('MovieShowcaseList', () => {
  let component: MovieShowcaseList;
  let fixture: ComponentFixture<MovieShowcaseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieShowcaseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieShowcaseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
