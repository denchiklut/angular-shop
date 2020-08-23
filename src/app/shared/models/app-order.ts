import { AppCart, CartItem } from './app-cart';

export interface Shipping {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
}

export class Order {
  createdAt: number;
  items: CartItem[];

  constructor(public userId: string, public shipping: Shipping, public card: AppCart) {
    this.createdAt = Date.now();
    this.items = card.items;
  }
}
