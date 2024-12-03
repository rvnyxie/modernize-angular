import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Commune } from "../model/commune";
import { map, Observable } from "rxjs";
import { AuthService } from "../../../../auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class CommunesClient {
  private getApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/get-list';
  private createAndUpdateApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/create-or-update';
  private deleteApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/delete-common-result';

  accessToken = this.authService.getAccessToken();

  constructor(private httpClient: HttpClient,
              private authService: AuthService,) {}

  /**
   * Get list of communes
   */
  getCommunes(): Observable<Commune[]> {
    // Settings for getting
    const body = {
      filter: null,
      isActive: null,
      skipCount: 0,
      maTinh: null,
      maHuyen: null,
      maxResultCount: 10
    }

    return this.httpClient.post<any>(
      `${this.getApiUrl}`,
      JSON.stringify(body),
      { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`}
    }).pipe(
      map(response  => response.items as Commune[])
    );
  }

  createOrUpdateCommunes(commune: Commune): Observable<Commune> {
    return this.httpClient.post<Commune>(this.createAndUpdateApiUrl, commune, { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`}
    });
  }

  /**
   * Delete a commune by ID
   * @param id Commune's ID
   */
  deleteCommuneById(id: number) {
    const url = `${this.deleteApiUrl}/${id}`;
    return this.httpClient.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }
}
