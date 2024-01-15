import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import {
  ApiStatistics,
  ApiUserStatistics,
} from '../../../../core/models/api.model';

@Component({
  selector: 'til-feed-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed-menu.component.html',
  styleUrl: './feed-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedMenuComponent {
  @Input() userStats: ApiUserStatistics | null = null;
  @Input() globalStats: ApiStatistics | null = null;
  @Input() loadingUserStats = false;
  @Input() loadingGlobalStats = false;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: string) {}

  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('isLoggedIn');
    }
    return false;
  }
}
