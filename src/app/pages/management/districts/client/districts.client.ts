import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";
import { District } from "../model/district.model";
import { DistrictCreation } from "../model/district-creation.model";
import { BaseManagementClient } from "../../base-management/base-management-client/base-management.client";
import { ProvincesClient } from "../../provinces/client/provinces.client";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DistrictsClient extends BaseManagementClient<District, DistrictCreation>{
  protected getApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/get-list';
  protected createAndUpdateApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/create-or-update';
  protected deleteApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/huyen/delete-common-result';

  constructor(httpClient: HttpClient,
              authService: AuthService,) {
    super(httpClient, authService);
  }

  /**
   * Get all districts by province's ID
   * @param provinceId Province's ID
   */
  getAllDistrictsByProvinceId(provinceId: string){
    const url = "http://test.nghiencuukhoahoc.com.vn/api/master-data/select-data-source/get-combo-data-source";
    const body = {
      type: 2,
      cascader: provinceId
    }

    return this.httpClient.post<any[]>(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authService.getAccessToken()}`,
      }
    }).pipe(
      map((response: any[]) => {
        return response.map(item => ({
          label: item.displayText,
          value: item.value
        }));
      }),
      catchError(err => {
        console.error("Failed to fetch districts:", err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Map District to Creation or Update District
   * @param district District need to be mapped
   */
  protected mapToCreationOrUpdate(district: District): DistrictCreation {
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
