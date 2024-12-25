import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { KycComponent } from './kyc/kyc.component';
import { RouterModule } from '@angular/router';
import { MyDocumentsComponent } from './my-documents/my-documents.component';
import { CustomerTransactionComponent } from './customer-transaction/customer-transaction.component';
import { MyPoliciesComponent } from './my-policies/my-policies.component';
import { PayPremiumComponent } from './pay-premium/pay-premium.component';
import { MatButtonModule } from '@angular/material/button';
import { BuyPolicyComponent } from './buy-policy/buy-policy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SupportComponent } from './support/support.component';
import { MyClaimsComponent } from './my-claims/my-claims.component';
@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerDashboardComponent,
    KycComponent,
    MyDocumentsComponent,
    CustomerTransactionComponent,
    MyPoliciesComponent,
    PayPremiumComponent,
    BuyPolicyComponent,
    SupportComponent,
    MyClaimsComponent,
    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
