import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from './entity-list/entity-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EntityFormComponent } from './entity-form/entity-form.component';



@NgModule({
    declarations: [
        EntityListComponent,
        EntityFormComponent
    ],
  exports: [
    EntityListComponent,
    EntityFormComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
