import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppCart } from '../Models/app-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<AppCart>;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartService.getCart();
  }
}
