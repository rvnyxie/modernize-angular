import { Component } from '@angular/core';

@Component({
  selector: 'ord-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarVisible = false;
  isSidebarMini = false;
  layoutType = 'vertical';  // This could be dynamic
  sidebarType = 'full';     // Can be 'mini-sidebar' or 'full'
  headerPosition = 'fixed'; // Can be dynamic based on your layout
  sidebarPosition = 'fixed'; // Fixed sidebar

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
