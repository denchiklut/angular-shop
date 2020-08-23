import { Component, Input } from '@angular/core';
import { CategoryService } from '../../../../shared/services/order/category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../../../shared/models/app-product';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Input() category: string;
  categories$: Observable<ProductCategory[]>;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

}
