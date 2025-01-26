import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sing-in-page',
  standalone: false,

  templateUrl: './sing-up-page.component.html',
  styleUrl: './sing-up-page.component.scss',
})
export class SingUpPageComponent {
  private subscription: Subscription | null = null;

  isErr: boolean = false;
  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPass: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordsMatchValidator }
  );

  constructor(private userService: UserService, private router: Router) {}

  private passwordsMatchValidator(
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPass = formGroup.get('confirmPass')?.value;

    if (password !== confirmPass) {
      return { passwordsMismatch: true }; // Return an error if they don't match
    }

    return null; // No error
  }
  public onSubmit = () => {
    this.resetErrors();
    if (!this.signUpForm.valid) {
      this.isErr = true;
      return;
    }
    const { email, password, fullName } = this.signUpForm.value;
    if (email && password && fullName) {
      this.subscription = this.userService
        .signUp({ email, password, fullName })
        .subscribe({
          next: (ans: any) => {
            if (ans.status === 201) {
              this.router.navigate([`/confirm/${email}`]);
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
          },
        });
    }
  };

  public resetErrors = () => {
    this.isErr = false;
  };
}
