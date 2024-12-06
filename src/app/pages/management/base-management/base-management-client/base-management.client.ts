import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";
import { GetPaginationBody } from "../../../../shared/model/get-pagination-body.model";

@Injectable()
export abstract class BaseManagementClient<EntityType, CreationOrUpdateType> {
  // EntityType: The type used in each base management component
  // CreationOrUpdateType: The type used for creation or update payloads

  protected abstract getApiUrl: string;
  protected abstract createAndUpdateApiUrl: string;
  protected abstract deleteApiUrl: string;

  protected constructor(protected httpClient: HttpClient,
                        protected authService: AuthService) {
  }

  /**
   * Get list with filter
   */
  public getList(body: GetPaginationBody) {
    return this.httpClient.post(this.getApiUrl, body, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Create or update an entity
   */
  public createOrUpdate(entity: EntityType) {
    const body = this.mapToCreationOrUpdate(entity);
    return this.httpClient.post(this.createAndUpdateApiUrl, body, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Delete entity by id
   */
  public deleteById(id: number) {
    const url = `${this.deleteApiUrl}/${id}`;
    return this.httpClient.post(url, {}, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Map entity to creation/update format
   */
  protected abstract mapToCreationOrUpdate(entity: EntityType): CreationOrUpdateType;

  /**
   * Get common headers
   */
  private getHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.authService.getAccessToken()}`,
    };
  }
}
