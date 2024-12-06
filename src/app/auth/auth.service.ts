import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accessToken: string | null = '';
  private isAuthenticated: boolean = false;

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

  /**
   * Check if access token existed
   */
  checkIfAccessTokenExisted() {
    if (!this.getAccessToken()) {
      throw new Error('Access Token Not Exist');
    }
  }

  /**
   * Check if user logged in
   * @returns true if logged in, false if not
   */
  isLoggedIn() {
    const token = this.getAccessToken();
    this.isAuthenticated = !!token;
    return this.isAuthenticated;
  }
}
