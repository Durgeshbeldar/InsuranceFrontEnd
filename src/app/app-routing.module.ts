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
        component: AdminAddCustomerComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
