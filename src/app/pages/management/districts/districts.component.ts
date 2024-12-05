import { Component } from '@angular/core';
import { columnsConfig } from "../columns-config";
import { DistrictsClient } from "./client/districts.client";
import { District } from "./model/district.model";
import { BaseManagementComponent } from "../base-management/base-management.component";

@Component({
  selector: 'ord-districts',
  templateUrl: './districts.component.html',
  styleUrl: './districts.component.scss'
})
export class DistrictsComponent extends BaseManagementComponent<District>{
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

  constructor(private districtClient: DistrictsClient) {
    super();
  }
}
