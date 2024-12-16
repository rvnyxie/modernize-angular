import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { LayoutComponent } from "./layout/layout.component";
import { authGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import("./pages/dashboard/dashboard.module").then(m => m.DashboardModule) },
      { path: 'me', loadChildren: () => import("./pages/profile/profile.module").then(m => m.ProfileModule) },
      { path: 'management', loadChildren: () => import("./pages/management/management.module").then(m => m.ManagementModule) },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
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
