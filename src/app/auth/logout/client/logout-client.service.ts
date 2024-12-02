import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LogoutClientService {
  private apiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/app/account/logout'

  constructor(private httpClient: HttpClient) { }

  logout(accessToken: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return this.httpClient.post(this.apiUrl, { headers });
  }
}
