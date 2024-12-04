import { Component, OnInit } from '@angular/core';
import { columnConfig } from "../column-config";
import { ProvincesClient } from "./client/provinces.client";
import { Province } from "./model/province.model";

@Component({
  selector: 'ord-provinces',
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent implements OnInit {
  readonly defaultNewProvinceControls: Province = {
    id: 0,
    maTinh: null,
    tenTinh: null,
    cap: null,
    vungSinhThai: null,
    vungDiaLy: null,
    vungMien: null,
    isActive: false
  }

  columns = columnConfig.province;
  data: any[] = [];
  provinceControlsToAddOrDelete: Province = this.defaultNewProvinceControls;

  formType: "add" | "edit" = "add";
  isFormVisible = false;
  isFormEditing = false;

  constructor(private provincesClient: ProvincesClient) {
  }

  ngOnInit() {
    this.loadProvinces();
  }

  /**
   * Get list of provinces
   */
  loadProvinces() {
    this.provincesClient.getProvinces().subscribe({
      next: (response: any) => {
        this.data = response.items;
      },
      error: (err) => {
        console.error("Failed to load Provinces", err);
      }
    })
  }

  /**
   * Add new province
   */
  addProvince() {
    this.openForm();
    this.isFormEditing = false;
    this.formType = "add";
    this.provinceControlsToAddOrDelete = this.defaultNewProvinceControls;
  }

  /**
   * Edit a province
   * @param rowToEdit Province to edit
   */
  editProvince(rowToEdit: Province) {
    this.openForm();
    this.isFormEditing = true;
    this.formType = "edit";
    this.provinceControlsToAddOrDelete = {...rowToEdit};
  }

  /**
   * Delete a row of province
   * @param rowToDelete Row to delete
   */
  deleteProvince(rowToDelete: Province) {
    this.provincesClient.deleteProvinceById(rowToDelete.id).subscribe({
      next: (response) => {
        alert("District deleted successfully");
      },
      error: (err) => {
        console.error("Failed to delete Province: ", rowToDelete);
      }
    })
  }

  /**
   * Handle form submit
   * @param formValue
   */
  handleSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
    this.provincesClient.createOrUpdateProvince(formValue).subscribe({
      next: (response) => {
        this.closeForm();
        console.log("Successfully create or update province", response);
        alert("Successfully create or update province!");
      },
      error: (err) => {
        console.error("Failed to create or update province: ", err);
      }
    });
  }

  /**
   * Handle form cancel
   */
  handleCancel() {
    this.isFormVisible = false;
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
