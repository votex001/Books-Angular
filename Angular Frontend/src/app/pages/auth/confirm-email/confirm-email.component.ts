import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { emailStatus, UserService } from '../../../services/user/user.service';
import { first, interval, map, Subscription, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'confirm-email',
  standalone: false,

  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private emailStatus = toSignal<emailStatus>(
    this.route.data.pipe(map((data) => data['emailStatus']))
  );
  private timerSubscription: Subscription | null = null;
  private confirmSubscription: Subscription | null = null;

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
      .pipe(take(59))
      .subscribe({
        next: () => {
          this.countdown = this.countdown - 1;
        },
        complete: () => {
          if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
          }
        },
      });
  }

  onSubmitForm() {
    this.isErr = false;
    if (this.confirmForm.invalid) {
      this.isErr = true;
      return;
    }
    if (this.email && this.confirmForm.value.code) {
      this.confirmSubscription = this.userService
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
          error: () => {
            this.isErr = true;
          },
        });
    }
  }

  onSendAgain() {
    if (this.countdown > 0 || !this.email) return;

    this.startTimer();
    this.userService.resendConfirmCode(this.email).subscribe();
  }

  ngOnDestroy(): void {
    if (this.confirmSubscription) {
      this.confirmSubscription.unsubscribe();
    }
  }
}
