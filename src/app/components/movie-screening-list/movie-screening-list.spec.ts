import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieScreeningList } from './movie-screening-list';

describe('MovieScreeningList', () => {
  let component: MovieScreeningList;
  let fixture: ComponentFixture<MovieScreeningList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieScreeningList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieScreeningList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
