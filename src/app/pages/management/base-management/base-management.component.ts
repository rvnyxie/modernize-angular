import { Component, OnInit } from '@angular/core';
import { BaseManagementClient } from "./base-management-client/base-management.client";
import { ColumnInfoUsedForGeneration } from "../../columns-config";
import { PaginationFilters } from "../../../shared/model/pagination-filters.model";
import { EntityModel } from "./model/entity.model";
import { EntityCreationModel } from "./model/entity-creation.model";
import { EntityUpdateModel } from "./model/entity-update.model";

@Component({
  selector: "ord-base-management",
  template: ``,
  styles: ""
})
export abstract class BaseManagementComponent<EntityType extends EntityModel, EntityCreationType extends EntityCreationModel, EntityUpdateType extends EntityUpdateModel> implements OnInit {
  abstract defaultControls: EntityType;
  abstract columns: ColumnInfoUsedForGeneration[];
  abstract dataClient: BaseManagementClient<EntityModel, EntityCreationModel, EntityUpdateModel>;

  data: EntityType[] = [];
  controlsToAddOrEdit!: EntityType;
  formType: "add" | "edit" = "add";
  isFormVisible = false;
  isFormEditing = false;

  // Pagination
  // Handle actions with changing records page size
  private _recordsPerPage = 10;
  get recordsPerPage(): number {
    return this._recordsPerPage;
  }
  set recordsPerPage(value: number) {
    if (this._recordsPerPage !== value) {
      this._recordsPerPage = value;
      this.loadData();
    }
  }

  // Handle actions with changing current page
  private _currentPage = 1;
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(value: number) {
    if (this._currentPage !== value) {
      this._currentPage = value;
      this.loadData();
    }
  }
  totalRecordsCount: number = 0;

  ngOnInit() {
    this.loadData();
  }

  /**
   * Load data
   */
  loadData() {
    const paginationFilters: PaginationFilters = {
    }

    this.dataClient.getList(paginationFilters).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data = response;
        this.totalRecordsCount = this.data.length;
      },
      error: (err: any) => {
        console.log("Failed to load data: ", err);
      }
    })
  }

  /**
   * Add entity
   */
  addEntity() {
    this.openForm();
    this.isFormEditing = false;
    this.formType = "add";
    this.controlsToAddOrEdit = { ...this.defaultControls };
  }

  /**
   * Edit entity
   * @param entity Entity to edit
   */
  editEntity(entity: EntityType) {
    this.openForm();
    this.isFormEditing = true;
    this.formType = "edit";
    this.controlsToAddOrEdit = { ...entity };
  }

  /**
   * Delete entity
   * @param entity Entity to delete
   */
  deleteEntity(entity: EntityType) {
    const entityId = (entity as any).id;
    this.dataClient.deleteById(entityId).subscribe({
      next: () => {
        alert("Successfully deleted entity!");
        this.loadData();
      },
      error: (err: any) => {
        console.error("Failed to delete entity: ", err);
      }
    });
  }

  /**
   * Handle form submission
   * @param formValue Form data
   */
  handleSubmit(formValue: EntityType) {
    // TODO: handle creating and updating
    if (this.formType === "add") {
      this.handleCreationSubmit(formValue);
    } else if (this.formType === "edit") {
      this.handleUpdateSubmit(formValue);
    }
  }

  /**
   * Handle form creating submission
   * @param formValue Form data
   */
  handleCreationSubmit(formValue: EntityType) {
    const creationEntity = this.mapEntityToCreationEntity(formValue);

    this.dataClient.createEntity(creationEntity).subscribe({
      next: (response: any) => {
        this.closeForm();
        this.loadData();
        console.log(response);
        alert("Successfully creating entity!");
      },
      error: (err: any) => {
        console.error("Failed to create entity: ", err);
      }
    })
  }

  /**
   * Handle form updating submission
   * @param formValue Form data
   */
  handleUpdateSubmit(formValue: EntityType) {
    const updateEntity = this.mapEntityToUpdateEntity(formValue);

    this.dataClient.updateEntity(updateEntity).subscribe({
      next: (response: any) => {
        this.closeForm();
        this.loadData();
        console.log(response);
        alert("Successfully updating entity!");
      },
      error: (err: any) => {
        console.error("Failed to update entity: ", err);
      }
    })
  }

  /**
   * Handle cancel action
   */
  handleCancel() {
    this.closeForm();
  }

  /**
   * Open form
   */
  openForm() {
    this.isFormVisible = true;
  }

  /**
   * Close form
   */
  closeForm() {
    this.isFormVisible = false;
  }

  /**
   * Map entity to creation entity
   */
  protected abstract mapEntityToCreationEntity(entity: EntityType): EntityCreationType;

  /**
   * Map entity to update entity
   */
  protected abstract mapEntityToUpdateEntity(entity: EntityType): EntityUpdateType;
}
