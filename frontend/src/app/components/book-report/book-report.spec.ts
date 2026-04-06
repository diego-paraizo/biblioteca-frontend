import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReport } from './book-report';

describe('BookReport', () => {
  let component: BookReport;
  let fixture: ComponentFixture<BookReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookReport],
    }).compileComponents();

    fixture = TestBed.createComponent(BookReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
