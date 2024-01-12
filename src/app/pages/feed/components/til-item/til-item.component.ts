import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Posts } from '../../models/posts.model';

@Component({
  selector: 'til-til-item',
  standalone: true,
  imports: [],
  templateUrl: './til-item.component.html',
  styleUrl: './til-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TilItemComponent implements OnInit {
  @Input({ required: true }) post!: Posts;
  @Output() loaded = new EventEmitter<number>();

  ngOnInit() {
    this.loaded.emit(this.post.postId);
  }
}
