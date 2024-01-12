import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'til-feed-menu',
  standalone: true,
  imports: [],
  templateUrl: './feed-menu.component.html',
  styleUrl: './feed-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedMenuComponent {}
