import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'login-page',
  standalone: false,

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public isErr: boolean = false;
  errMsg: string = '';
  networkErr: boolean = false;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public useService: UserService
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg')
    );
  }

  onSubmit = () => {
    this.isErr = false;
    this.errMsg = '';
    this.networkErr = false;
    const { password, email } = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.isErr = true;
      this.useService.setCredentials();
      return;
    }
    if (email && password) {
      this.useService.setCredentials({ email, password }).subscribe({
        next: (user) => {
          if (!user) {
            this.errMsg = 'Invalid password or login';
          }
        },
        error: ({ err, serverProblem }) => {
          console.log(err);
          this.errMsg = err;
          if (serverProblem) {
            this.networkErr = true;
          }
        },
      });
    }
  };
}
