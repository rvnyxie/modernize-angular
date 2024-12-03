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
  columns = columnConfig.province;
  data: any[] = [];

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
  }

  /**
   * Edit a province
   * @param rowToEdit Province to edit
   */
  editProvince(rowToEdit: Province) {
    this.openForm();
    this.isFormEditing = true;
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
    this.isFormVisible = false;
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
}
