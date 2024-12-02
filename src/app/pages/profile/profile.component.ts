import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ProfileClientService } from "./client/profile-client.service";
import { AccountInfo } from "../../models/account.model";

@Component({
  selector: 'ord-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  accountInfoForm = this.formBuilder.group({
    userId: ['', Validators.required],
    avatarDocumentId: [''],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [''],
    name: ['', Validators.required],
    ngaySinh: [''], // Date of birth
    gioiTinh: [0], // Gender
    diaChi: [''], // Address
    maTinh: [''], // Province code
    maHuyen: [''], // District code
    maXa: [''], // Commune code
    password: ['', Validators.required], // For updating password
    re_password: ['', Validators.required], // Confirm password
  });

  constructor(private formBuilder: FormBuilder,
              private profileClient: ProfileClientService) {
  }

  ngOnInit() {
    this.loadAccountInfo();
  }

  /**
   * Load account info from API
   */
  loadAccountInfo() {
    this.profileClient.getAccountInfo().subscribe({
      next: (accountInfo) => {
        this.accountInfoForm.patchValue(accountInfo);
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
  onUpdateAccount() {
    if (this.accountInfoForm.valid) {
      const updatedAccountInfo: AccountInfo = this.mapFormToAccountInfo();

      this.profileClient.updateProfile(updatedAccountInfo);
    } else {
      console.warn('Form is not valid');
    }
  }

  /**
   * Delete logged in account
   */
  onDeleteAccount() {
    this.profileClient.deleteAccount();
  }

  /**
   * Map account info from form to AccountInfo
   */
  mapFormToAccountInfo(): AccountInfo {
    const formValue = this.accountInfoForm.value;

    return {
      userId: formValue.userId!,
      avatarDocumentId: formValue.avatarDocumentId!,
      email: formValue.email!,
      phoneNumber: formValue.phoneNumber || null,
      name: formValue.name!,
      ngaySinh: formValue.ngaySinh!,
      gioiTinh: formValue.gioiTinh!,
      diaChi: formValue.diaChi!,
      maTinh: formValue.maTinh!,
      maHuyen: formValue.maHuyen!,
      maXa: formValue.maXa!,
    };
  }

}
