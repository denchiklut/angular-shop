import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from './Models/app-order';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore, private cartService: ShoppingCartService) { }

  addOrder(order: Order): Promise<string> {
    const { createdAt, shipping, userId, items: products } = order;

    return this.db
      .collection('orders')
      .add({ shipping, createdAt, userId })
      .then(res => res.id)
      .then(id => {
        const ref = this.db.doc('orders/' + id).collection('items');

        for (const p of products) ref.doc(p.product.id).set({ ...p });
        return id;
      })
      .then((key) => {
        this.cartService.clearCart();
        return key;
      });
  }

  getOrders(): Observable<Order[]> {
    return this.db.collection<Order>('orders')
      .snapshotChanges()
      .pipe(
        map(action => action.map(order => order.payload.doc.data()))
      );
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.db.collection<Order>('orders', ref => {
      return ref.where('userId', '==', userId);
    })
      .snapshotChanges()
      .pipe(
          map(action => action.map(order => order.payload.doc.data()))
      );
  }
}
