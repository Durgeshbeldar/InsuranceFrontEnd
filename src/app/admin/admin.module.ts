import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminSidebarComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule
    
  ]
})
export class AdminModule { }
