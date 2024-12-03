import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ord-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss'
})
export class EntityListComponent implements OnInit {
  @Input() entityName!: string;
  @Input() columns: any[] = [];
  @Input() data: any[] = [];

  @Output() deleteRow = new EventEmitter();

  searchTerm: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  onSearch(): void {
    console.log('onSearch');
  }

  onDeleteRow(row: any) {
    console.log('onDeleteRow', row);
    this.deleteRow.emit(row);
  }
}
