import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  @Input() isSidebarCollapsed = false; // Input from parent to track sidebar state

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; // Toggle state
  }
}
