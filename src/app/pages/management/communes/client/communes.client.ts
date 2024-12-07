import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Commune } from "../model/commune.model";
import { catchError, map, Observable, throwError } from "rxjs";
import { AuthService } from "../../../../auth/auth.service";
import { CommuneCreation } from "../model/commune-creation.model";
import { BaseManagementClient } from "../../base-management/base-management-client/base-management.client";

@Injectable({
  providedIn: 'root',
})
export class CommunesClient extends BaseManagementClient<Commune, CommuneCreation>{
  protected getApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/get-list';
  protected createAndUpdateApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/create-or-update';
  protected deleteApiUrl = 'http://test.nghiencuukhoahoc.com.vn/api/master-data/xa/delete-common-result';

  accessToken = this.authService.getAccessToken();

  constructor(httpClient: HttpClient,
              authService: AuthService,) {
    super(httpClient, authService);
  }

  /**
   * Get all communes by district's ID
   * @param districtId District's ID
   */
  getAllCommunesByDistrictId(districtId: string){
    const url = "http://test.nghiencuukhoahoc.com.vn/api/master-data/select-data-source/get-combo-data-source";
    const body = {
      type: 3,
      cascader: districtId
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
        console.error("Failed to fetch communes:", err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Map Commune to Creation or Update Commune
   * @param commune Commune need to be mapped
   */
  protected mapToCreationOrUpdate(commune: Commune): CommuneCreation {
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
