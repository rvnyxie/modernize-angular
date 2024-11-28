import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../models/product.model";

@Component({
  selector: 'ord-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() isEditing: boolean = false;
  @Output() formSubmit : EventEmitter<Product> = new EventEmitter<Product>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Internal form product state
   */
  formProduct: Product | null = null;

  ngOnInit() {
    this.formProduct = this.product ? { ...this.product } : null;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.formProduct) {
      this.formSubmit.emit(this.formProduct);
    }
  }

  /**
   * Handle form cancellation
   */
  onCancel(): void {
    this.cancel.emit();
  }
}
