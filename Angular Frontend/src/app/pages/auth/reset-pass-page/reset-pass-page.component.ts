import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'reset-pass-page',
  standalone: false,

  templateUrl: './reset-pass-page.component.html',
  styleUrl: './reset-pass-page.component.scss',
})
export class ResetPassPageComponent {
  resetFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  isErr: boolean = false;
  sended: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.isErr = false;
    if (this.resetFrom.invalid) {
      this.isErr = true;
      return;
    }
    const { email } = this.resetFrom.value;
    if (email) {
      this.userService.sendResetPassword(email).subscribe({
        next: (ans: any) => {
          if (!ans.ok) {
            this.isErr = true;
            return;
          }
          this.sended = true;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
