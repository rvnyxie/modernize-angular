import { Component, OnInit } from '@angular/core';
import { columnsConfig } from "../columns-config";
import { CommunesClient } from "./client/communes.client";
import { Commune } from "./model/commune.model";
import { BaseManagementComponent } from "../base-management/base-management.component";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ProvincesClient } from "../provinces/client/provinces.client";
import { DistrictsClient } from "../districts/client/districts.client";

@Component({
  selector: 'ord-communes',
  templateUrl: './communes.component.html',
  styleUrl: './communes.component.scss'
})
export class CommunesComponent extends BaseManagementComponent<Commune> implements OnInit {
  readonly defaultControls: Commune = {
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

  columns = columnsConfig["commune"];
  dataClient = this.communesClient;

  // Search form
  searchForm: FormGroup<{
    searchInput: FormControl<string | null>,
    searchProvince: FormControl<string | null>,
    searchDistrict: FormControl<string | null>,
    searchCommune: FormControl<string | null>,
  }> = this.formBuilder.group({
    searchInput: "",
    searchProvince: "",
    searchDistrict: "",
    searchCommune: ""
  });
  provincesForDropdown: { label: string, value: string }[] = [];
  districtsForDropdown: { label: string, value: string }[] = [];
  communesForDropdown: { label: string, value: string }[] = [];

  constructor(private provinceClient: ProvincesClient,
              private districtClient: DistrictsClient,
              private communesClient: CommunesClient,
              private formBuilder: FormBuilder) {
    super();
    console.log(this.searchForm.value)
  }

  override ngOnInit() {
    // Get list of provinces when initializing
    this.provinceClient.getAllProvinces().subscribe({
      next: (provinces) => {
        this.provincesForDropdown = provinces;
      }
    })

    // Track changes in province search, get corresponding districts
    this.searchForm.controls.searchProvince.valueChanges.subscribe(provinceId => {
      if (provinceId) {
        this.districtClient.getAllDistrictsByProvinceId(provinceId).subscribe({
          next: (districts) => {
            this.districtsForDropdown = districts;
          }
        })
      }
    })

    // Track changes in district search, get corresponding districts
    this.searchForm.controls.searchDistrict.valueChanges.subscribe(districtId => {
      if (districtId) {
        this.communesClient.getAllCommunesByDistrictId(districtId).subscribe({
          next: (communes) => {
            this.communesForDropdown = communes;
          }
        })
      }
    })

    this.loadData();
  }

  onResetSearch() {
    console.log("onResetSearch");
    this.searchForm.reset();
  }

  onSearch() {
    console.log("onSearch");
    console.log(this.searchForm.value);
  }
}
