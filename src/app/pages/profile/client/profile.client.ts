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
  private updateApiUrl = `${this.baseUrl}/users/me`;
  private deleteApiUrl = `${this.baseUrl}/users/me`;

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
    const body = JSON.stringify(updatedProfileInfo);

    return this.httpClient.post(this.updateApiUrl, body);
  }

  /**
   * Update profile avatar
   */
  updateAvatar() {}

  /**
   * Delete logged in account
   */
  deleteProfile(id: string) {
    const deleteApiUrlWithId = `${this.deleteApiUrl}/${id}`;

    return this.httpClient.delete(deleteApiUrlWithId);
  }
}
