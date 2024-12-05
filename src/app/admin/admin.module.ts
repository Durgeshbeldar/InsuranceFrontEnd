import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';



@NgModule({
  declarations: [
    AdminSidebarComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
