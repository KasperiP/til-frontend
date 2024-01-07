import { Component } from '@angular/core';
import { TextEditorComponent } from '../../shared/text-editor/text-editor.component';

@Component({
  selector: 'til-home',
  standalone: true,
  imports: [TextEditorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
