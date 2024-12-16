import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseManagementClient } from "../../base-management/base-management-client/base-management.client";
import { Product } from "../model/product.model";
import { ProductCreation } from "../model/product-creation.models";
import { ProductUpdate } from "../model/product-update.model";

@Injectable({
  providedIn: 'root',
})
export class ProductsClient extends BaseManagementClient<Product, ProductCreation, ProductUpdate>{
  readonly baseUrl: string = "https://localhost:7003/api/products";

  protected override getApiUrl: string = this.baseUrl;
  protected override creationApiUrl: string = this.baseUrl;
  protected override updateApiUrl: string = this.baseUrl;
  protected override deleteApiUrl: string = this.baseUrl;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
