import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { catchError, of, take, tap } from 'rxjs';
import {
  ApiError,
  ApiPreviewPost,
  ApiPreviewPosts,
  ApiStatistics,
  ApiUserStatistics,
} from '../../core/models/api.model';
import { PostsService } from '../../core/services/posts.service';
import { UserService } from '../../core/services/user.service';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { FeedMenuComponent } from './components/feed-menu/feed-menu.component';

@Component({
  selector: 'til-feed',
  standalone: true,
  imports: [CommonModule, FeedItemComponent, FeedMenuComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {
  readonly postsSig = signal<ApiPreviewPost[]>([]);
  readonly userStatsSig = signal<ApiUserStatistics | null>(null);
  readonly globalStatsSig = signal<ApiStatistics | null>(null);
  readonly loadingPostsSig = signal(false);
  readonly loadingUserStatsSig = signal(false);
  readonly loadingGlobalStatsSig = signal(false);
  private triggerId: number | null = null;
  private hasMore = true;
  private readonly limit = 10;

  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UserService,
  ) {
    this.loadPosts();
    this.loadStats();
  }

  loaded(id: number) {
    if (this.triggerId === id) {
      this.loadPosts(this.postsSig().length);
    }
  }

  private loadPosts = (offset = 0) => {
    if (!this.hasMore) return;
    this.loadingPostsSig.set(true);
    this.postsService
      .getPosts(this.limit, offset)
      .pipe(
        tap((posts) => {
          const postsResponse = posts as ApiPreviewPosts;
          this.postsSig.update((oldPosts) => [
            ...oldPosts,
            ...postsResponse.posts,
          ]);
          this.triggerId =
            postsResponse.posts[postsResponse.posts.length - 1]?.postId;
          this.hasMore = postsResponse.hasMore;
          this.loadingPostsSig.set(false);
        }),
        catchError((e: ApiError) => {
          return of(e);
        }),
      )
      .subscribe();
  };

  private loadStats() {
    this.loadingUserStatsSig.set(true);
    this.loadingGlobalStatsSig.set(true);
    this.userService
      .getUserStatistics()
      .pipe(
        take(1),
        tap((res) => {
          if ('isError' in res) return;
          this.userStatsSig.set(res);
          this.loadingUserStatsSig.set(false);
        }),
      )
      .subscribe();

    this.postsService
      .getStatistics()
      .pipe(
        take(1),
        tap((res) => {
          if ('isError' in res) return;
          this.globalStatsSig.set(res);
          this.loadingGlobalStatsSig.set(false);
        }),
      )
      .subscribe();
  }
}
