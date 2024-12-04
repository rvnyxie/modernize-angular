import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";
import { Province } from "../model/province.model";
import { ProvinceCreation } from "../model/province-creation.model";

@Injectable({
  providedIn: "root"
})
export class ProvincesClient {
  private getApiUrl = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/get-list";
  private createAndUpdateApiUrl = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/create-or-update";
  private deleteApiUrl = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/delete-common-result";

  accessToken = this.authService.getAccessToken();

  constructor(private httpClient: HttpClient,
              private authService: AuthService,) {}

  /**
   * Get list of provinces with filter
   */
  getProvinces() {
    const body = {
      "filter": null,
      "isActive": null,
      "skipCount": 0,
      "maxResultCount": 10
    }
    return this.httpClient.post<any[]>(this.getApiUrl, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.accessToken}`
      }
    });
  }

  /**
   * Create or update province
   * @param province Province to create or update
   */
  createOrUpdateProvince(province: Province) {
    const body = this.mapProvinceToCreationOrUpdateProvince(province);

    return this.httpClient.post(this.createAndUpdateApiUrl, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.accessToken}`
      }
    });
  }

  /**
   * Delete province by id
   * @param id Province's ID
   */
  deleteProvinceById(id: number) {
    const url = `${this.deleteApiUrl}/${id}`;
    return this.httpClient.post<any[]>(url, {}, {
      headers: {
        "Authorization": `Bearer ${this.accessToken}`
      }
    })
  }

  /**
   * Map from Province to creation or update Province
   * @param province Province need to be mapped
   */
  mapProvinceToCreationOrUpdateProvince(province: Province): ProvinceCreation {
    return {
      id: province.id,
      maTinh: province.maTinh,
      tenTinh: province.tenTinh,
      cap: province.cap,
      isActive: province.isActive
    };
  }
}
