import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from "../products.service";

@Component({
  selector: 'ord-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss'
})
export class ProductCategoryComponent {
  @Input() productCategories: String[] = [];
  @Output() productCategoryOnDelete: EventEmitter<String> = new EventEmitter<String>();

  productCategory: String | null = "";
  isProductCategoryEditing: boolean = false;

  constructor(private productService: ProductsService) {
  }

  onStartAddingProductCategory(): void {
    this.productCategory = "Sample";
    this.isProductCategoryEditing = false;
  }

  onStartEditingProductCategory(product: String): void {
    this.productCategory = product;
    this.isProductCategoryEditing = true;
  }

  onDeleteProductCategory(productCategory: String): void {
    this.productCategoryOnDelete.emit(productCategory);
  }

  onProductCategoryFormSubmit() {

  }

  onProductCategoryFormCancel() {
    this.hideAndResetProductCategoryForm();
  }

  hideAndResetProductCategoryForm() {
    this.productCategory = null;
  }
}
