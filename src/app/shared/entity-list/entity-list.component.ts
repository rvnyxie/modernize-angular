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

  @Output() addRow = new EventEmitter<any>();
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter();

  searchTerm: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  onSearch(): void {
    console.log('onSearch');
  }

  /**
   * Add new row
   */
  onAddRow() {
    this.addRow.emit();
  }

  /**
   * Handle editing row
   * @param row Row to edit
   */
  onEditRow(row: any) {
    console.log('onEditRow', row);
    this.editRow.emit(row);
  }

  /**
   * Handle deleting row
   * @param row Row to delete
   */
  onDeleteRow(row: any) {
    console.log('onDeleteRow', row);
    this.deleteRow.emit(row);
  }
}
