import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiPreviewPost } from '../../../../core/models/api.model';

@Component({
  selector: 'til-feed-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feed-item.component.html',
  styleUrl: './feed-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedItemComponent implements OnInit {
  @Input({ required: true }) post!: ApiPreviewPost;
  @Output() loaded = new EventEmitter<number>();

  ngOnInit() {
    this.loaded.emit(this.post.postId);
  }
}
