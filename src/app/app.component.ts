import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(auth: AuthService, router: Router, userService: UserService) {
    auth.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);

      const url = localStorage.getItem('returnUrl');

      if (!url) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(url);
    });
  }
}
