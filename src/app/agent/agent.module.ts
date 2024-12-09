import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AgentHeaderComponent } from './agent-header/agent-header.component';
import { AgentSidebarComponent } from './agent-sidebar/agent-sidebar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input'; // For Input Fields
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgentDashboardComponent,
    AgentHeaderComponent,
    AgentSidebarComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    AgentDashboardComponent,
    AgentHeaderComponent,
    AgentSidebarComponent
  ]
})
export class AgentModule { }
