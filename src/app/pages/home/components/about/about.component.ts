import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'til-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
