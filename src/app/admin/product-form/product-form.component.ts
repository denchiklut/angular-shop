import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Product, ProductCategory } from '../../Models/app-product';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  id?: string;
  categories: ProductCategory[];
  product: Product = {
    id: '',
    title: '',
    price: 0,
    category: '',
    imageUrl: 'https://www.worldloppet.com/wp-content/uploads/2018/10/no-img-placeholder.png'
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    categoryService
      .getAll()
      .subscribe(categories => this.categories = categories);

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product: Product): void {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(): void {
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
