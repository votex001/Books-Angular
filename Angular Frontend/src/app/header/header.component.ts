import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], // Fixed the property name
})
export class HeaderComponent {
  // Define links as a class property
  links = [
    { title: 'Profile', to: '/profile' },
    { title: 'Login', to: '/login' },
    {
      title: 'Sign out',
      to: '',
      onClick: async (e: Event) => {
        e.preventDefault();
        // Replace `userService.logout()` with actual implementation
        console.log('Logged out');
      },
    },
  ];
  constructor(private matIconRegistry: MatIconRegistry,private domSanitizer:DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/logo.svg")
    )
  }
}
