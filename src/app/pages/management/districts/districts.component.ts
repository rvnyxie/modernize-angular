import { Component, OnInit } from '@angular/core';
import { columnsConfig } from "../columns-config";
import { DistrictsClient } from "./client/districts.client";
import { District } from "./model/district.model";
import { BaseManagementComponent } from "../base-management/base-management.component";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ProvincesClient } from "../provinces/client/provinces.client";

@Component({
  selector: 'ord-districts',
  templateUrl: './districts.component.html',
  styleUrl: './districts.component.scss'
})
export class DistrictsComponent extends BaseManagementComponent<District> implements OnInit {
  readonly defaultControls: District = {
    id: 0,
    maTinh: null,
    tenHuyen: null,
    maHuyen: null,
    cap: null,
    isActive: false
  }

  columns = columnsConfig["district"];
  dataClient = this.districtClient;

  // Search form
  searchForm: FormGroup<{
    searchInput: FormControl<string | null>,
    searchProvince: FormControl<string | null>,
    searchDistrict: FormControl<string | null>,
  }> = this.formBuilder.group({
    searchInput: "",
    searchProvince: "",
    searchDistrict: ""
  });
  provincesForDropdown: { label: string, value: string }[] = [];
  districtsForDropdown: { label: string, value: string }[] = [];

  constructor(private provinceClient: ProvincesClient,
              private districtClient: DistrictsClient,
              private formBuilder: FormBuilder) {
    super();
  }

  override ngOnInit() {
    // Get list of provinces when initializing
    this.provinceClient.getAllProvinces().subscribe({
      next: (provinces) => {
        this.provincesForDropdown = provinces;
      }
    })

    // Track changes in searchProvince, get corresponding districts
    this.searchForm.controls.searchProvince.valueChanges.subscribe(value => {
      if (value) {
        this.districtClient.getAllDistrictsByProvinceId(value).subscribe({
          next: (districts) => {
            this.districtsForDropdown = districts;
          }
        })
      }
    })

    this.loadData();
  }

  onResetSearch() {
    console.log("onResetSearch");
  }

  onSearch() {
    console.log("onSearch");
    console.log(this.searchForm.value);
  }
}
