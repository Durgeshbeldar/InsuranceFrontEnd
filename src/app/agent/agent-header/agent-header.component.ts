import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-header',
  templateUrl: './agent-header.component.html',
  styleUrls: ['./agent-header.component.css']
})
export class AgentHeaderComponent {
  constructor(private router : Router){}
  logout() {
    // Step 1: Remove token and user data
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
  
    this.router.navigateByUrl("");
  }
}
