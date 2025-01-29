import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-page',
  standalone: false,

  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private router = inject(Router);
  private subscription: Subscription | null = null;
  public user: User | null = null;

  ngOnInit(): void {
    this.subscription = this.userService.login().subscribe((ans) => {
      if (!ans) {
        this.router.navigate(['/login']);
      }
      this.user = ans;
    });
  }

  onSubmit(event: any) {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    console.log(file);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
