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
  @Input() isReadOnly: boolean = false;

  isDropdownOpen = false;
  isDisabled = false;
  filteredItems: { label: string, value: any }[] = [];
  activeIndex = 0;

  searchControl = new FormControl();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      if (value != null && typeof value === "string") {
        const searchTerms = value.toLowerCase().split(' ').filter(term => term.trim() !== '');

        this.filteredItems = this.items.filter(item => {
          const wordsInLabel = item.label.toLowerCase().split(" ");

          // Check if every search term matches any word in the label
          return searchTerms.every(searchTerm =>
            wordsInLabel.some(word => word.includes(searchTerm))
          );
        });

        this.activeIndex = 0;
      }
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
    if (isDisabled) {
      this.searchControl.disable();
    } else {
      this.searchControl.enable();
    }
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
      if (this.filteredItems.length > 0) {
        this.selectItem(this.filteredItems[this.activeIndex]);
      }
      event.preventDefault();
    }
  }

  /**
   * Handle select item event
   * @param item Item selected
   */
  selectItem(item: any): void {
    this.searchControl.setValue(item.label, { emitEvent: false });
    this.onChange(item.value); // Notify parent form
    this.onTouched(); // Mark as touched
    this.isDropdownOpen = false;
  }

  /**
   * Toggle dropdown menu
   */
  toggleDropdownMenu() {
    if (this.isDisabled) {
      return;
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Handle click on input
   */
  onInputClick() {
    if (this.isReadOnly) {
      this.toggleDropdownMenu();
    }
  }
}
