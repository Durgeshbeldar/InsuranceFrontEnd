import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent {


  constructor(private router : Router){}
  logout() {
    // Step 1: Remove token and user data
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
  
    this.router.navigateByUrl("");
  }

}
