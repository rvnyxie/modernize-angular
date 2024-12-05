import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'ord-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }]
})
export class DropdownComponent implements ControlValueAccessor{
  @Input() items: { label: string, value: any }[] = [];
  @Input() placeholder: string = "Default placeholder";

  isDropdownOpen = false;
  isDisabled = false;
  filteredItems: { label: string, value: any }[] = [
    { label: "Default label 1", value: "Default value 1" },
    { label: "Default label 2", value: "Default value 2" },
  ]
  activeIndex = 0;

  searchControl = new FormControl();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredItems = this.items.filter(item => {
        return item.label.toLowerCase().includes(value.toLowerCase())
      });
      this.activeIndex = 0;
    });
  }

  writeValue(value: any): void {
    const selectedItem = this.items.find(item => item.value === value);
    this.searchControl.setValue(selectedItem?.label || '', { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Handle search event
   * @param searchTerm Current search term
   */
  onSearch(searchTerm: string): void {
    this.isDropdownOpen = !!searchTerm;
  }

  /**
   * Handle special key down event in search input
   * @param event Search input event
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "ArrowDown") {
      this.activeIndex = Math.min(this.activeIndex + 1, this.filteredItems.length - 1);
    } else if (event.key === "ArrowUp") {
      this.activeIndex = Math.min(this.activeIndex - 1, 0);
    } else if (event.key === "Enter") {
      this.selectItem(this.filteredItems[this.activeIndex]);
    }
  }

  /**
   * Handle select item event
   * @param item Item selected
   */
  selectItem(item: any): void {
    this.searchControl.setValue(item.label, { emitEvent: false });
    this.onChange(item.value);
    this.isDropdownOpen = false;
  }
}
