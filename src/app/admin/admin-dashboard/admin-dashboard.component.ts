import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isDashboard: boolean = true;
  isSidebarCollapsed = false; // State to track sidebar visibility

  constructor(private router: Router) {

  }

  ngOnInit(){
  this.setDashboard();
  }
  setDashboard(){
    this.router.events.subscribe((event :any) => {
      console.log('Router Event:', event);
      if (event instanceof NavigationEnd) {
        const currentPath = this.router.url;
        console.log("current path is:", currentPath);
        this.isDashboard = currentPath.includes('/admin-dashboard');
        console.log("isDashboard:", this.isDashboard);
      }
    });
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; // Toggle sidebar
  }


}
