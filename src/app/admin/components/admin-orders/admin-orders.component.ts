import { Component } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { Order } from '../../../shared/models/app-order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders();
  }
}
