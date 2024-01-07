import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnedCardsComponent } from './learned-cards.component';

describe('LearnedCardsComponent', () => {
  let component: LearnedCardsComponent;
  let fixture: ComponentFixture<LearnedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnedCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
