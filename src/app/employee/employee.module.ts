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
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CustomerQueriesComponent } from './customer-queries/customer-queries.component';
import { FormsModule } from '@angular/forms';
import { ClosedQueriesComponent } from './closed-queries/closed-queries.component';
@NgModule({
  declarations: [
    EmployeeHeaderComponent,
    EmployeeSidebarComponent,
    EmployeeDashboardComponent,
    AppliedPoliciesComponent,
    VerifiedAccountsComponent,
    CustomerListComponent,
    VerifiedCustomersComponent,
    CustomerQueriesComponent,
    ClosedQueriesComponent
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
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    FormsModule
  ]
})
export class EmployeeModule { }
