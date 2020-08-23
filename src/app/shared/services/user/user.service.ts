import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { AppUser } from '../../models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFirestore) { }

  save(user: firebase.User): void {
    this.db.doc('users/' + user.uid)
      .update({
        name: user.displayName,
        email: user.email
      });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.doc<AppUser>('users/' + uid).valueChanges();
  }
}
