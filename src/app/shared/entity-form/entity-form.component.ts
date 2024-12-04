import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'ord-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.scss'
})
export class EntityFormComponent implements OnInit {
  @Input() title: string = 'Default Form Title';
  @Input() formType!: "add" | "edit";
  @Input() formFields: any[] = [];
  @Input() formControls!: any;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Create default form with initial setting (value, validators)
    const formControls: any = {};
    this.formFields.forEach((field) => {
      formControls[field.name] = [null];
      if (field.required) {
        formControls[field.name].push(Validators.required);
      }
    });
    this.formGroup = this.fb.group(formControls);

    // Patch value (adding and editing)
    if (this.formControls) {
      this.formGroup.patchValue(this.formControls);
    }
  }

  /**
   * Handle submit form action
   */
  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    }
  }

  /**
   * Handle cancel form action
   */
  onCancel() {
    this.formCancel.emit();
  }
}
