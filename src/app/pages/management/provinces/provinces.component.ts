import { Component, OnInit } from '@angular/core';
import { columnConfig } from "../column-config";
import { ProvincesClient } from "./client/provinces.client";
import { Province } from "./model/province.model";
import { BaseManagementComponent } from "../base-management/base-management.component";

@Component({
  selector: 'ord-provinces',
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent extends BaseManagementComponent<Province>{
  defaultControls: Province = {
    id: 0,
    maTinh: null,
    tenTinh: null,
    cap: null,
    vungSinhThai: null,
    vungDiaLy: null,
    vungMien: null,
    isActive: false,
  };

  columns = columnConfig.province;
  dataService = this.provincesClient;

  constructor(private provincesClient: ProvincesClient) {
    super();
  }
}
