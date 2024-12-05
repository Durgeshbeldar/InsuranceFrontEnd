import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerRegistrationComponent } from './auth/customer-registration/customer-registration.component';
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path:"admin-dashboard",
    component:AdminDashboardComponent
  },
  {
    path: "customer-dashboard",
    component:CustomerDashboardComponent
  },
  {
    path:"customer-registration",
    component:CustomerRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
