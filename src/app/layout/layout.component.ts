import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'ord-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
  isLoginPage: boolean = false;

  isSidebarVisible = false;
  isSidebarMini = false;
  layoutType = 'vertical';  // This could be dynamic
  sidebarType = 'full';     // Can be 'mini-sidebar' or 'full'
  headerPosition = 'fixed'; // Can be dynamic based on your layout
  sidebarPosition = 'fixed'; // Fixed sidebar

  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check if the current route is login
      this.isLoginPage = this.router.url.includes('/login');
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
