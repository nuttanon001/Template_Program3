import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../shared/customer-material.module';

import { MedicineRoutingModule } from './medicine-routing.module';
import { MedicineCenterComponent } from './medicine-center.component';
import { MedicineTableComponent } from './medicine-table/medicine-table.component';
import { MedicineMasterComponent } from './medicine-master/medicine-master.component';
import { MedicineInfoComponent } from './medicine-info/medicine-info.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    MedicineRoutingModule
  ],
  declarations: [
    MedicineCenterComponent,
    MedicineTableComponent,
    MedicineMasterComponent,
    MedicineInfoComponent]
})
export class MedicineModule { }
