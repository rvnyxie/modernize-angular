import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";
import { District } from "../model/district.model";
import { DistrictCreation } from "../model/district-creation.model";
import { BaseManagementClient } from "../../base-management/base-management-client/base-management.client";

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
