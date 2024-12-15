import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginClient {
  private loginUrl: string = 'https://localhost:7003/auth/login';

  constructor(private httpClient: HttpClient) {}

  /**
   * Login with email and password
   * @param email The email
   * @param password The password
   * @returns Observable for the API response
   */
  login(email: string, password: string) {
    // Encode URL-encoded string
    const body = {
      email: email,
      password: password
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(this.loginUrl, body);
  }
}
