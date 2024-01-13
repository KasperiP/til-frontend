import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import {
  ApiError,
  ApiPreviewPost,
  ApiPreviewPosts,
} from '../../core/models/api.model';
import { PostsService } from '../../core/services/posts.service';
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
  readonly loadingSig = signal(false);
  private triggerId: number | null = null;
  private hasMore = true;
  private readonly limit = 10;

  constructor(private readonly postsService: PostsService) {
    this.loadPosts();
  }

  loaded(id: number) {
    if (this.triggerId === id) {
      this.loadPosts(this.postsSig().length);
    }
  }

  private loadPosts = (offset = 0) => {
    if (!this.hasMore) return;
    this.loadingSig.set(true);
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
          this.loadingSig.set(false);
        }),
        catchError((e: ApiError) => {
          return of(e);
        }),
      )
      .subscribe();
  };
}
