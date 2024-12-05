import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeMenu = 'Dashboard';
  constructor(private router: Router){}

  pathToRegistration(){
    this.router.navigateByUrl('customer-registration');
  }
  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }
}
