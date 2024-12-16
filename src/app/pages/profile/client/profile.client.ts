import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { ProfileModel } from "../model/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileClient {
  private getApiUrl = "";
  private updateApiUrl = "";

  constructor(private httpClient: HttpClient) { }

  /**
   * Get logged in profile info
   */
  getProfileInfo(): Observable<ProfileModel> {
    return this.httpClient.get<any>(this.getApiUrl).pipe(
      map((response) => {
        if (!response || !response.userSession) {
          throw new Error('Invalid API response: userSession is missing');
        }

        return this.convertToAccountInfo(response.userSession);
      }),
      catchError((error) => {
        console.error('Error fetching account info:', error);
        return throwError(() => new Error('Failed to fetch account info'));
      })
    );
  }

  /**
   * Convert account info received from API to AccountInfo type
   * @param accountReceived Account received from API
   */
  convertToAccountInfo(accountReceived: any): any {
    return {
    }
  }

  /**
   * Update account with submitted info
   * @param updatedAccountInfo Updated account info
   */
  updateProfile(updatedAccountInfo: ProfileModel) {
    console.log('Updated Account Info:', updatedAccountInfo);
    const body = JSON.stringify(updatedAccountInfo);

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

  updateAvatar() {}

  /**
   * Delete logged in account
   */
  deleteProfile() {
    alert('Not supported yet')
  }
}
