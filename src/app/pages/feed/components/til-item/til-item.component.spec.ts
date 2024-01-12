import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilItemComponent } from './til-item.component';

describe('TilItemComponent', () => {
  let component: TilItemComponent;
  let fixture: ComponentFixture<TilItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TilItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
