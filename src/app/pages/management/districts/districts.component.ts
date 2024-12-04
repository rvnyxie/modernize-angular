import { Component, OnInit } from '@angular/core';
import { columnConfig } from "../column-config";
import { DistrictsClient } from "./client/districts.client";
import { District } from "./model/district.model";
import { Province } from "../provinces/model/province.model";

@Component({
  selector: 'ord-districts',
  templateUrl: './districts.component.html',
  styleUrl: './districts.component.scss'
})
export class DistrictsComponent implements OnInit{
  readonly defaultNewDistrictControls: District = {
    id: 0,
    maTinh: null,
    tenHuyen: null,
    maHuyen: null,
    cap: null,
    isActive: false
  }

  columns = columnConfig.district;
  data: District[] = [];
  districtControlsToAddOrDelete: District = this.defaultNewDistrictControls;

  formType: "add" | "edit" = "add";
  isFormVisible = false;
  isFormEditing = false;

  constructor(private districtClient: DistrictsClient) {
  }

  ngOnInit() {
    this.loadDistricts();
  }

  /**
   * Get districts
   */
  loadDistricts() {
    this.districtClient.getDistricts().subscribe({
      next: (response) => {
        this.data = response.items;
      },
      error: (err) => {
        console.error("Failed to load districts: " + err);
      }
    })
  }

  /**
   * Add district
   */
  addDistrict() {
    this.openForm();
    this.isFormEditing = false;
    this.formType = "add";
    this.districtControlsToAddOrDelete = this.defaultNewDistrictControls;
  }

  /**
   * Edit a district
   * @param rowToEdit District to edit
   */
  editProvince(rowToEdit: District) {
    this.openForm();
    this.isFormEditing = true;
    this.formType = "edit";
    this.districtControlsToAddOrDelete = {...rowToEdit};
  }

  /**
   * Delete a district
   * @param rowNeedToBeDeleted District row need to be deleted
   */
  deleteDistrict(rowNeedToBeDeleted: District) {
    this.districtClient.deleteDistrictById(rowNeedToBeDeleted.id).subscribe({
      next: (response) => {
        alert("District deleted successfully " + rowNeedToBeDeleted);
        this.loadDistricts();
      },
      error: (err) => {
        console.error("Failed to delete district: " + err);
      }
    })
  }

  /**
   * Handle form submit
   * @param formValue
   */
  handleSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
    this.districtClient.createOrUpdateDistrict(formValue).subscribe({
      next: (response) => {
        this.closeForm();
        console.log("Successfully create or update district", response);
        this.loadDistricts();
        alert("Successfully create or update district!");
      },
      error: (err) => {
        console.error("Failed to create or update district: ", err);
      }
    });
  }

  /**
   * Handle form cancel
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
