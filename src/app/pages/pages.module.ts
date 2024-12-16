import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile/profile.component";
import { ProvincesComponent } from './management/provinces/provinces.component';
import { DistrictsComponent } from './management/districts/districts.component';
import { CommunesComponent } from './management/communes/communes.component';
import { SharedModule } from "../shared/shared.module";
import { ProductsComponent } from "./management/products/products.component";

@NgModule({
  declarations: [
    ProfileComponent,
    ProvincesComponent,
    DistrictsComponent,
    CommunesComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
