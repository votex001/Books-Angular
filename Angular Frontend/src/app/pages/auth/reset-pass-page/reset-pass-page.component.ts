import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'reset-pass-page',
  standalone: false,

  templateUrl: './reset-pass-page.component.html',
  styleUrl: './reset-pass-page.component.scss',
})
export class ResetPassPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tokenStatus = toSignal(
    this.route.data.pipe(map((data) => data['tokenStatus']))
  );

  public resetForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),
      confPass: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordsMatchValidator }
  );
  public incorrectToken: boolean = false;
  public email: string | null = null;
  public isErr: boolean = false;
  public success: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.tokenStatus().success) {
      this.incorrectToken = true;
      return;
    }
    this.email = this.tokenStatus().email;
  }

  private passwordsMatchValidator(
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPass = formGroup.get('confPass')?.value;

    if (password !== confirmPass) {
      return { passwordsMismatch: true }; // Return an error if they don't match
    }

    return null; // No error
  }

  onSubmit() {
    this.isErr = false;

    if (this.resetForm.invalid || !this.resetForm.value.password) {
      this.isErr = true;
      return;
    }

    this.userService
      .resetPassword({
        token: this.tokenStatus().token,
        newPassword: this.resetForm.value.password,
      })
      .subscribe((ans: any) => {
        if (ans.success) {
          this.success = true;
        }
      });
  }
}
