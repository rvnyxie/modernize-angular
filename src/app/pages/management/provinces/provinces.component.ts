import { Component } from '@angular/core';
import { columnConfig } from "../column-config";

@Component({
  selector: 'ord-provinces',
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent {
  columns = columnConfig.province;
  data = [
    {
      "id": 90,
      "vungMien": null,
      "vungDiaLy": null,
      "maTinh": "99",
      "tenTinh": "Tỉnh 101",
      "cap": "Thành phố trung ương",
      "isActive": false,
      "vungSinhThai": null
    },
    {
      "id": 62,
      "vungMien": null,
      "vungDiaLy": null,
      "maTinh": "95",
      "tenTinh": "Bạc Liêu",
      "cap": "Tỉnh",
      "isActive": true,
      "vungSinhThai": null
    }
  ]
}
