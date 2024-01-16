import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import {
  Subject,
  catchError,
  finalize,
  map,
  of,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { ApiError } from '../../core/models/api.model';
import { PostsService } from '../../core/services/posts.service';
import { TagsInputComponent } from '../../shared/tags-input/tags-input.component';

@Component({
  selector: 'til-new-post',
  standalone: true,
  imports: [
    MarkdownComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TagsInputComponent,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loadingSig = signal(false);
  errorSig = signal<null | ApiError>(null);
  formSuccessSig = signal(false);
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly postsService: PostsService,
  ) {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(5000),
        ],
      ],
      tags: [[]],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => {
          this.formSuccessSig.set(false);
          this.errorSig.set(null);
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  handleTags(tags: string[]) {
    this.form.get('tags')?.setValue(tags);
  }

  submit(): void {
    this.form.markAllAsTouched();
    this.errorSig.set(null);
    this.formSuccessSig.set(false);
    if (!this.form.valid) return;
    this.loadingSig.set(true);
    this.postsService
      .createPost(this.form.value)
      .pipe(
        take(1),
        map(() => {
          this.form.reset();
          this.formSuccessSig.set(true);
        }),
        catchError((e: ApiError) => {
          this.errorSig.set(e);
          this.formSuccessSig.set(false);
          return of();
        }),
        finalize(() => this.loadingSig.set(false)),
      )
      .subscribe();
  }
}
