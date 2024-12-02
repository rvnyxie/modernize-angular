import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'ord-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarVisible: boolean = false;
  isXXLScreen: boolean = false;

  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
