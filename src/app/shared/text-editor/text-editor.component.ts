import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import hljs from 'highlight.js';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'til-text-editor',
  standalone: true,
  imports: [QuillModule, FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
})
export class TextEditorComponent {
  html = '';
  tools = {
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['code-block'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'], // remove formatting button
      ['link', 'image'], // link and image, video
    ],
  };
}
