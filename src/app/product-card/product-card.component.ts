import { Component, Input } from '@angular/core';
import { Product } from '../Models/app-product';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppCart } from '../Models/app-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product: Product;
  @Input() showActions = true;
  @Input() shoppingCart: AppCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(): void {
   this.cartService.addToCart(this.product);
  }
}
