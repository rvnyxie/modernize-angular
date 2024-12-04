import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";
import { District } from "../model/district.model";
import { DistrictCreation } from "../model/district-creation.model";

@Injectable({
  providedIn: 'root',
})
export class DistrictsClient {
  private getApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/get-list';
  private createAndUpdateApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/create-or-update';
  private deleteApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/delete-common-result';

  constructor(private httpClient: HttpClient,
              private authService: AuthService,) {}

  accessToken = this.authService.getAccessToken();

  /**
   * Get districts with settings
   */
  getDistricts() {
    const body = {
      "filter": null,
      "isActive": null,
      "skipCount": 0,
      "maTinh": null,
      "maxResultCount": 10
    }

    return this.httpClient.post<{ totalCount: number; items: District[] }>(
      this.getApiUrl,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
  }

  /**
   * Create or update district
   * @param district District need to be created or updated
   */
  createOrUpdateDistrict(district: District) {
    const body = this.mapDistrictToCreationOrUpdateDistrict(district);

    return this.httpClient.post(this.createAndUpdateApiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      }
    })
  }

  /**
   * Delete district by ID
   * @param id District's ID
   */
  deleteDistrictById(id: number) {
    const url = `${this.deleteApiUrl}/${id}`;
    return this.httpClient.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      }
    });
  }

  /**
   * Map District to Creation or Update District
   * @param district District need to be mapped
   */
  mapDistrictToCreationOrUpdateDistrict(district: District): DistrictCreation {
    return {
      id: district.id,
      maTinh: district.maTinh,
      tenHuyen: district.tenHuyen,
      maHuyen: district.maHuyen,
      cap: district.cap,
      isActive: district.isActive
    };
  }
}
