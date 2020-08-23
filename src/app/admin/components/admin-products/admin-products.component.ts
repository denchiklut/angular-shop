import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/app-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
    });
  }

  filter(query: string): void {
    this.filteredProducts = this.products.filter(
      product => {
        const titleMatch = product.title.toLowerCase().includes(query.toLowerCase());
        const priceMatch = String(product.price).includes(query.toLowerCase());

        return titleMatch || priceMatch;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
