import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Product } from "../../models/product.model";
import { ProductsService } from "./products.service";

@Component({
  selector: 'ord-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  readonly defaultNewProduct: Product = {
    id: Math.floor(Math.random() * 1000),
    code: '',
    name: '',
    category: '',
    soldUnit: 0,
    inStock: 0,
    expiryDate: new Date(Date.now())
  };
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  formProduct: Product | null = null

  isEditing: boolean = false;

  /**
   * Product categories computed from products
   */
  productCategories: Signal<String[]> = computed(() =>
      this.products()
        .map(product => product.category)
        .filter((category, index, categories) => categories.indexOf(category) === index)
  )

  constructor(private productService: ProductsService) {}

  /**
   * Actions to do OnInit
   */
  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Get products to display
   */
  loadProducts(): void {
    const newProducts = this.productService.getAllProducts();
    this.products.set(newProducts);
  }

  /**
   * Add a product
   */
  onAddProduct(product: Product): void {
    this.productService.addProduct(product);
    this.hideAndResetForm();
    this.loadProducts();
  }

  /**
   * Update a product
   */
  onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product);
    this.hideAndResetForm();
    this.loadProducts();
  }

  /**
   * Delete a product
   * @param id Product's ID
   */
  onDeleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    this.loadProducts();
  }

  onDeleteProductCategory(productCategory: String): void {
    this.productService.deleteProductCategory(productCategory);
    this.loadProducts();
  }

  /**
   * Set up when beginning to add new product
   */
  onStartAddingProduct() : void {
    this.formProduct = this.defaultNewProduct;
    this.isEditing = false;
  }

  /**
   * Set up when beginning to edit a product
   * @param product Product will be edited
   */
  onStartEditingProduct(product: Product): void {
    this.formProduct = { ...product };
    this.isEditing = true;
  }

  /**
   * Hide and reset form
   */
  hideAndResetForm() {
    this.formProduct = null;
  }
}
