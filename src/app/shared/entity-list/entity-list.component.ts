import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'ord-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss'
})
export class EntityListComponent implements OnInit, OnChanges {
  @Input() entityName!: string;
  @Input() columns: any[] = [];
  @Input() data: any[] = [];

  // Pagination Inputs
  @Input() recordsPerPage!: number;
  @Output() recordsPerPageChange = new EventEmitter<number>();
  @Input() totalRecordsCount!: number;
  @Input() currentPage!: number;
  @Output() currentPageChange = new EventEmitter<number>();

  @Output() addRow = new EventEmitter<any>();
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter();

  rowsSelected: Array<any> = [];

  // Dialog
  isDialogOpen: boolean = false;
  dialogTitle!: string;
  dialogDescription!: string;

  // Pagination
  form!: FormGroup<{
    pageSize: FormControl<number>;
  }>;
  firstRecordIndex: number = 0;
  lastRecordIndex: number = 0;
  isBackPaginationNavDisabled = false;
  isForwardPaginationNavDisabled = false;

  searchTerm: string = '';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // Create form for pagination
    this.form = this.formBuilder.group({
      pageSize: this.formBuilder.control(this.recordsPerPage, { nonNullable: true }),
    })

    // Listen to page size change
    this.form.get("pageSize")?.valueChanges.subscribe((pageSize: number) => {
      this.recordsPerPage = pageSize;
      this.recordsPerPageChange.emit(this.recordsPerPage);
    })

    this.calculatePaginationInfo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["totalRecordsCount"] || changes["recordsPerPage"] || changes["currentPage"]) {
      this.calculatePaginationInfo();
    }
  }

  /**
   * Calculate the indices in pagination
   */
  private calculatePaginationInfo() {
    this.firstRecordIndex = (this.currentPage - 1) * this.recordsPerPage + 1;
    this.lastRecordIndex = Math.min(this.currentPage * this.recordsPerPage, this.totalRecordsCount);
    this.checkIsPaginationNavDisabled();
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

  /**
   * Handle back action in pagination
   */
  onMoveBackPage() {
    this.currentPage = Math.max(1, this.currentPage - 1);
    this.currentPageChange.emit(this.currentPage);
  }

  /**
   * Handle forward action in pagination
   */
  onMoveForwardPage() {
    const maxPage: number = Math.ceil(this.totalRecordsCount / this.recordsPerPage);
    this.currentPage = Math.min(maxPage, this.currentPage + 1);
    this.currentPageChange.emit(this.currentPage);
  }

  /**
   * Check if current page is at the edges, so the corresponding nav button will be disabled
   */
  checkIsPaginationNavDisabled() {
    const minPage = 1;
    const maxPage: number = Math.ceil(this.totalRecordsCount / this.recordsPerPage);

    this.isBackPaginationNavDisabled = false;
    this.isForwardPaginationNavDisabled = false;

    if (this.currentPage === minPage) {
      this.isBackPaginationNavDisabled = true;
    } else if (this.currentPage === maxPage) {
      this.isForwardPaginationNavDisabled = true;
    }
  }
}
