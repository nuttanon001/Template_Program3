import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentCenterComponent } from './appointment-center.component';
import { AppointmentMasterComponent } from './appointment-master/appointment-master.component';
import { AppointmentScheduleComponent } from './appointment-schedule/appointment-schedule.component';

const routes: Routes = [{
  path: "",
  component: AppointmentCenterComponent,
  children: [
    //{
    //  path: "schedule",
    //  component: AppointmentScheduleComponent,
    //},
    {
      path: ":key",
      component: AppointmentMasterComponent,
    },
    {
      path: "",
      component: AppointmentMasterComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
