import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { MatIconModule } from '@angular/material/icon';
import { CardsComponent } from './cards/cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input'; // For Input Fields
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { ManageLocationComponent } from './manage-location/manage-location.component';
import { ManageInsuranceModule } from './manage-insurance/manage-insurance.module';
import { WithdrawRequestsComponent } from './withdraw-requests/withdraw-requests.component';


@NgModule({
  declarations: [
    AdminSidebarComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    CardsComponent,
    AddEmployeeComponent,
    AddAgentComponent,
    ManageLocationComponent,
    WithdrawRequestsComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterModule,
    ManageInsuranceModule,
    
  ]
})
export class AdminModule { }
