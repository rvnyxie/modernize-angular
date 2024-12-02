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
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  /**
   * Handle login submit action
   */
  onLoginSubmit(): void {
    const { username, password } = this.loginForm.value;

    if (username && password) {
      this.loginClient.login(username, password).subscribe({
        next: (response: any) => {
          console.log('Login successfully', response);
          this.errorMessage = null;
          const { access_token } = response;

          this.authService.setAccessToken(access_token);
          this.router.navigate(['/dashboard']).then();
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = 'Username or Password incorrect';
        }
      })
    }
  }
}
