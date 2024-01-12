import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tilItems } from './til-items';

@Component({
  selector: 'til-latest-preview',
  standalone: true,
  imports: [],
  templateUrl: './latest-preview.component.html',
  styleUrl: './latest-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestPreviewComponent {
  readonly tilItems = tilItems;

  gridTemp = Array(10).fill(0);
}
