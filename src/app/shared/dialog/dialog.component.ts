import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ord-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements AfterViewInit {
  @Input() title: string = "Default dialog title";
  @Input() isOpen: boolean = false;

  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  @ViewChild("cancelBtn") cancelBtn!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit() {
    if (this.isOpen) {
      this.cancelBtn.nativeElement.focus();
    }
  }

  /**
   * Cancel current action
   */
  onCancel(): void {
    this.cancel.emit();
  }

  /**
   * Confirm current action
   */
  onConfirm(): void {
    this.confirm.emit();
  }
}
