import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { emailStatus, UserService } from '../../../services/user/user.service';
import { interval, map, Subscription, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'confirm-email',
  standalone: false,

  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private emailStatus = toSignal<emailStatus>(
    this.route.data.pipe(map((data) => data['emailStatus']))
  );
  private timerSubscription: Subscription | null = null;

  public countdown: number = 0;
  public showForm: boolean = true;
  public showErr: boolean = false;
  public email: string | null = null;
  public confirmForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });
  public isErr: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email');
    });
    const status = this.emailStatus();
    if (!status?.exist || status.isVerified) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }
  private startTimer() {
    this.countdown = 59;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000)
      .pipe(take(59)) // Ограничиваем до 60 секунд
      .subscribe({
        next: () => {
          this.countdown = this.countdown - 1;
        },
        complete: () => {},
      });
  }

  onSubmitForm() {
    this.isErr = false;
    if (this.confirmForm.invalid) {
      this.isErr = true;
      return;
    }
    if (this.email && this.confirmForm.value.code) {
      this.userService
        .confirmNewEmail({
          email: this.email,
          code: this.confirmForm.value.code,
        })
        .subscribe({
          next: (user: any) => {
            if (user.isVerified) {
              this.router.navigate(['/']);
            }
          },
          error: (err) => {
            this.isErr = true;
          },
        });
    }
  }

  onSendAgain() {
    if (this.countdown > 0) {
      return;
    }
    this.startTimer();
    if (this.email) {
      this.userService
        .resendConfirmCode(this.email)
        .subscribe((ans) => console.log(ans));
    }
  }
}
