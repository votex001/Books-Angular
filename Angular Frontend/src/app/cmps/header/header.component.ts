import { Component, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  private subscription: Subscription | null = null;

  public user: User | null = null;
  public links: Array<{
    title: string;
    to?: string;
    hidden?: boolean;
    onClick?: (e: Event) => void;
  }> = [];

  public hidden: boolean = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg')
    );
    this.subscription = this.userService.login().subscribe({
      next: (user) => {
        this.user = user;
        this.updateLinks();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.updateLinks();
  }
  private updateLinks() {
    this.links = [
      { title: 'Profile', to: '/profile', hidden: !this.user },
      { title: 'Login', to: '/login', hidden: !!this.user },
      {
        title: 'Sign out',
        hidden: !!this.user,
        onClick: async (e: Event) => {
          e.preventDefault();
          await this.userService.logout();
          this.user = null;
          this.updateLinks();
        },
      },
    ];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
