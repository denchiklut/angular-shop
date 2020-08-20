import { Component, Input } from '@angular/core';
import { Product } from '../Models/app-product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product: Product;
  @Input() showActions = true;

  constructor() { }

}
