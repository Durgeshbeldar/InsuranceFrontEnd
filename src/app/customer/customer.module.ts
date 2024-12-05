import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';



@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
