import { Component, Input } from '@angular/core';
import { Product } from '../../models/app-product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { AppCart } from '../../models/app-cart';

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
