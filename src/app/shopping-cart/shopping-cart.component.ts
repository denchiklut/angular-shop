import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { AppCart } from '../Models/app-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<AppCart>;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
