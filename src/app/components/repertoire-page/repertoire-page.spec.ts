import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoirePage } from './repertoire-page';

describe('RepertoirePage', () => {
  let component: RepertoirePage;
  let fixture: ComponentFixture<RepertoirePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepertoirePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepertoirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
