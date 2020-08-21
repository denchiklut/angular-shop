import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Models/app-product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppCart } from '../Models/app-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart$: Observable<AppCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();
    this.getProducts();
  }

  private getProducts(): void {
    this.productService
      .getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter(): void {
     this.filteredProducts = this.category ? this.products.filter(p => p.category === this.category) : this.products;
   }

}

