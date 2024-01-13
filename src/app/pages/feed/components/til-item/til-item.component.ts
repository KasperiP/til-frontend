import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ApiPreviewPost } from '../../../../core/models/api.model';

@Component({
  selector: 'til-til-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './til-item.component.html',
  styleUrl: './til-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TilItemComponent implements OnInit {
  @Input({ required: true }) post!: ApiPreviewPost;
  @Output() loaded = new EventEmitter<number>();

  ngOnInit() {
    this.loaded.emit(this.post.postId);
  }
}
