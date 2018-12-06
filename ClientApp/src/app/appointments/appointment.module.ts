import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentCenterComponent } from './appointment-center.component';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
import { AppointmentMasterComponent } from './appointment-master/appointment-master.component';
import { AppointmentInfoComponent } from './appointment-info/appointment-info.component';
import { AppointmentScheduleComponent } from './appointment-schedule/appointment-schedule.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../shared/customer-material.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    AppointmentRoutingModule,
  ],
  declarations: [
    AppointmentCenterComponent,
    AppointmentTableComponent,
    AppointmentMasterComponent,
    AppointmentInfoComponent,
    // AppointmentScheduleComponent
  ],
  exports: [
    //AppointmentScheduleComponent
  ]
})
export class AppointmentModule { }
