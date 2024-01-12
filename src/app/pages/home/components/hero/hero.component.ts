import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'til-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
