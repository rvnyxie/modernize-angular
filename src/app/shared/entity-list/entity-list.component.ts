import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ord-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss'
})
export class EntityListComponent implements OnInit {
  @Input() entityName!: string;
  @Input() columns: any[] = [];
  @Input() data: any[] = [];

  searchTerm: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  onSearch(): void {
    console.log('onSearch');
  }
}
