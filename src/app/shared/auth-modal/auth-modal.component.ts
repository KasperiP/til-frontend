import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { navButtons } from './nav-buttons';

@Component({
  selector: 'til-auth-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('authModal')
  authModal: ElementRef<HTMLDialogElement> | undefined;

  readonly buttons = navButtons;

  @Input()
  set show(value: boolean | undefined) {
    if (this.authModal?.nativeElement && value) {
      this.authModal.nativeElement.showModal();
    }
  }

  onClose(): void {
    this.authModal?.nativeElement.close();
    this.closeModal.emit();
  }
}
