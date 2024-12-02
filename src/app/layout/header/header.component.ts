import { Component } from '@angular/core';
import { LogoutClient } from "../../auth/logout/client/logout.client";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'ord-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private logoutClient: LogoutClient,
              private authService: AuthService,
              private router: Router) {
  }
  onLogout() {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      this.logoutClient.logout(accessToken).subscribe({
        next: (response) => {
          console.log('Logout successfully', response);
          this.authService.clearAccessToken();
          this.router.navigate(['/login']).then();
        },
        error: (err) => {
          console.error('Logout failed', err);
        }
      })
    } else {
      console.warn('No access token');
    }
  }
}
