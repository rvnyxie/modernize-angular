import { Component, OnInit } from '@angular/core';
import { BaseManagementClient } from "./base-management-client/base-management.client";
import { ColumnInfoUsedForGeneration } from "../columns-config";
import { GetPaginationBody } from "../../../shared/model/get-pagination-body.model";

@Component({
  selector: 'ord-base-management',
  templateUrl: './base-management.component.html',
  styleUrl: './base-management.component.scss'
})
export abstract class BaseManagementComponent<EntityType> implements OnInit {
  // EntityType: The type used in each base management component

  abstract defaultControls: EntityType;
  abstract columns: ColumnInfoUsedForGeneration[];
  abstract dataClient: BaseManagementClient<EntityType, any>;

  data: EntityType[] = [];
  controlsToAddOrEdit!: EntityType;
  formType: "add" | "edit" = "add";
  isFormVisible = false;
  isFormEditing = false;

  // Pagination
  recordsPerPage = 20;
  currentPage = 1;

  ngOnInit() {
    this.loadData();
  }

  /**
   * Load data
   */
  loadData() {
    const getPaginationBody: GetPaginationBody = {
      filter: null,
      isActive: null,
      skipCount: this.currentPage,
      maxResultCount: this.recordsPerPage
    }

    this.dataClient.getList(getPaginationBody).subscribe({
      next: (response: any) => {
        this.data = response.items;
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
    this.dataClient.createOrUpdate(formValue).subscribe({
      next: (response: any) => {
        this.closeForm();
        this.loadData();
        console.log(response);
        alert("Successfully create or update entity!");
      },
      error: (err: any) => {
        console.error("Failed to create or update entity: ", err);
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
}
