import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedMenuComponent } from './feed-menu.component';

describe('FeedMenuComponent', () => {
  let component: FeedMenuComponent;
  let fixture: ComponentFixture<FeedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
