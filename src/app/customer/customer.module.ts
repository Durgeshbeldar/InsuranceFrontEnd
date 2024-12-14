import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class CustomerModule { }
