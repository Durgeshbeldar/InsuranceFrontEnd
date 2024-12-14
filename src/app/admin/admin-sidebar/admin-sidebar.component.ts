import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  activeMenu = 'Dashboard';
 constructor(private router: Router){}

//  navigateToAddCustomer(){
//   this.router.navigateByUrl("add-customer");
//  }
  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }
  logout() {
    // Step 1: Remove token and user data
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    
    // Step 2: Navigate to Login Page
    this.router.navigateByUrl("");
  }
}
