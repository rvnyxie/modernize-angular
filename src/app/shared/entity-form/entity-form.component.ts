import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'ord-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.scss'
})
export class EntityFormComponent implements OnInit {
  @Input() title: string = 'Create Entity';
  @Input() formFields: any[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const formControls: any = {};
    this.formFields.forEach((field) => {
      formControls[field.field] = [null];
      if (field.required) {
        formControls[field.field].push(Validators.required);
      }
    });
    this.formGroup = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
}
