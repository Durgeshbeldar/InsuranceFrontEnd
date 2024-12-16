import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { KycComponent } from './kyc/kyc.component';
import { RouterModule } from '@angular/router';
import { MyDocumentsComponent } from './my-documents/my-documents.component';

@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerDashboardComponent,
    KycComponent,
    MyDocumentsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ]
})
export class CustomerModule { }
