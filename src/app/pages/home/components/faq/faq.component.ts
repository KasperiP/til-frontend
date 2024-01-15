import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'til-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {}
