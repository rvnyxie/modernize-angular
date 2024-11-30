import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ProductsComponent } from "./products/products.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProductFormComponent } from './products/product-form/product-form.component';
import {ProductsModule} from "./products/products.module";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProfileComponent,
    ProductFormComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsModule
  ]
})
export class PagesModule { }
