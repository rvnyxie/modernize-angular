import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProfileClient } from "./client/profile.client";
import { ProfileModel } from "./model/profile.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'ord-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileInfoForm: FormGroup = this.formBuilder.group({
    id: new FormControl(["", Validators.required]),
    userName: new FormControl(["", Validators.required]),
    email: new FormControl(["", Validators.required]),
    fullName: new FormControl(),
    dateOfBirth: new FormControl(),
    address: new FormControl(),
    description: new FormControl(),
    phoneNumber: new FormControl(),
    profilePictureUrl: new FormControl()
  });

  constructor(private formBuilder: FormBuilder,
              private profileClient: ProfileClient,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadProfile();
  }

  /**
   * Load profile info from API
   */
  loadProfile() {
    this.profileClient.getProfileInfo().subscribe({
      next: (profileInfo: ProfileModel) => {
        this.profileInfoForm.patchValue(profileInfo);
      },
      error: (err) => {
        console.error('Account Info Error: ', err);
      }
    })
  }

  /**
   * Update profile avatar
   */
  onUpdateAvatar() {

  }

  /**
   * Update profile info
   */
  onUpdateProfile() {
    if (this.profileInfoForm.valid) {
      this.profileClient.updateProfile(this.profileInfoForm.value).subscribe({
        next: (response) => {
          alert("Profile Updated Successfully!");
          console.log('Profile updated successfully', response);
        },
        error: (err) => {
          console.error('Profile updated error: ', err);
        }
      });
    } else {
      console.warn('Form is not valid');
    }
  }

  /**
   * Delete logged in account
   */
  onDeleteProfile() {
    this.profileClient.deleteProfile(this.profileInfoForm.value.id).subscribe({
      next: (response) => {
        alert("Profile Deleted Successfully!");
        console.log('Profile deleted successfully', response);
        this.authService.clearAccessToken();
        this.router.navigate(['/login']).then();
      },
      error: (err) => {
        console.error('Profile deleted error: ', err);
      }
    });
  }
}
