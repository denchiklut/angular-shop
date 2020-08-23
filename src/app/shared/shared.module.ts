import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { CategoryService } from './services/order/category.service';
import { ProductService } from './services/product/product.service';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { OrderService } from './services/order/order.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    AuthGuard
  ],
  exports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    ProductCardComponent,
    ProductQuantityComponent,
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class SharedModule { }
