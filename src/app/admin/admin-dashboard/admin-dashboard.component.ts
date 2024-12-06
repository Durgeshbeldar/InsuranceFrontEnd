import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  isSidebarCollapsed = false; // State to track sidebar visibility

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; // Toggle sidebar
  }


}
