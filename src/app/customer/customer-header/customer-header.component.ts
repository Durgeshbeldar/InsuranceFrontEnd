import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent {
  constructor(private router: Router) {}
  logout() {
    // Step 1: Remove token and user data
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
  
    this.router.navigateByUrl("");
  }
}
