import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AdminModule,
    HttpClientModule,
    CustomerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
