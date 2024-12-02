import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accessToken: string | null = '';

  constructor() {}

  /**
   * Set the access token
   * @param token The access token string
   */
  setAccessToken(token: string): void {
    this._accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  /**
   * Get the access token
   * @returns The access token string or null
   */
  getAccessToken(): string | null {
    return this._accessToken || localStorage.getItem('accessToken');
  }

  /**
   * Clear the access token
   */
  clearAccessToken(): void {
    this._accessToken = null;
    localStorage.removeItem('accessToken');
  }
}
