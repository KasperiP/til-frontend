import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  filter,
  fromEvent,
  map,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs';
import { PostsService } from '../../core/services/posts.service';
import { Posts } from './models/posts.model';

@Component({
  selector: 'til-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit, OnDestroy {
  limit = 10;
  loadingSig = signal(false);
  posts$ = new BehaviorSubject<Posts[]>([]);
  private offset$ = new BehaviorSubject<number>(0);
  private readonly onDestroy$ = new Subject<void>();
  private scrollEvent$ = fromEvent(window, 'scroll');
  private loading = false;
  private hasMorePosts = true;

  constructor(private readonly postsService: PostsService) {
    this.offset$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((offset) => {
          this.setLoading(true);
          return this.postsService.getPosts(this.limit, offset);
        }),
        tap((posts) => {
          if (!posts.hasMore) {
            this.hasMorePosts = false;
          }
          this.setLoading(false);
          this.posts$.next(this.posts$.getValue().concat(posts.posts));
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.scrollEvent$
      .pipe(
        throttleTime(100),
        map(() => this.isNearBottom()),
        filter(
          (isNearBottom) => isNearBottom && !this.loading && this.hasMorePosts,
        ),
        takeUntil(this.onDestroy$),
      )
      .subscribe(() => {
        this.loadMorePosts();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private isNearBottom(): boolean {
    return (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
    );
  }

  private loadMorePosts(): void {
    if (!this.loading && this.hasMorePosts) {
      const currentOffset = this.offset$.getValue();
      this.offset$.next(currentOffset + this.limit);
    }
  }

  private setLoading(value: boolean): void {
    this.loadingSig.set(value);
    this.loading = value;
  }
}
