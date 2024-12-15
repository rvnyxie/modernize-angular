import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginClient} from "./client/login.client";
import {Router} from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'ord-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder,
              private loginClient: LoginClient,
              private authService: AuthService,
              private router: Router) {
  }

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  /**
   * Handle login submit action
   */
  onLoginSubmit(): void {
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.loginClient.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Login successfully', response);
          this.errorMessage = null;
          const { accessToken } = response;

          this.authService.setAccessToken(accessToken);
          this.router.navigate(['/dashboard']).then();
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = 'Incorrect email or password';
        }
      })
    }
  }
}
