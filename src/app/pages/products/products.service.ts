import { Injectable } from '@angular/core';
import { Product } from "../../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [
    {
      id: 1,
      code: "PROD123",
      name: "Laptop",
      category: "Electronics",
      soldUnit: 50,
      inStock: 20,
      expiryDate: new Date('2025-12-31')
    },
    {
      id: 2,
      code: "PROD456",
      name: "Smartphone",
      category: "Electronics",
      soldUnit: 100,
      inStock: 30,
      expiryDate: new Date('2024-09-30')
    },
    {
      id: 3,
      code: "PROD789",
      name: "Headphones",
      category: "Electronics",
      soldUnit: 25,
      inStock: 15,
      expiryDate: new Date('2024-06-30')
    },
    {
      id: 4,
      code: "PROD101",
      name: "T-Shirt",
      category: "Clothing",
      soldUnit: 75,
      inStock: 40,
      expiryDate: new Date('2025-03-31')
    },
    {
      id: 5,
      code: "PROD111",
      name: "Jeans",
      category: "Clothing",
      soldUnit: 60,
      inStock: 35,
      expiryDate: new Date('2024-12-31')
    },
    {
      id: 6,
      code: "PROD122",
      name: "Sneakers",
      category: "Footwear",
      soldUnit: 45,
      inStock: 25,
      expiryDate: new Date('2024-09-30')
    },
    {
      id: 7,
      code: "PROD133",
      name: "Book",
      category: "Books",
      soldUnit: 30,
      inStock: 18,
      expiryDate: new Date('2025-06-30')
    },
    {
      id: 8,
      code: "PROD144",
      name: "Game Console",
      category: "Electronics",
      soldUnit: 80,
      inStock: 45,
      expiryDate: new Date('2024-12-31')
    },
    {
      id: 9,
      code: "PROD155",
      name: "Coffee Maker",
      category: "Kitchenware",
      soldUnit: 20,
      inStock: 12,
      expiryDate: new Date('2024-09-30')
    },
    {
      id: 10,
      code: "PROD166",
      name: "Smartwatch",
      category: "Electronics",
      soldUnit: 35,
      inStock: 20,
      expiryDate: new Date('2025-03-31')
    }
  ];

  constructor() { }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(product => product.id == updatedProduct.id);

    if (index > -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
  }

  deleteProductCategory(productCategory: String) {
    this.products = this.products.filter(
      product => product.category !== productCategory
    );
    console.log(this.products);
  }
}
