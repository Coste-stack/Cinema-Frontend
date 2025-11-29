import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListLatest } from './movie-list-latest';

describe('MovieListLatest', () => {
  let component: MovieListLatest;
  let fixture: ComponentFixture<MovieListLatest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListLatest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListLatest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
