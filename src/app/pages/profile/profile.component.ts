import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ProfileClient } from "./client/profile.client";

@Component({
  selector: 'ord-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileInfoForm: FormGroup = this.formBuilder.group({
    id: new FormControl(),
    userName: new FormControl(),
    email: new FormControl(),
    fullName: new FormControl(),
    dateOfBirth: new FormControl(),
    address: new FormControl(),
    description: new FormControl(),
    phoneNumber: new FormControl(),
    profilePictureUrl: new FormControl()
  });

  constructor(private formBuilder: FormBuilder,
              private profileClient: ProfileClient) {
  }

  ngOnInit() {
    this.loadProfile();
  }

  /**
   * Load profile info from API
   */
  loadProfile() {
    this.profileClient.getProfileInfo().subscribe({
      next: (profileInfo) => {
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
      this.profileClient.updateProfile(this.profileInfoForm.value);
    } else {
      console.warn('Form is not valid');
    }
  }

  /**
   * Delete logged in account
   */
  onDeleteProfile() {
    // this.profileClient.deleteProfile();
    console.log("Deleted");
  }
}
