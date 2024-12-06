import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from '@angular/core';
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
export class DropdownComponent implements ControlValueAccessor, AfterViewInit {
  @Input() items: { label: string, value: any }[] = [];
  @Input() placeholder: string = "Default placeholder";
  @Input() isReadOnly: boolean = false;
  @Input() isContentFit: boolean = false;
  @Output() valueChange = new EventEmitter();

  @ViewChild("dropdownContainer") dropdownContainer!: ElementRef;

  isDropdownOpen = false;
  isDisabled = false;
  filteredItems: { label: string, value: any }[] = [];
  selectedItems: { label: string, value: any }[] = [];
  activeIndex = 0;

  searchControl = new FormControl();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      if (this.isReadOnly) {
        this.filteredItems = [...this.items];
      } else {
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
      }
    });
  }

  ngAfterViewInit() {
    // Adjust the dropdown size based on its current content
    // Only available for when set it readonly and fit content
    setTimeout(() => {
      if (this.isReadOnly && this.isContentFit) {
        this.adjustDropdownWidth();
      }
    });
  }

  adjustDropdownWidth() {
    if (this.dropdownContainer && this.items) {
      const hiddenElement = document.createElement('div');
      hiddenElement.style.visibility = 'hidden';
      hiddenElement.style.position = 'absolute';
      hiddenElement.style.whiteSpace = 'nowrap';

      this.items.forEach(item => {
        const option = document.createElement('span');
        option.innerText = item.label;
        hiddenElement.appendChild(option);
      });

      document.body.appendChild(hiddenElement);
      const width = hiddenElement.getBoundingClientRect().width;
      this.dropdownContainer.nativeElement.style.width = `${width + 36}px`;
      document.body.removeChild(hiddenElement);
    }
  }

  writeValue(value: any): void {
    const selectedItem = this.items.find(item => item.value === value);
    this.searchControl.setValue(selectedItem?.label || '', { emitEvent: false });

    if (this.isReadOnly) {
      this.filteredItems = [...this.items];
      this.activeIndex = this.filteredItems.findIndex(item => item.value === value);
    }
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
        this.selectItem(this.filteredItems[this.activeIndex], this.activeIndex);
      }
      event.preventDefault();
    }
  }

  /**
   * Handle select item event
   * @param item Item selected
   * @param index Item's index selected
   */
  selectItem(item: any, index: number): void {
    this.searchControl.setValue(item.label, { emitEvent: false });
    this.activeIndex = index;
    this.onChange(item.value); // Notify parent form
    this.valueChange.emit(item.value);
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
