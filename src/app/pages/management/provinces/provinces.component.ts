import { Component } from '@angular/core';

@Component({
  selector: 'ord-provinces',
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent {
  columns = ['id', 'name', 'region'];
  data = [
    { id: 1, name: "Province 1", region: "Canada" },
    { id: 2, name: "Province 2", region: "Canada" },
  ]
}
