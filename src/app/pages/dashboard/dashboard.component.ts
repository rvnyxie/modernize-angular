import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'ord-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  form = this.formBuilder.group({})

  items = [
    { label: "Default label 1", value: "Default value 1" },
    { label: "Default label 2", value: "Default value 2" },
  ]

  constructor(private formBuilder: FormBuilder) {
  }
}
