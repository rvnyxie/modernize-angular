import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AccountInfo } from "../../../models/account.model";
import { AuthService } from "../../../auth/auth.service";
import { catchError, map, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileClientService {
  private getApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/app/account/get-account-bootstrap';
  private updateApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/app/account/update-account-info';

  accessToken = this.authService.getAccessToken();

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  /**
   * Get logged in account info
   */
  getAccountInfo(): Observable<AccountInfo> {
    this.authService.checkIfAccessTokenExisted();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.httpClient.get<any>(this.getApiUrl, { headers }).pipe(
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
  convertToAccountInfo(accountReceived: any): AccountInfo {
    return {
      userId: accountReceived.id!,
      avatarDocumentId: null,
      email: accountReceived.email!,
      phoneNumber: accountReceived.phoneNumber || null,
      name: accountReceived.name!,
      ngaySinh: null,
      gioiTinh: accountReceived.gioiTinh!,
      diaChi: null,
      maTinh: null,
      maHuyen: null,
      maXa: null,
    }
  }

  /**
   * Update account with submitted info
   * @param updatedAccountInfo Updated account info
   */
  updateProfile(updatedAccountInfo: AccountInfo) {
    this.authService.checkIfAccessTokenExisted();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })

    console.log('Updated Account Info:', updatedAccountInfo);
    const body = JSON.stringify(updatedAccountInfo);

    this.httpClient.post(this.updateApiUrl, body, { headers }).subscribe({
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
  deleteAccount() {
    alert('Not supported yet')
  }
}
