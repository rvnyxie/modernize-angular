import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError, Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const WHITELIST = ["register", "/login", "forgot-password"];
    const token = this.authService.getAccessToken();

    // Skip checking token if url matches any in whitelist
    if (WHITELIST.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    if (token && !this.authService.isTokenExpired(token)) {
      // Clone request to add header options
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq).pipe(
        catchError(err => {
          if (err.status === 401) {
            this.authService.logout();
            this.router.navigate(["/login"]).then();
          }
          throw new Error(err);
        })
      )
    } else {
      // Redirect to login page if token is missing or expired
      this.authService.logout();
      this.router.navigate(["/login"]).then();
      throw new Error("Token is missing or expired")
    }
  }
}
