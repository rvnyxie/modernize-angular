import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ProductsComponent } from "./products/products.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductsModule } from "./products/products.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProvincesComponent } from './management/provinces/provinces.component';
import { DistrictsComponent } from './management/districts/districts.component';
import { CommunesComponent } from './management/communes/communes.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ProductsComponent,
    ProfileComponent,
    ProductFormComponent,
    ProvincesComponent,
    DistrictsComponent,
    CommunesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
