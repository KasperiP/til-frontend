import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { catchError, filter, of, switchMap, take, tap } from 'rxjs';
import { ApiPost } from '../../core/models/api.model';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'til-post',
  standalone: true,
  imports: [CommonModule, MarkdownComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  postSig = signal<ApiPost | null>(null);

  constructor(
    private route: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly router: Router,
    private readonly meta: Meta,
    private readonly title: Title,
  ) {
    this.loadPost();
  }

  private loadPost = () => {
    this.route.params
      .pipe(
        take(1),
        filter((param) => !!param?.['id']),
        switchMap((param) => {
          return this.postsService.getPost(param['id']);
        }),
        tap((post) => {
          post = post as ApiPost;
          this.postSig.set(post as ApiPost);
          this.title.setTitle(
            `${post.title} | by ${post.name} | Today I Learned`,
          );

          const ogUrl = new URL('https://og.til.kassq.dev/api/og');
          ogUrl.searchParams.append('title', post.title);
          ogUrl.searchParams.append('author', post.name);
          ogUrl.searchParams.append(
            'published',
            new Date(post.postCreatedAt).toDateString(),
          );
          ogUrl.searchParams.append('image', post.image);

          this.meta.updateTag(
            { name: 'og:image', content: ogUrl.toString() },
            "property='og:image'",
          );
          this.meta.updateTag(
            { name: 'twitter:image', content: ogUrl.toString() },
            "property='twitter:image'",
          );
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return of();
        }),
      )
      .subscribe();
  };
}
