import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerRegistrationComponent } from './auth/customer-registration/customer-registration.component';
import { AddCustomerComponent  as AdminAddCustomerComponent} from './admin/add-customer/add-customer.component';
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
        path:"add-customer",
        component:AdminAddCustomerComponent
      },
      {
        path: "add-employee",
        component: AddEmployeeComponent
      },
      {
        path:"add-agent",
        component: AddAgentComponent
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
          }
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
