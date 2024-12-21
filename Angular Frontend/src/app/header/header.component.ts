import { Component } from '@angular/core';

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

  
}
