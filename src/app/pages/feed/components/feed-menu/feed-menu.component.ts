import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiStatistics,
  ApiUserStatistics,
} from '../../../../core/models/api.model';
import { UserService } from '../../../../core/services/user.service';

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
  isLoggedIn$: Observable<boolean> = this.userService.isLoggedIn$;

  constructor(private readonly userService: UserService) {}
}
