import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginClientService} from "./client/login-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ord-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder,
              private loginClient: LoginClientService,
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
        next: (response) => {
          console.log('Login successfully', response);
          this.errorMessage = null;
          this.router.navigate(['/dashboard']).then(r => {});
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = 'Username or Password incorrect';
        }
      })
    }
  }
}
