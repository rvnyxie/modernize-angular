import { Component, OnInit } from '@angular/core';
import { columnConfig } from "../column-config";
import { DistrictsClient } from "./client/districts.client";
import { District } from "./model/district.model";

@Component({
  selector: 'ord-districts',
  templateUrl: './districts.component.html',
  styleUrl: './districts.component.scss'
})
export class DistrictsComponent implements OnInit{
  columns = columnConfig.district;
  data: District[] = [];

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
        console.log("Districts loaded: " + response.items);
      },
      error: (err) => {
        console.error("Failed to load districts: " + err);
      }
    })
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
}
