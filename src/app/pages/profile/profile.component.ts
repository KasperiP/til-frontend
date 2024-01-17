import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'til-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  readonly usernameControl: FormControl;
  readonly user$ = this.userService.user$;

  constructor(private readonly userService: UserService) {
    this.usernameControl = new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(30)],
    });
  }

  changeUsername() {
    // TODO: implement
  }
}
