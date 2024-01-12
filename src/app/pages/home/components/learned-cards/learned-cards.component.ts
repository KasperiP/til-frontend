import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'til-learned-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learned-cards.component.html',
  styleUrl: './learned-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('hoverAnimation', [
      state('normal', style({ transform: 'translateY(0)' })),
      state('hovered', style({ transform: 'translateY(-5px)' })),
      transition('normal => hovered', animate('200ms ease-in')),
      transition('hovered => normal', animate('200ms ease-out')),
    ]),
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(
          250,
          keyframes([
            style({ opacity: 0, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class LearnedCardsComponent {
  items = [
    {
      color: 'bg-yellow-200',
      count: '100+',
      text: 'Users',
      hoverState: 'normal',
    },
    {
      color: 'bg-blue-200',
      count: '450+',
      text: 'Learned things',
      hoverState: 'normal',
    },
    {
      color: 'bg-pink-200',
      count: '450+',
      text: 'Longest streak',
      hoverState: 'normal',
    },
    {
      color: 'bg-green-200',
      count: '450+',
      text: 'Given likes',
      hoverState: 'normal',
    },
  ];

  next: number = 0;
  staggeringItems: any[] = [];

  constructor() {
    this.doNext();
  }

  onMouseEnter(item: any) {
    item.hoverState = 'hovered';
  }

  onMouseLeave(item: any) {
    item.hoverState = 'normal';
  }

  doNext() {
    if (this.next < this.items.length) {
      this.staggeringItems.push(this.items[this.next++]);
    }
  }
}
