import { Component } from '@angular/core';
import { columnsConfig } from "../columns-config";
import { CommunesClient } from "./client/communes.client";
import { Commune } from "./model/commune.model";
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

  columns = columnsConfig["commune"];
  dataClient = this.communesClient;

  // Search bar
  searchInputTerm = "";
  searchProvinceTerm = "";
  searchDistrictTerm = "";
  searchCommuneTerm = "";

  constructor(private communesClient: CommunesClient) {
    super();
  }

  onResetSearch() {
    console.log("onResetSearch");
  }

  onSearch() {
    console.log("onSearch");
  }
}
