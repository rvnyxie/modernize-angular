import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ProfileClient } from "./client/profile.client";
import { ProfileModel } from "./model/profile.model";

@Component({
  selector: 'ord-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileInfoForm = this.formBuilder.group({
    // userId: ['', Validators.required],
    // avatarDocumentId: [''],
  });

  deleteProfileForm = this.formBuilder.group({

  });

  constructor(private formBuilder: FormBuilder,
              private profileClient: ProfileClient) {
  }

  ngOnInit() {
    this.loadProfile();
  }

  /**
   * Load account info from API
   */
  loadProfile() {
    this.profileClient.getProfileInfo().subscribe({
      next: (accountInfo) => {
        this.profileInfoForm.patchValue(accountInfo);
      },
      error: (err) => {
        console.error('Account Info Error: ', err);
      }
    })
  }

  onUpdateAvatar() {

  }

  /**
   * Update account info
   */
  onUpdateProfile() {
    if (this.profileInfoForm.valid) {
      const updatedAccountInfo: ProfileModel = this.mapFormToAccountInfo();

      this.profileClient.updateProfile(updatedAccountInfo);
    } else {
      console.warn('Form is not valid');
    }
  }

  /**
   * Delete logged in account
   */
  onDeleteProfile() {
    this.profileClient.deleteProfile();
  }

  /**
   * Map account info from form to AccountInfo
   */
  mapFormToAccountInfo(): any {
    const formValue = this.profileInfoForm.value;


  }

}
