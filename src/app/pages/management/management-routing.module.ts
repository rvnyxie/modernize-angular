import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ProvincesComponent } from "./provinces/provinces.component";
import { DistrictsComponent } from "./districts/districts.component";
import { CommunesComponent } from "./communes/communes.component";

const routes: Routes = [
  { path: "provinces", component: ProvincesComponent },
  { path: "districts", component: DistrictsComponent },
  { path: "communes", component: CommunesComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
