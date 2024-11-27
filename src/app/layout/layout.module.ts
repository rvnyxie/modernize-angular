import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    LayoutComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink
    ]
})
export class LayoutModule { }
