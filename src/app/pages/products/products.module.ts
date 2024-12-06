import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCategoryFormComponent } from './product-category/product-category-form/product-category-form.component';
import { FormsModule } from "@angular/forms";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCategoryComponent,
    ProductCategoryFormComponent
  ],
  exports: [
    ProductListComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
