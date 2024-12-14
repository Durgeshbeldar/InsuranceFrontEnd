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
import { ShowCustomersComponent } from './show-customers/show-customers.component';
import { SalePolicyComponent } from './sale-policy/sale-policy.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [
    AgentDashboardComponent,
    AgentHeaderComponent,
    AgentSidebarComponent,
    AddCustomerComponent,
    ShowCustomersComponent,
    SalePolicyComponent
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
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule
  ],
  exports: [
    AgentDashboardComponent,
    AgentHeaderComponent,
    AgentSidebarComponent,
    ShowCustomersComponent
  ]
})
export class AgentModule { }
