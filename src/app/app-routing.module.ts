import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {LayoutComponent} from "./layout/layout.component";
import {ProductsComponent} from "./pages/products/products.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'me', component: ProfileComponent },
      { path: '', redirectTo: '', pathMatch: 'full'}
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
