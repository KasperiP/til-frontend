import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SupportedOauthProviders } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import { navButtons } from './nav-buttons';

@Component({
  selector: 'til-auth-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('authModal')
  authModal: ElementRef<HTMLDialogElement> | undefined;

  readonly buttons = navButtons;
  readonly SupportedOauthProviders = SupportedOauthProviders;

  constructor(private readonly authService: AuthService) {}

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

  onAuth(type: SupportedOauthProviders): void {
    switch (type) {
      case SupportedOauthProviders.GOOGLE:
        this.authService.signInWithGoogle();
        break;
      case SupportedOauthProviders.GITHUB:
        this.authService.signInWithGithub();
        break;
      case SupportedOauthProviders.LINKEDIN:
        this.authService.signInWithLinkedin();
        break;
      default:
        break;
    }
  }
}
