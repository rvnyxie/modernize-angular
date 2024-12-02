import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    if (state.url === '/login') {
      router.navigate(['/dashboard']).then();
      return false;
    }
    return true;
  } else {
    if (state.url !== '/login') {
      router.navigate(['/login']).then();
    }
    return true;
  }
};
