import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'til-navbar',
  standalone: true,
  imports: [AuthModalComponent, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  showAuthModalSig = signal(false);
  user$ = this.userService.user$;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
    this.loadUser();
  }

  logout(): void {
    this.userService.clearUser();
    this.authService.logout().pipe(take(1)).subscribe();
    this.router.navigate(['/']);
  }

  toggleAuthModal(): void {
    this.showAuthModalSig.update((value) => !value);
  }

  closeMenu() {
    (document.activeElement as any)?.blur();
  }

  private loadUser() {
    this.userService.getUser().pipe(take(1)).subscribe();
  }
}
