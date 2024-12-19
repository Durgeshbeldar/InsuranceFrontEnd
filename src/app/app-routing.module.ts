import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerRegistrationComponent } from './auth/customer-registration/customer-registration.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { AddAgentComponent } from './admin/add-agent/add-agent.component';
import { ManageLocationComponent } from './admin/manage-location/manage-location.component';
import { AgentRegistrationComponent } from './auth/agent-registration/agent-registration.component';
import { ManageInusrancePoliciesComponent } from './admin/manage-insurance/manage-inusrance-policies/manage-inusrance-policies.component';
import { AddInsurancePlanComponent } from './admin/manage-insurance/add-insurance-plan/add-insurance-plan.component';
import { UpdatePlanComponent } from './admin/manage-insurance/update-plan/update-plan.component';
import { ShowPlansComponent } from './admin/manage-insurance/show-plans/show-plans.component';
import { ManageSchemesComponent } from './admin/manage-schemes/manage-schemes/manage-schemes.component';
import { AddSchemeComponent } from './admin/manage-schemes/add-scheme/add-scheme.component';
import { UpdateSchemeComponent } from './admin/manage-schemes/update-scheme/update-scheme.component';
import { AgentDashboardComponent } from './agent/agent-dashboard/agent-dashboard.component';
import { AddCustomerComponent as AgentAddCustomerComponent } from './agent/add-customer/add-customer.component';
import { ShowCustomersComponent } from './agent/show-customers/show-customers.component';
import { ShowSchemesComponent } from './admin/manage-schemes/show-schemes/show-schemes.component';
import { SalePolicyComponent } from './agent/sale-policy/sale-policy.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { AppliedPoliciesComponent } from './employee/applied-policies/applied-policies.component';
import { VerifiedAccountsComponent } from './employee/verified-accounts/verified-accounts.component';
import { CustomerListComponent } from './employee/customer-list/customer-list.component';
import { VerifiedCustomersComponent } from './employee/verified-customers/verified-customers.component';
import { CustomerInstallmentComponent } from './agent/customer-installment/customer-installment.component';
import { KycComponent } from './customer/kyc/kyc.component';
import { MyDocumentsComponent } from './customer/my-documents/my-documents.component';
import { TotalCommissionComponent } from './agent/total-commission/total-commission.component';
import { AgentTransactionComponent } from './agent/agent-transaction/agent-transaction.component';
import { CustomerTransactionComponent } from './customer/customer-transaction/customer-transaction.component';
import { WithdrawRequestsComponent } from './admin/withdraw-requests/withdraw-requests.component';
import { MyPoliciesComponent } from './customer/my-policies/my-policies.component';
import { PayPremiumComponent } from './customer/pay-premium/pay-premium.component';
import { BuyPolicyComponent } from './customer/buy-policy/buy-policy.component';
import { SupportComponent } from './customer/support/support.component';
import { CustomerQueriesComponent } from './employee/customer-queries/customer-queries.component';
import { ClosedQueriesComponent } from './employee/closed-queries/closed-queries.component';
import { MywithdrawRequestComponent } from './agent/mywithdraw-request/mywithdraw-request.component';
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path:"admin-dashboard",
    component:AdminDashboardComponent,
    children:[
      
      {
        path: "add-employee",
        component: AddEmployeeComponent
      },
      {
        path:"add-agent",
        component: AddAgentComponent
      },
      {
        path: 'withdraw-requests',
        component: WithdrawRequestsComponent
      },
      {
        path:"manage-location",
        component: ManageLocationComponent
      },
      {
        path: "manage-insurance",
        component:ManageInusrancePoliciesComponent,
        children:[
          {
            path : 'add-plan',
            component: AddInsurancePlanComponent
          },
          {
            path:'update-plan',
            component: UpdatePlanComponent
          },
          {
            path:'show-plans',
            component: ShowPlansComponent
          },
        ]
      },
      {
        path: "manage-schemes",
        component: ManageSchemesComponent,
        children:[
          {
            path: 'add-scheme',
            component: AddSchemeComponent
          },
          {
            path :'update-scheme',
            component: UpdateSchemeComponent
          },
          {
            path:'show-schemes',
            component: ShowSchemesComponent
          }
        ]
      }

    ]
  },
  {
    path: "customer-dashboard",
    component:CustomerDashboardComponent,
    children:[
      {
        path:"upload-kyc",
        component: KycComponent
      },
      {
        path: "my-docs",
        component: MyDocumentsComponent
      },
      {
        path:"customer-transaction",
        component: CustomerTransactionComponent
      },
      {
        path:"my-policies",
        component: MyPoliciesComponent
      },
      {
        path: 'pay-premium',
        component: PayPremiumComponent
      },
      {
        path: 'buy-policy',
        component: BuyPolicyComponent
      },
      {
        path: 'support',
        component: SupportComponent
      }
    ]
  },
  {
    path:"user-registration",
    component:CustomerRegistrationComponent
  },
  {
    path: "agent-registration",
    component: AgentRegistrationComponent
  },
   // Agent Module Paths 
  {
    path:"agent-dashboard",
    component : AgentDashboardComponent,
    children:[
      {
        path: "add-customerbyagent",
        component: AgentAddCustomerComponent
      },
      {
        path:'show-customers',
        component: ShowCustomersComponent
      },
      {
        path:'sale-policy',
        component: SalePolicyComponent
      },
      {
        path: 'manage-customer-installments',
        component : CustomerInstallmentComponent
      },
      {
        path: 'show-balance',
        component: TotalCommissionComponent
      },
      {
        path: 'agent-transaction',
        component: AgentTransactionComponent
      },
      {
        path: 'mywithdraw-requests',
        component: MywithdrawRequestComponent
      }
    ]
  },

  // Employee Module Paths
  {
    path: "employee-dashboard",
    component: EmployeeDashboardComponent,
    children:[
      {
        path: "applied-policies",
        component: AppliedPoliciesComponent
      },
      {
        path: "verified-accounts",
        component : VerifiedAccountsComponent
      },
      {
        path : 'customer-list',
        component: CustomerListComponent
      },
      {
        path: 'verified-customers',
        component: VerifiedCustomersComponent
      },
      {
        path: 'customer-queries',
        component: CustomerQueriesComponent
      },
      {
        path: 'closed-queries',
        component: ClosedQueriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
