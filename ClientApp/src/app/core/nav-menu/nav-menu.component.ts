import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(
    // unmark this if AuthService complete
    private router: Router
  ) { }
  // Parameter
  @ViewChild("mainMenu") mainMenu: MatMenuTrigger;
  @ViewChild("subMenu") subMenu: MatMenuTrigger;
  @ViewChild("subMenu2") subMenu2: MatMenuTrigger;
  @ViewChild("userMenu") userMenu: MatMenuTrigger;

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  // propertires
  // =============================================\\

  // on menu close
  // =============================================\\
  menuOnCloseMenu(except?: number): void {
    if (except) {
      //console.log("close",except);
      if (except === 1 && this.mainMenu) {
        this.mainMenu.closeMenu();
      } else if (except === 2 && this.subMenu) {
        this.subMenu.closeMenu();
      } else if (except === 3 && this.subMenu2) {
        this.subMenu2.closeMenu();
      } else if (except === 4 && this.userMenu) {
        this.userMenu.closeMenu();
      }
    }
  }

  // =============================================\\
  // on menu open
  // =============================================\\
  menuOnOpenMenu(include?: number): void {
    //console.log("Open",include);

    if (include) {
      if (include === 1 && this.mainMenu) {
        this.mainMenu.openMenu();
        this.closeOtherMenu(2);
        this.closeOtherMenu(3);
        this.closeOtherMenu(4);
      } else if (include === 2 && this.subMenu) {
        this.subMenu.openMenu();
        this.closeOtherMenu(1);
        this.closeOtherMenu(3);
        this.closeOtherMenu(4);
      } else if (include === 3 && this.subMenu2) {
        this.subMenu2.openMenu();
        this.closeOtherMenu(1);
        this.closeOtherMenu(2);
        this.closeOtherMenu(4);
      } else if (include === 4 && this.userMenu) {
        this.userMenu.openMenu();
        this.closeOtherMenu(1);
        this.closeOtherMenu(2);
        this.closeOtherMenu(3);
      }
    }
  }

  closeOtherMenu(isClose: number) {
    if (isClose === 1) {
      if (this.mainMenu) {
        this.mainMenu.closeMenu();
      }
    } else if (isClose === 2) {
      if (this.subMenu) {
        this.subMenu.closeMenu();
      }
    } else if (isClose === 3) {
      if (this.subMenu2) {
        this.subMenu2.closeMenu();
      }
    }
  }
}
