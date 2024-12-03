import { Component } from '@angular/core';
import { columnConfig } from "../column-config";

@Component({
  selector: 'ord-communes',
  templateUrl: './communes.component.html',
  styleUrl: './communes.component.scss'
})
export class CommunesComponent {
  columns = columnConfig.commune;
  data = [
    {
      id: 10615,
      maTinh: '99',
      maHuyen: '999',
      maXa: '9999',
      tenXa: null,
      cap: 'Xã',
      isActive: true,
      isXaNgheo: false,
      isXaMienNui: false,
      isXaDanToc: false,
      isThanhThi: false,
    }
    ];
}
