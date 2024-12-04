import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Commune } from "../model/commune.model";
import { Observable } from "rxjs";
import { AuthService } from "../../../../auth/auth.service";
import { CommuneCreation } from "../model/commune-creation.model";

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
  getCommunes() {
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
      this.getApiUrl,
      body,
      { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`}
    });
  }

  /**
   * Create or update commune
   * @param commune CommuneModel need to be created or updated
   */
  createOrUpdateCommunes(commune: Commune): Observable<Commune> {
    const body = this.mapCommuneToCreationOrUpdateCommune(commune);

    return this.httpClient.post<Commune>(this.createAndUpdateApiUrl, body, { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`}
    });
  }

  /**
   * Delete a commune by ID
   * @param id CommuneModel's ID
   */
  deleteCommuneById(id: number) {
    const url = `${this.deleteApiUrl}/${id}`;
    return this.httpClient.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }

  /**
   * Map Commune to Creation or Update Commune
   * @param commune Commune need to be mapped
   */
  mapCommuneToCreationOrUpdateCommune(commune: Commune): CommuneCreation {
    return {
      id: commune.id,
      maTinh: commune.maTinh,
      maHuyen: commune.maHuyen,
      maXa: commune.maXa,
      tenXa: commune.tenXa,
      isActive: commune.isActive,
      isXaNgheo: commune.isXaNgheo,
      isXaMienNui: commune.isXaMienNui,
      isXaDanToc: commune.isXaDanToc,
      isThanhThi: commune.isThanhThi,
    }
  }
}
