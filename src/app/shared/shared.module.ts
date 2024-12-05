import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from './entity-list/entity-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EntityFormComponent } from './entity-form/entity-form.component';
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
    declarations: [
        EntityListComponent,
        EntityFormComponent,
        DropdownComponent
    ],
  exports: [
    EntityListComponent,
    EntityFormComponent,
    DropdownComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
