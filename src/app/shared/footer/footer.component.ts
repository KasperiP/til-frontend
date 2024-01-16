import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'til-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  isLoggedIn$: Observable<boolean> = this.userService.isLoggedIn$;

  constructor(private readonly userService: UserService) {}

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
