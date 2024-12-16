import { Component, OnInit } from '@angular/core';
import { Product } from "./model/product.model";
import { ColumnInfoUsedForGeneration, columnsConfig } from "../../columns-config";
import { ProductsClient } from "./client/products.client";
import { BaseManagementComponent } from "../base-management/base-management.component";
import { ProductCreation } from "./model/product-creation.models";
import { ProductUpdate } from "./model/product-update.model";

@Component({
  selector: 'ord-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseManagementComponent<Product, ProductCreation, ProductUpdate> implements OnInit {
  readonly defaultControls: Product = {
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
    groupId: 0
  }

  columns: ColumnInfoUsedForGeneration[] = columnsConfig["product"];
  dataClient = this.productsClient;

  constructor(private productsClient: ProductsClient) {
    super();
  }

  protected override mapEntityToCreationEntity(product: Product): ProductCreation {
    return {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      groupId: product.groupId,
    };
  }
  protected override mapEntityToUpdateEntity(product: Product): ProductUpdate {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      groupId: product.groupId
    }
  }
}
