import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'til-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
