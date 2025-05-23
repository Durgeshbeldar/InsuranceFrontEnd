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
import { CustomerInstallmentComponent } from './customer-installment/customer-installment.component';
import { TotalCommissionComponent } from './total-commission/total-commission.component';
import { AgentTransactionComponent } from './agent-transaction/agent-transaction.component';
import { MywithdrawRequestComponent } from './mywithdraw-request/mywithdraw-request.component';
import { SoldPoliciesAgentComponent } from './sold-policies-agent/sold-policies-agent.component';

@NgModule({
  declarations: [
    AgentDashboardComponent,
    AgentHeaderComponent,
    AgentSidebarComponent,
    AddCustomerComponent,
    ShowCustomersComponent,
    SalePolicyComponent,
    CustomerInstallmentComponent,
    TotalCommissionComponent,
    AgentTransactionComponent,
    MywithdrawRequestComponent,
    SoldPoliciesAgentComponent
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
