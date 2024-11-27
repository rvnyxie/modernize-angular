import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ord-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products = [
    { name: 'Product 1', description: 'Description of Product 1', price: 100 },
    { name: 'Product 2', description: 'Description of Product 2', price: 200 },
    { name: 'Product 3', description: 'Description of Product 3', price: 300 }
  ];

  constructor() {}

  ngOnInit(): void {}
}
