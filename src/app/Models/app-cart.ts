import { Product } from './app-product';

export class AppCart {

  constructor(public items: CartItem[] = []) { }

  get itemsCount(): number {
    return this.items
      .reduce((accumulator, item) => accumulator + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items
      .reduce((accumulator, item) => accumulator + item.totalPrice , 0);
  }

  public getQuantity(product: Product): number {
    const item: CartItem = this.items.find(p => product.id === p.product.id);
    return item ? item.quantity : 0;
  }

}

export class CartItem {

  constructor(public product: Product, public quantity: number) { }

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }
}
