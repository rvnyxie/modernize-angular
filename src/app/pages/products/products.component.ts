import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductsService} from "./products.service";

@Component({
  selector: 'ord-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  defaultNewProduct: Product = {
    id: Math.floor(Math.random() * 1000),
    code: '',
    name: '',
    category: '',
    soldUnit: 0,
    inStock: 0,
    expiryDate: new Date('2025-12-31')
  };
  newProduct: Product = this.defaultNewProduct;
  isAddingProduct: boolean = false;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getAllProducts();
  }

  onAddProduct(): void {
    if (this.newProduct) {
      // Format submitted expiry date
      this.newProduct.expiryDate = new Date(this.newProduct.expiryDate);

      this.productService.addProduct(this.newProduct);
      this.newProduct = this.defaultNewProduct;
      this.isAddingProduct = false
      this.loadProducts();
    }
  }

  onEditProduct(product: Product) {
    this.selectedProduct = { ...product }; // Clone product
  }

  onUpdateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct);
      this.selectedProduct = null;
      this.loadProducts();
    }
  }

  onDeleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    this.loadProducts();
  }
}
