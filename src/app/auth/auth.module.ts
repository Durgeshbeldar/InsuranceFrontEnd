import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomCaptchaComponent } from './custom-captcha/custom-captcha.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { RouterModule } from '@angular/router';
import { AgentRegistrationComponent } from './agent-registration/agent-registration.component';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    CustomCaptchaComponent,
    CustomerRegistrationComponent,
    AgentRegistrationComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ]
})
export class AuthModule {
 }
