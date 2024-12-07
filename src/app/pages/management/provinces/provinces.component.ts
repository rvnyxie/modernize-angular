import { Component } from '@angular/core';
import { columnsConfig } from "../columns-config";
import { ProvincesClient } from "./client/provinces.client";
import { Province } from "./model/province.model";
import { BaseManagementComponent } from "../base-management/base-management.component";

@Component({
  selector: 'ord-provinces',
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent extends BaseManagementComponent<Province>{
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

  searchInputTerm = "";
  searchProvinceTerm = "";

  constructor(private provincesClient: ProvincesClient) {
    super();
  }

  onResetSearch() {
    console.log("onResetSearch");
  }

  onSearch() {
    console.log("onSearch");
  }
}
