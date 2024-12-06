import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerRegistrationComponent } from './auth/customer-registration/customer-registration.component';
import { AddCustomerComponent } from './admin/add-customer/add-customer.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { AddAgentComponent } from './admin/add-agent/add-agent.component';
import { ManageLocationComponent } from './admin/manage-location/manage-location.component';

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
        component:AddCustomerComponent
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
      }
    ]
  },
  {
    path: "customer-dashboard",
    component:CustomerDashboardComponent,
  },
  {
    path:"customer-registration",
    component:CustomerRegistrationComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
