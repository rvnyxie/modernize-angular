import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import $ from 'jquery';

@Component({
  selector: 'ord-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isSidebarVisible: boolean = false;
  @Input() isXXLScreen: boolean = false;

  @Output() toggleSidebar = new EventEmitter<any>();

  /**
   * Sidebar toggle event handler
   */
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleSubmenu(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    const parent = target.parentElement;
    if (parent?.classList.contains('open')) {
      parent.classList.remove('open');
    } else {
      parent?.classList.add('open');
    }
  }
}
