import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";

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
}
