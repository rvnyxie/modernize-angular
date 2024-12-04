import { Component, OnInit } from '@angular/core';
import { columnConfig } from "../column-config";
import { CommunesClient } from "./client/communes.client";
import { Commune } from "./model/commune.model";
import { District } from "../districts/model/district.model";
import { BaseManagementComponent } from "../base-management/base-management.component";

@Component({
  selector: 'ord-communes',
  templateUrl: './communes.component.html',
  styleUrl: './communes.component.scss'
})
export class CommunesComponent extends BaseManagementComponent<Commune>{
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

  columns = columnConfig.commune;
  dataClient = this.communesClient;

  constructor(private communesClient: CommunesClient) {
    super();
  }
}
