import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginClient {
  private apiUrl: string = 'http://test.nghiencuukhoahoc.com.vn/api/app/account/login';

  constructor(private httpClient: HttpClient) {}

  /**
   * Login with username and password
   * @param username The username
   * @param password The password
   * @returns Observable for the API response
   */
  login(username: string, password: string) {
    // Encode URL-encoded string
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.httpClient.post(this.apiUrl, body.toString(),{ headers });
  }
}
