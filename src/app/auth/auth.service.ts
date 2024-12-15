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
    if (token) {
      const isTokenExpired = this.isTokenExpired(token);

      return !isTokenExpired;
    }

    return false;
  }

  /**
   * Check if token is expired
   * @param token
   * @return true if expired, false if not
   */
  isTokenExpired(token: string): boolean {
    if (!token) {
      console.error("Token is missing");
      return false;
    }

    try {
      // Split the token into parts (Header.Payload.Signature)
      const payloadBase64 = token.split(".")[1];
      if (!payloadBase64) {
        console.error("Invalid token format");
        return true;
      }

      // Decode the payload
      const payload = JSON.parse(atob(payloadBase64));

      // Get the expiration time (in seconds)
      const expirationTime = payload.exp;
      if (!expirationTime) {
        console.error("Token does not contain exp field");
        return true;
      }

      // Get the current time in seconds
      const currentTime = Math.floor(Date.now() / 1000);

      // Compare current time with expiration time
      return currentTime >= expirationTime;
    } catch (err) {
      console.error("Error decoding token", err);
      return true;
    }
  }

  /**
   * Do the logout in the scope of application
   */
  logout() {
    this.clearAccessToken();
  }
}
