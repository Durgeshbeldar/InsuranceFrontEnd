import { Component , Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  @Input() isSidebarCollapsed = false; // Input from parent to track sidebar state

  constructor(private router: Router) { } // Inject Router to navigate to login page
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; // Toggle state
  }
  logout() {
    // Step 1: Remove token and user data
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
  
    this.router.navigateByUrl("");
  }
}
