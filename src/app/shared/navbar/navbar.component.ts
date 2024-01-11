import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'til-navbar',
  standalone: true,
  imports: [AuthModalComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  showAuthModalSig = signal(false);
  user$ = this.userService.user$;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  logout(): void {
    this.userService.clearUser();
    this.authService.logout().pipe(take(1)).subscribe();
  }

  toggleAuthModal(): void {
    this.showAuthModalSig.update((value) => !value);
  }

  ngOnInit(): void {
    const user = this.user$.value;
    if (!user) {
      this.userService.getUser().pipe(take(1)).subscribe();
    }
  }
}
