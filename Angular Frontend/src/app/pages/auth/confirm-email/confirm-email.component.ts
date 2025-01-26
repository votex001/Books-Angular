import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { emailStatus } from '../../../services/user/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'confirm-email',
  standalone: false,

  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public showForm: boolean = true;
  email_ = toSignal<emailStatus>(
    this.route.data.pipe(map((data) => data['emailStatus']))
  );
  ngOnInit(): void {
    const status = this.email_();
    if (!status?.exist || status.isVerified) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }
}
