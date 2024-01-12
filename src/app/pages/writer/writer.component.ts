import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
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
import { ApiResponse } from '../../core/models/api.model';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'til-writer',
  standalone: true,
  imports: [MarkdownComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './writer.component.html',
  styleUrl: './writer.component.scss',
})
export class WriterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loadingSig = signal(false);
  errorSig = signal<null | ApiResponse>(null);
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
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(5000),
        ],
      ],
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
        catchError((e) => {
          this.errorSig.set(e);
          this.formSuccessSig.set(false);
          return of();
        }),
        finalize(() => this.loadingSig.set(false)),
      )
      .subscribe();
  }
}
