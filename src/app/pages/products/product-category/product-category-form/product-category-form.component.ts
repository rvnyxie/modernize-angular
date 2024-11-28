import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ord-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrl: './product-category-form.component.scss'
})
export class ProductCategoryFormComponent implements OnInit {
  @Input() productCategory: String = "";
  @Input() isProductCategoryEditing: boolean = false;
  @Output() productCategoryFormSubmit: EventEmitter<String> = new EventEmitter<String>();
  @Output() productCategoryFormCancel: EventEmitter<void> = new EventEmitter<void>();

  formProductCategory: String | null = "";

  ngOnInit() {
    this.formProductCategory = this.productCategory ? this.productCategory : null;
  }

  onProductCategorySubmit(): void {
    if (this.formProductCategory) {
      this.productCategoryFormSubmit.emit(this.formProductCategory);
    }
  }

  onProductCategoryCancel(): void {
    this.productCategoryFormCancel.emit();
  }
}
