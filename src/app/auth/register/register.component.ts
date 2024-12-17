import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterClient } from "./client/register.client";
import { Router } from "@angular/router";

@Component({
  selector: 'ord-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private registerClient: RegisterClient,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[^@]+$/)]],
      password: ["", Validators.required],
      fullName: ["", Validators.required],
      dateOfBirth: [""],
      address: [""],
      description: [""],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
    })
  }

  /**
   * Helper to check form controls error
   * @param controlName Name of control
   * @param errorType Type of error
   */
  hasError(controlName: string, errorType: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control.touched && control.hasError(errorType);
  }

  /**
   * Handle registration submit
   */
  onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.registerClient.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(["/login"]).then();
        },
        error: (err) => {
          console.error(err)
        }
      });
    } else {
      console.log('Form is invalid', this.registerForm.value);
      this.registerForm.markAllAsTouched(); // Highlight all errors
    }
  }
}
