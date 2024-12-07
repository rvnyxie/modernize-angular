import { Component, OnInit } from '@angular/core';
import { columnsConfig } from "../columns-config";
import { ProvincesClient } from "./client/provinces.client";
import { Province } from "./model/province.model";
import { BaseManagementComponent } from "../base-management/base-management.component";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'ord-provinces',
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent extends BaseManagementComponent<Province> implements OnInit {
  readonly defaultControls: Province = {
    id: 0,
    maTinh: null,
    tenTinh: null,
    cap: null,
    vungSinhThai: null,
    vungDiaLy: null,
    vungMien: null,
    isActive: false,
  };

  columns = columnsConfig["province"];
  dataClient = this.provincesClient;

  // Search form
  provinceSearchForm: FormGroup<{
    searchInput: FormControl<string | null>,
    searchProvince: FormControl<string | null>
  }> = this.formBuilder.group({
    searchInput: [""],
    searchProvince: [""],
  });
  provincesForDropdown: { label: string, value: string }[] = [];

  constructor(private provincesClient: ProvincesClient,
              private formBuilder: FormBuilder) {
    super();
  }

  override ngOnInit() {
    this.provincesClient.getAllProvinces().subscribe({
      next: (provinces) => {
        this.provincesForDropdown = provinces;
      },
      error: (err) => {
        console.error("Error fetching provinces:", err);
      }
    });
    this.loadData();
  }

  onResetSearch() {
    this.provinceSearchForm.reset();
  }

  onSearch() {
    console.log("onSearch");
    console.log(this.provinceSearchForm.value);
  }
}
