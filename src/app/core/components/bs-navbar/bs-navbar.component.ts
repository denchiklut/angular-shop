import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';
import { AppCart } from '../../../shared/models/app-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<AppCart>;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
    this.auth.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.cartService.getCart();
  }

  logout(): void {
    this.auth.logout();
  }

}
