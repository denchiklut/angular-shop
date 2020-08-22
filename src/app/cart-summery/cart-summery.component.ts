import { Component, Input, OnInit } from '@angular/core';
import { AppCart } from '../Models/app-cart';

@Component({
  selector: 'app-cart-summery',
  templateUrl: './cart-summery.component.html',
  styleUrls: ['./cart-summery.component.css']
})
export class CartSummeryComponent implements OnInit {
  @Input() cart: AppCart;

  constructor() { }

  ngOnInit(): void {
  }

}
