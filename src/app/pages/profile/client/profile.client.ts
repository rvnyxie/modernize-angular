import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ProfileModel } from "../model/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileClient {
  readonly baseUrl: string = "https://localhost:7003/api";

  private getApiUrl = `${this.baseUrl}/users/me`;
  private updateApiUrl = "";

  constructor(private httpClient: HttpClient) { }

  /**
   * Get logged in profile info
   */
  getProfileInfo(): Observable<ProfileModel> {
    return this.httpClient.get<any>(this.getApiUrl).pipe(
      map((response: ProfileModel) => {
        return response;
      })
    );
  }

  /**
   * Update profile with submitted info
   * @param updatedProfileInfo Updated profile info
   */
  updateProfile(updatedProfileInfo: ProfileModel) {
    console.log('Updated Profile Info:', updatedProfileInfo);
    const body = JSON.stringify(updatedProfileInfo);

    this.httpClient.post(this.updateApiUrl, body).subscribe({
      next: (response) => {
        console.log('Profile updated successfully', response);
      },
      error: (err) => {
        alert('Profile updated failed with error: ' + err);
        console.error(err);
      }
    })
  }

  /**
   * Update profile avatar
   */
  updateAvatar() {}

  /**
   * Delete logged in account
   */
  deleteProfile() {
    alert('Not supported yet')
  }
}
