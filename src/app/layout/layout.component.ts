import { Component, HostListener, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'ord-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  isSidebarVisible: boolean = false;
  isXXLScreen: boolean = false;

  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  /**
   * Check screen size to update variables
   */
  private checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    this.isXXLScreen = screenWidth >= 1400;
    this.isSidebarVisible = this.isXXLScreen; // Auto hide sidebar for small screen
  }

  /**
   * Listen the screen resizing event
   */
  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScreenSize();
  }

  /**
   * Toggle sidebar
   */
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
