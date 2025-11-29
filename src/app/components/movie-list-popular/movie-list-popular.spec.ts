import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListPopular } from './movie-list-popular';

describe('MovieListPopular', () => {
  let component: MovieListPopular;
  let fixture: ComponentFixture<MovieListPopular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListPopular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListPopular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
