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

  rowsSelected: Array<any> = [];

  // Dialog
  isDialogOpen: boolean = false;
  dialogTitle!: string;
  dialogDescription!: string;

  searchTerm: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  onSearch(): void {
    console.log('onSearch');
  }

  /**
   * Set up dialog information for deletion
   * @param row Row will be deleted
   */
  openDialogForDeletion(row: any): void {
    this.dialogTitle = 'Thực hiện xóa?';
    this.dialogDescription = "Dòng đã chọn sẽ bị xóa"
    this.isDialogOpen = true;
    this.rowsSelected.push(row);
  }

  /**
   * Handle dialog cancel button event
   */
  onDialogCancel() {
    console.log('onDialogCancel');
    this.rowsSelected = [];
    this.isDialogOpen = false;
  }

  /**
   * Handle dialog confirm button event
   */
  onDialogConfirm() {
    console.log('onDialogConfirm');

    if (this.rowsSelected.length === 1) {
      this.onDeleteRow(this.rowsSelected[0]);
    }

    this.isDialogOpen = false;
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
