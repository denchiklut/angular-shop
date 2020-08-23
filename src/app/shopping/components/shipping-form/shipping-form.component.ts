import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order, Shipping } from '../../../shared/models/app-order';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { AppCart } from '../../../shared/models/app-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart: AppCart;

  userSubscription: Subscription;
  userId: string;
  shipping: Shipping = {
    city: '',
    addressLine1: '',
    addressLine2: '',
    name: ''
  };

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  async createOrder(): Promise<void> {
    const order = new Order(this.userId, this.shipping, this.cart);
    const orderId = await this.orderService.addOrder(order);

    this.router.navigate(['/order-success', orderId]);
  }

  async ngOnInit(): Promise<void> {
    this.userSubscription = this.authService.user$.subscribe(usr => this.userId = usr.uid);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
