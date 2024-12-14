import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeSidebarComponent } from './employee-sidebar/employee-sidebar.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { AppliedPoliciesComponent } from './applied-policies/applied-policies.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VerifiedAccountsComponent } from './verified-accounts/verified-accounts.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { VerifiedCustomersComponent } from './verified-customers/verified-customers.component';
@NgModule({
  declarations: [
    EmployeeHeaderComponent,
    EmployeeSidebarComponent,
    EmployeeDashboardComponent,
    AppliedPoliciesComponent,
    VerifiedAccountsComponent,
    CustomerListComponent,
    VerifiedCustomersComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatSliderModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
  ]
})
export class EmployeeModule { }
