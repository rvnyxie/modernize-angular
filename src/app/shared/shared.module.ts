import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from './entity-list/entity-list.component';
import { FormsModule } from "@angular/forms";



@NgModule({
    declarations: [
        EntityListComponent
    ],
    exports: [
        EntityListComponent
    ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
