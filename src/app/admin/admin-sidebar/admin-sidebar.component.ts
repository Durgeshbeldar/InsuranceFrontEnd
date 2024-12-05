import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  activeMenu = 'Dashboard';

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }
}
