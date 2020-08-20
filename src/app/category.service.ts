import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

import { ProductCategory, ResourceCategory } from './Models/app-product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getAll(): Observable<ProductCategory[]> {
    return this.db.collection<ResourceCategory>('categories', ref => {
      return ref.orderBy('name');
    })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;

          return { id, ...data };
        }))
      );
  }
}
