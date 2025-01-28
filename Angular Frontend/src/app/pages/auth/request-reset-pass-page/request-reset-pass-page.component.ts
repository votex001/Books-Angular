import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'request-reset-pass-page',
  standalone: false,
  templateUrl: './request-reset-pass-page.component.html',
  styleUrl: './request-reset-pass-page.component.scss',
})
export class RequestResetPassPageComponent {
  private route = inject(ActivatedRoute);
  private tokenStatus = toSignal(
    this.route.data.pipe(map((data) => data['tokenStatus']))
  );
  public resetFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  isErr: boolean = false;
  sended: boolean = false;

  constructor(private userService: UserService) {}
 
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
