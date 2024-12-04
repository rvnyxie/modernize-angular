import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";
import { Province } from "../model/province.model";
import { ProvinceCreation } from "../model/province-creation.model";
import { BaseManagementClient } from "../../base-management/base-management-client/base-management.client";

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
