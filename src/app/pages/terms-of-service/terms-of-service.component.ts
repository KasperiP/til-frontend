import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'til-terms-of-service',
  standalone: true,
  imports: [],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsOfServiceComponent {}
