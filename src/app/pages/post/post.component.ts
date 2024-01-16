import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { ApiError, ApiPost } from '../../core/models/api.model';
import { PostsService } from '../../core/services/posts.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'til-post',
  standalone: true,
  imports: [CommonModule, MarkdownComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, OnDestroy {
  postSig = signal<ApiPost | null>(null);
  loadingSig = signal<boolean>(true);
  isLoggedIn$: Observable<boolean> = this.userService.isLoggedIn$;
  user$ = this.userService.user$;
  likeRequest$ = new Subject<string>();
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private userService: UserService,
    private router: Router,
    private meta: Meta,
    private title: Title,
  ) {
    this.loadPost();
  }

  ngOnInit() {
    this.likeRequest$
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(500),
        switchMap((id) => this.likePost(id)),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private likePost(id: string): Observable<ApiPost | ApiError> {
    return this.postsService.likePost(id).pipe(
      switchMap(() =>
        this.postsService.getPost(id).pipe(
          tap((post) => {
            if ('isError' in post) return;
            this.postSig.set(post);
          }),
        ),
      ),
    );
  }

  private loadPost = () => {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.postsService
      .getPost(id)
      .pipe(
        tap((post) => {
          if ('isError' in post) return;
          this.postSig.set(post);
          this.title.setTitle(
            `${post.title} | by ${post.name} | Today I Learned`,
          );
          this.loadingSig.set(false);
          this.updateMetaTags(post);
        }),
        catchError(() => this.router.navigate(['/'])),
      )
      .subscribe();
  };

  private updateMetaTags(post: ApiPost) {
    const ogUrl = new URL('https://og.learnedtoday.app/api/og');
    ogUrl.searchParams.append('title', post.title);
    ogUrl.searchParams.append('author', post.name);
    ogUrl.searchParams.append(
      'published',
      new Date(post.postCreatedAt).toDateString(),
    );
    ogUrl.searchParams.append('image', post.image);

    const tags = [
      { name: 'og:image', content: ogUrl.toString() },
      { name: 'twitter:image', content: ogUrl.toString() },
      {
        name: 'og:url',
        content: `https://learnedtoday.app/post/${post.postId}`,
      },
      {
        name: 'twitter:url',
        content: `https://learnedtoday.app/post/${post.postId}`,
      },
      { name: 'og:title', content: post.title },
      { name: 'twitter:title', content: post.title },
      { name: 'og:description', content: post.description },
      { name: 'twitter:description', content: post.description },
      { name: 'og:type', content: 'article' },
      { name: 'keywords', content: post.tags.join(', ') },
    ];

    tags.forEach((tag) => this.meta.updateTag(tag, `property='${tag.name}'`));
  }
}
