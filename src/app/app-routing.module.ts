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
import { MyClaimsComponent } from './customer/my-claims/my-claims.component';
import { CustomerClaimsComponent } from './admin/customer-claims/customer-claims.component';
import { ManageAgentsComponent } from './admin/manage-agents/manage-agents.component';
import { ManageEmployeesComponent } from './admin/manage-employees/manage-employees.component';
import { AuthGuard } from './guards/auth.guard';
import { SoldPoliciesComponent } from './admin/sold-policies/sold-policies.component';
import { AllTransactionsComponent } from './admin/all-transactions/all-transactions.component';
import { SoldPoliciesAgentComponent } from './agent/sold-policies-agent/sold-policies-agent.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
    children: [

      {
        path: "add-employee",
        component: AddEmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path:"sold-policies",
        component: SoldPoliciesComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path: "add-agent",
        component: AddAgentComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path: 'manage-agents',
        component: ManageAgentsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path: 'manage-employees',
        component: ManageEmployeesComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path: 'withdraw-requests',
        component: WithdrawRequestsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path:'manage-transactions',
        component: AllTransactionsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path: "manage-location",
        component: ManageLocationComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path: 'manage-claims',
        component: CustomerClaimsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
      },
      {
        path: "manage-insurance",
        component: ManageInusrancePoliciesComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
        children: [
          {
            path: 'add-plan',
            component: AddInsurancePlanComponent,
            canActivate: [AuthGuard],
            data: { roles: ["Admin"] },
          },
          {
            path: 'update-plan',
            component: UpdatePlanComponent,
            canActivate: [AuthGuard],
            data: { roles: ["Admin"] },
          },
          {
            path: 'show-plans',
            component: ShowPlansComponent,
            canActivate: [AuthGuard],
            data: { roles: ["Admin"] },
          },
        ]
      },
      {
        path: "manage-schemes",
        component: ManageSchemesComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Admin"] },
        children: [
          {
            path: 'add-scheme',
            component: AddSchemeComponent,
            canActivate: [AuthGuard],
            data: { roles: ["Admin"] },
          },
          {
            path: 'update-scheme',
            component: UpdateSchemeComponent,
            canActivate: [AuthGuard],
            data: { roles: ["Admin"] },
          },
          {
            path: 'show-schemes',
            component: ShowSchemesComponent,
            canActivate: [AuthGuard],
            data: { roles: ["Admin"] },
          }
        ]
      }

    ]
  },
  {
    path: "customer-dashboard",
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Customer"] },
    children: [
      {
        path: "upload-kyc",
        component: KycComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Customer"] },
      },
      {
        path: "my-docs",
        component: MyDocumentsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Customer"] },
      },
      {
        path: "customer-transaction",
        component: CustomerTransactionComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Customer"] },
      },
      {
        path: "my-policies",
        component: MyPoliciesComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Customer"] },
      },
      {
        path: 'pay-premium',
        component: PayPremiumComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Customer"] },
      },
      {
        path: 'buy-policy',
        component: BuyPolicyComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Customer"] },
      },
      {
        path: 'support',
        component: SupportComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Customer"] },
      },
      {
        path: 'my-claims',
        component: MyClaimsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Customer"] },
      }
    ]
  },
  {
    path: "user-registration",
    component: CustomerRegistrationComponent
  },
  {
    path: "agent-registration",
    component: AgentRegistrationComponent
  },
  // Agent Module Paths 
  {
    path: "agent-dashboard",
    component: AgentDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Agent"] },

    children: [
      {
        path: "add-customerbyagent",
        component: AgentAddCustomerComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Agent"] },
      },
      {
        path: "manage-customers-policies",
        component: SoldPoliciesAgentComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Agent"] },
      },
      {
        path: 'show-customers',
        component: ShowCustomersComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Agent"] },
      },
      {
        path: 'sale-policy',
        component: SalePolicyComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Agent"] },
      },
      {
        path: 'manage-customer-installments',
        component: CustomerInstallmentComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Agent"] },
      },
      {
        path: 'show-balance',
        component: TotalCommissionComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Agent"] },
      },
      {
        path: 'agent-transaction',
        component: AgentTransactionComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Agent"] },
      },
      {
        path: 'mywithdraw-requests',
        component: MywithdrawRequestComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Agent"] },
      }
    ]
  },

  // Employee Module Paths
  {
    path: "employee-dashboard",
    component: EmployeeDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Employee"] },
    children: [
      {
        path: "applied-policies",
        component: AppliedPoliciesComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Employee"] },
      },
      {
        path: "verified-accounts",
        component: VerifiedAccountsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Employee"] },
      },
      {
        path: 'customer-list',
        component: CustomerListComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Employee"] },
      },
      {
        path: 'verified-customers',
        component: VerifiedCustomersComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Employee"] },
      },
      {
        path: 'customer-queries',
        component: CustomerQueriesComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Employee"] },
      },
      {
        path: 'closed-queries',
        component: ClosedQueriesComponent,
        canActivate: [AuthGuard],
        data: { roles: ["Employee"] },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
