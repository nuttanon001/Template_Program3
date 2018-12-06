import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// 3rd party
import "hammerjs";
// Component
import { AppComponent } from './core/app/app.component';
import { NavMenuComponent } from './core/nav-menu/nav-menu.component';
import { HomeComponent } from './core/home/home.component';
import { CommonModule } from '@angular/common';
// Module
import { SharedModule } from './shared/shared.module';
import { DialogsModule } from './dialogs/dialog.module';
import { CustomMaterialModule } from './shared/customer-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentScheduleComponent } from './appointments/appointment-schedule/appointment-schedule.component';
// 3rd
import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AppointmentScheduleComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'schedule', component: AppointmentScheduleComponent },
      {
        path: 'customer',
        loadChildren: "./customers/customer.module#CustomerModule",
      },
      {
        path: 'diagnose',
        loadChildren: "./pet-have-diagnoses/pet-have-diagnose.module#PetHaveDiagnoseModule",
      },
      {
        path: 'medicine',
        loadChildren: "./medicines/medicine.module#MedicineModule",
      },
      {
        path: 'appointment',
        loadChildren: "./appointments/appointment.module#AppointmentModule"
      }
      //{ path: 'fetch-data', component: FetchDataComponent },
    ]),
     // Modules
    SharedModule,
    CustomMaterialModule,
    DialogsModule,
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
