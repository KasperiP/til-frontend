import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { FeedMenuComponent } from './components/feed-menu/feed-menu.component';
import { TilItemComponent } from './components/til-item/til-item.component';
import { Posts } from './models/posts.model';

@Component({
  selector: 'til-feed',
  standalone: true,
  imports: [CommonModule, TilItemComponent, FeedMenuComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {
  readonly postsSig = signal<Posts[]>([]);
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
    this.postsService.getPosts(this.limit, offset).subscribe((posts) => {
      this.postsSig.update((oldPosts) => [...oldPosts, ...posts.posts]);
      this.triggerId = posts.posts[posts.posts.length - 1]?.postId;
      this.hasMore = posts.hasMore;
      this.loadingSig.set(false);
    });
  };
}
