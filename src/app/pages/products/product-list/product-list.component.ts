import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { Product } from "../../../models/product.model";

@Component({
  selector: 'ord-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products: WritableSignal<Product[]> = signal<Product[]>([]);
  @Output() onEdit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
}
