import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { LayoutComponent } from "./layout/layout.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { authGuard } from "./auth/auth.guard";
import { ProvincesComponent } from "./pages/management/provinces/provinces.component";
import { DistrictsComponent } from "./pages/management/districts/districts.component";
import { CommunesComponent } from "./pages/management/communes/communes.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'me', component: ProfileComponent },
      { path: 'management/provinces', component: ProvincesComponent },
      { path: 'management/districts', component: DistrictsComponent },
      { path: 'management/communes', component: CommunesComponent },
    ],
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
