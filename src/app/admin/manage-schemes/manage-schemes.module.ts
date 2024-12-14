import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSchemesComponent } from './manage-schemes/manage-schemes.component';
import { AddSchemeComponent } from './add-scheme/add-scheme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateSchemeComponent } from './update-scheme/update-scheme.component';
import { MatIconModule } from '@angular/material/icon';
import { ShowSchemesComponent } from './show-schemes/show-schemes.component';
@NgModule({
  declarations: [
    ManageSchemesComponent,
    AddSchemeComponent,
    UpdateSchemeComponent,
    ShowSchemesComponent,

 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  exports:[
    ManageSchemesComponent,
    AddSchemeComponent,
  ]
})
export class ManageSchemesModule { }
