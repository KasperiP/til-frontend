import { Component } from '@angular/core';
import { TextEditorComponent } from '../../shared/text-editor/text-editor.component';

@Component({
  selector: 'til-writer',
  standalone: true,
  imports: [TextEditorComponent],
  templateUrl: './writer.component.html',
  styleUrl: './writer.component.scss',
})
export class WriterComponent {
  constructor() {}
}
