import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../Models/app-user';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(user => this.appUser = user);
  }

  logout(): void {
    this.auth.logout();
  }
}
