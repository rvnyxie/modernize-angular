import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../../auth/auth.service";

@Injectable()
export abstract class BaseManagementClient<T, C> {
  protected abstract getApiUrl: string;
  protected abstract createAndUpdateApiUrl: string;
  protected abstract deleteApiUrl: string;

  protected constructor(protected httpClient: HttpClient,
                        protected authService: AuthService) {
  }

  /**
   * Get list with filter
   */
  getList(filter: any = null, isActive: boolean | null = null, skipCount: number = 0, maxResultCount: number = 10) {
    const body = { filter, isActive, skipCount, maxResultCount };
    return this.httpClient.post(this.getApiUrl, body, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Create or update an entity
   */
  createOrUpdate(entity: T) {
    const body = this.mapToCreationOrUpdate(entity);
    return this.httpClient.post(this.createAndUpdateApiUrl, body, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Delete entity by id
   */
  deleteById(id: number) {
    const url = `${this.deleteApiUrl}/${id}`;
    return this.httpClient.post(url, {}, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Map entity to creation/update format
   */
  protected abstract mapToCreationOrUpdate(entity: T): C;

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
