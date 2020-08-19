import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductCategory } from '../../Models/product-category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories: ProductCategory[];

  constructor(private categoryService: CategoryService) {
    categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}
