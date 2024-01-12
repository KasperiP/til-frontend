import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'til-writer',
  standalone: true,
  imports: [MarkdownComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './writer.component.html',
  styleUrl: './writer.component.scss',
})
export class WriterComponent {
  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
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
          Validators.minLength(10),
          Validators.maxLength(5000),
        ],
      ],
    });
  }

  submit(): void {
    if (this.form.valid) {
      //TODO: Implement submit
    }
  }
}
