import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInsurancePlanComponent } from './add-insurance-plan/add-insurance-plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageInusrancePoliciesComponent } from './manage-inusrance-policies/manage-inusrance-policies.component';
import { RouterModule } from '@angular/router';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { MatIconModule } from '@angular/material/icon';
import { ShowPlansComponent } from './show-plans/show-plans.component';

@NgModule({
  declarations: [
    AddInsurancePlanComponent,
    ManageInusrancePoliciesComponent,
    UpdatePlanComponent,
    ShowPlansComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule ,
    MatIconModule
  ],
  exports: [
    AddInsurancePlanComponent, 
    ManageInusrancePoliciesComponent,
    ShowPlansComponent
  ]
 
})
export class ManageInsuranceModule { }
