import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ord-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements AfterViewInit {
  private _isOpen: boolean = false;

  @Input() title: string = "Default dialog title";
  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      // Wait for the view to render before focusing
      setTimeout(() => {
        this.cancelBtn?.nativeElement.focus();
      });
    }
  }
  get isOpen(): boolean {
    return this._isOpen;
  }

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
