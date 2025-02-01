import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;
  constructor(private router: Router) {}
  ngOnInit(): void {
    // Listen for route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide the header on specific routes
        const hiddenRoutes = ['/login', '/signup'];
        const confirmRoutePattern = /^\/confirm\/.+$/;
        const resetRoutePattern = /^\/resetPassword/;
        this.showHeader =
          !hiddenRoutes.includes(event.urlAfterRedirects) &&
          !confirmRoutePattern.test(event.urlAfterRedirects) &&
          !resetRoutePattern.test(event.urlAfterRedirects);
      }
    });
  }
}
