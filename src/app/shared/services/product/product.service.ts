import { Injectable } from '@angular/core';
import { Product } from '../../models/app-product';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  create(product: Product): void {
    this.db.collection('products')
      .add(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.collection<Product>('products')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;

          return { id, ...data };
        }))
      );
  }

  get(id: string): Observable<Product> {
    return this.db.doc<Product>('products/' + id).valueChanges();
  }

  update(id: string,  product: Product): void {
    this.db.doc<Product>('products/' + id).update(product);
  }

  delete(id: string): void {
    this.db.doc<Product>('products/' + id).delete();
  }
}
