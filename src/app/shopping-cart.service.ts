import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AppCart, CartItem } from './Models/app-cart';
import { Product } from './Models/app-product';
import { Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }

  addToCart(product: Product): void {
    this.updateCartProduct(product, 1);
  }

  removeFromCart(product: Product): void {
    this.updateCartProduct(product, -1);
  }

  async clearCart(): Promise<void> {
    const cartId = await this.getCartId();
    this.db
      .doc('shopping-carts/' + cartId)
      .collection<CartItem>('items')
      .get()
      .pipe(
        take(1),
        map(data => data.forEach(document => document.ref.delete()))
      ).subscribe();
  }

  private create(): Promise<DocumentReference> {
    return this.db.collection('shopping-carts').add({
      dateCreated: Date.now()
    });
  }

  private async getCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const res = await this.create();
    localStorage.setItem('cartId', res.id);
    return res.id;
  }

  private getCartItem(cartId: string, productId: string): AngularFirestoreDocument<CartItem> {
    return this.db.doc<CartItem>('shopping-carts/' + cartId + '/items/' + productId);
  }

  private getCartItems(cartId: string): Observable<CartItem[]> {
    return this.db
      .doc<AppCart>('shopping-carts/' + cartId)
      .collection<CartItem>('items')
      .snapshotChanges()
      .pipe(
        map(action => action.map(data => data.payload.doc.data()))
      );
  }

  private async updateCartProduct(product: Product, change: number): Promise<void> {
    const cartId  = await this.getCartId();
    const item$ = this.getCartItem(cartId, product.id);

    item$.get()
      .subscribe(doc => {
        const quantity = doc.exists ? doc.data().quantity + change : change;

        if (quantity === 0) item$.delete();
        else item$.set({ product, quantity, totalPrice: 0 });
      });
  }

  async getCart(): Promise<Observable<AppCart>> {
    const cartId = await this.getCartId();

    return this.db.doc<AppCart>( 'shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map(_ => (new AppCart())),
        mergeMap<AppCart, Observable<AppCart>>(
          appCart => this.getCartItems(cartId)
            .pipe(map(cartItems => {
              appCart.items = cartItems.map(item => new CartItem(item.product, item.quantity));
              return appCart;
          }))
        )
      );
  }

}
