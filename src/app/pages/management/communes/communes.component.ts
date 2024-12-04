import { Component, OnInit } from '@angular/core';
import { columnConfig } from "../column-config";
import { CommunesClient } from "./client/communes.client";
import { Commune } from "./model/commune.model";
import { District } from "../districts/model/district.model";

@Component({
  selector: 'ord-communes',
  templateUrl: './communes.component.html',
  styleUrl: './communes.component.scss'
})
export class CommunesComponent implements OnInit {
  readonly defaultNewDistrictControls: Commune = {
    id: 0,
    maTinh: null,
    maHuyen: null,
    maXa: null,
    tenXa: null,
    isActive: false,
    isXaNgheo: false,
    isXaMienNui: false,
    isXaDanToc: false,
    isThanhThi: false
  }

  columns = columnConfig.commune;
  data: Commune[] = [];
  communeControlsToAddOrDelete: Commune = this.defaultNewDistrictControls;

  formType: "add" | "edit" = "add";
  isFormVisible = false;
  isFormEditing = false;

  constructor(private communesClient: CommunesClient) {
  }

  ngOnInit() {
    this.loadCommunes();
  }

  /**
   * Load list of communes
   */
  loadCommunes() {
    this.communesClient.getCommunes().subscribe({
      next: (response) => {
        this.data = response.items;
      },
      error: (err) => {
        console.error("Load Communes failed with error: " + err);
      }
    })
  }

  /**
   * Add commune
   */
  addCommune() {
    this.openForm();
    this.isFormEditing = false;
    this.formType = "add";
    this.communeControlsToAddOrDelete = this.defaultNewDistrictControls;
  }

  /**
   * Edit a commune
   * @param rowToEdit Commune to edit
   */
  editCommune(rowToEdit: Commune) {
    this.openForm();
    this.isFormEditing = true;
    this.formType = "edit";
    this.communeControlsToAddOrDelete = {...rowToEdit};
  }

  /**
   * Delete a commune row
   * @param rowNeedToBeDeleted CommuneModel row need to be deleted
   */
  deleteCommune(rowNeedToBeDeleted: any) {
    this.communesClient.deleteCommuneById(rowNeedToBeDeleted.id).subscribe({
      next: (response) => {
        alert(`Successfully deleted commune: ${response}`);
        this.loadCommunes();
      },
      error: (err) => {
        console.error("Delete commune failed: " + err);
      }
    })
  }

  /**
   * Handle form submit
   * @param formValue
   */
  handleSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
    this.communesClient.createOrUpdateCommunes(formValue).subscribe({
      next: (response) => {
        this.closeForm();
        console.log("Successfully create or update commune", response);
        this.loadCommunes();
        alert("Successfully create or update commune!");
      },
      error: (err) => {
        console.error("Failed to create or update commune: ", err);
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
