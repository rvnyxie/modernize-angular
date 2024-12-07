import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";
import { Province } from "../model/province.model";
import { ProvinceCreation } from "../model/province-creation.model";
import { BaseManagementClient } from "../../base-management/base-management-client/base-management.client";
import { catchError, map, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProvincesClient extends BaseManagementClient<Province, ProvinceCreation>{
  protected getApiUrl = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/get-list";
  protected createAndUpdateApiUrl = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/create-or-update";
  protected deleteApiUrl = "http://test.nghiencuukhoahoc.com.vn/api/master-data/tinh/delete-common-result";

  constructor(httpClient: HttpClient,
              authService: AuthService) {
    super(httpClient, authService);
  }

  getAllProvinces() {
    const url = "http://test.nghiencuukhoahoc.com.vn/api/master-data/select-data-source/get-combo-data-source"
    const body = {
      type: 1,
      cascader: ""
    }
    return this.httpClient.post<any[]>(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authService.getAccessToken()}`,
      }
    }).pipe(
      map((response: any[]) => {
        // Assuming the response is an array of objects with `displayText` and `value`
        return response.map((item) => ({
          label: item.displayText,
          value: item.value
        }));
      }),
      catchError((error) => {
        console.error("Failed to fetch provinces:", error);
        // Rethrow the error so the caller can handle it
        return throwError(() => error);
      })
    );
  }

  /**
   * Map from Province to creation or update Province
   * @param province Province need to be mapped
   */
  protected mapToCreationOrUpdate(province: Province): ProvinceCreation {
    return {
      id: province.id,
      maTinh: province.maTinh,
      tenTinh: province.tenTinh,
      cap: province.cap,
      isActive: province.isActive
    };
  }
}
