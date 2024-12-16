import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EntityModel } from "../model/entity.model";
import { EntityCreationModel } from "../model/entity-creation.model";
import { EntityUpdateModel } from "../model/entity-update.model";
import { PaginationFilters } from "../../../../shared/model/pagination-filters.model";

@Injectable()
export abstract class BaseManagementClient<EntityType extends EntityModel, EntityCreationType extends EntityCreationModel, EntityUpdateType extends EntityUpdateModel> {
  protected abstract getApiUrl: string;
  protected abstract creationApiUrl: string;
  protected abstract updateApiUrl: string;
  protected abstract deleteApiUrl: string;

  protected constructor(protected httpClient: HttpClient) {
  }

  /**
   * Get list of entities with filter
   */
  public getList(paginationFilters: PaginationFilters) {
    // TODO: set pagination to url
    return this.httpClient.get(this.getApiUrl);
  }

  /**
   * Create entity
   * @param creationEntity Creation entity
   */
  public createEntity(creationEntity: EntityCreationType) {
    return this.httpClient.post(this.creationApiUrl, creationEntity);
  }

  /**
   * Update entity
   * @param updateEntity Update entity
   */
  public updateEntity(updateEntity: EntityUpdateType) {
    const updateApiUrlWithId = `${this.updateApiUrl}/${updateEntity.id}`;
    return this.httpClient.put(updateApiUrlWithId, updateEntity);
  }

  /**
   * Delete entity by id
   */
  public deleteById(id: number) {
    const deleteApiUrlWithId = `${this.deleteApiUrl}/${id}`;
    return this.httpClient.delete(deleteApiUrlWithId);
  }
}
