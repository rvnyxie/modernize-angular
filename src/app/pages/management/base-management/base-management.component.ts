import { Component, OnInit } from '@angular/core';
import { ProvincesClient } from "../provinces/client/provinces.client";
import { DistrictsClient } from "../districts/client/districts.client";
import { CommunesClient } from "../communes/client/communes.client";
import { Province } from "../provinces/model/province.model";
import { BaseManagementClient } from "./base-management-client/base-management.client";
import { District } from "../districts/model/district.model";
import { Commune } from "../communes/model/commune.model";
import { ProvinceCreation } from "../provinces/model/province-creation.model";
import { DistrictCreation } from "../districts/model/district-creation.model";
import { CommuneCreation } from "../communes/model/commune-creation.model";

@Component({
  selector: 'ord-base-management',
  templateUrl: './base-management.component.html',
  styleUrl: './base-management.component.scss'
})
export abstract class BaseManagementComponent<T extends Province | District | Commune> implements OnInit {
  abstract defaultControls: T;
  abstract columns: any[];
  abstract dataClient: ProvincesClient | DistrictsClient | CommunesClient;

  data: T[] = [];
  controlsToAddOrEdit!: T;
  formType: "add" | "edit" = "add";
  isFormVisible = false;
  isFormEditing = false;

  ngOnInit() {
    this.loadData();
  }

  /**
   * Load data
   */
  loadData() {
    this.dataClient.getList().subscribe({
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
  editEntity(entity: T) {
    this.openForm();
    this.isFormEditing = true;
    this.formType = "edit";
    this.controlsToAddOrEdit = { ...entity };
  }

  /**
   * Delete entity
   * @param entity Entity to delete
   */
  deleteEntity(entity: T) {
    const entityId = (entity as any).id;
    this.dataClient.deleteById(entityId).subscribe({
      next: (response: any) => {
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
  handleSubmit(formValue: T) {
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
