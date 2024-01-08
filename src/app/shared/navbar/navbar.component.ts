import { Component, signal } from '@angular/core';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'til-navbar',
  standalone: true,
  imports: [AuthModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  showAuthModalSig = signal(false);

  toggleAuthModal(): void {
    this.showAuthModalSig.update((value) => !value);
  }
}
