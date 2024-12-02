import {AfterViewInit, Component, Input} from '@angular/core';

import $ from 'jquery';

@Component({
  selector: 'ord-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isSidebarVisible: boolean = false;
  @Input() isXXLScreen: boolean = false;

  toggleSidebar() {}
}
