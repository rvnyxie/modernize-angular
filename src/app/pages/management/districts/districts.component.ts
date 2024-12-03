import { Component } from '@angular/core';
import { columnConfig } from "../column-config";

@Component({
  selector: 'ord-districts',
  templateUrl: './districts.component.html',
  styleUrl: './districts.component.scss'
})
export class DistrictsComponent {
  columns = columnConfig.district;
  data = [
    {
      "id": 708,
      "maTinh": "99",
      "maHuyen": "999",
      "tenHuyen": "Huyen 99999",
      "cap": "Huyên",
      "isActive": false
    }
  ]
}
