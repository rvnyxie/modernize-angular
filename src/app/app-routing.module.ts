import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, children: [] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
