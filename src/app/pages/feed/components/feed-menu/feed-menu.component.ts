import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApiStatistics } from '../../../../core/models/api.model';

@Component({
  selector: 'til-feed-menu',
  standalone: true,
  imports: [],
  templateUrl: './feed-menu.component.html',
  styleUrl: './feed-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedMenuComponent {
  @Input() stats: ApiStatistics | null = null;
}
