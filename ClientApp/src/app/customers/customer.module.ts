import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Modules
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomMaterialModule } from '../shared/customer-material.module';
import { CustomerCenterComponent } from './customer-center.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { PetTableComponent } from './pet-table/pet-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    CustomerRoutingModule
  ],
  declarations: [
    CustomerCenterComponent,
    CustomerMasterComponent,
    CustomerTableComponent,
    CustomerInfoComponent,
    PetTableComponent
  ],
})
export class CustomerModule { }
