import { Component } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../../shared/models/app-order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
  }

}
