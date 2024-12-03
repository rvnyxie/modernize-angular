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
}
