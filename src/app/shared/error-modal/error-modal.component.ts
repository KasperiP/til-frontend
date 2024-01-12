import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'til-error-modal',
  standalone: true,
  imports: [],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('errorModal')
  errorModal: ElementRef<HTMLDialogElement> | undefined;
  @Input() error: string | undefined = '';
  @Input() wantedProvider: string | undefined = '';

  @Input()
  set show(value: boolean | undefined) {
    if (this.errorModal?.nativeElement && value) {
      this.errorModal.nativeElement.showModal();
    }
  }

  onClose(): void {
    this.errorModal?.nativeElement.close();
    this.closeModal.emit();
  }
}
