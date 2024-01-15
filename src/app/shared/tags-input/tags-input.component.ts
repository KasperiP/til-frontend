import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'til-tags-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tags-input.component.html',
  styleUrl: './tags-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsInputComponent {
  @Output() tags = new EventEmitter<string[]>();
  tagsSig = signal<string[]>([]);
  readonly tagsControl: FormControl;

  constructor() {
    this.tagsControl = new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(20)],
    });
  }

  @Input() set tagsIn(tags: string[] | null) {
    this.tagsSig.set(tags ?? []);
  }

  addTag() {
    if (this.tagsControl.invalid) return;
    const tag = this.tagsControl.value?.trim()?.toLowerCase();
    if (!tag) return;
    const tags = this.tagsSig();
    if (tags.includes(tag) || tags.length === 3) return;
    this.tagsSig.update((tags) => [...tags, tag]);
    this.tagsControl.reset();
    this.tags.emit(this.tagsSig());
  }

  removeTag(tag: string) {
    this.tagsSig.update((tags) => tags.filter((t) => t !== tag));
    this.tags.emit(this.tagsSig());
  }
}
