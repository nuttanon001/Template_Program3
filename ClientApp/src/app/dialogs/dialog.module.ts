// angular core
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// services
import { DialogsService } from "./shared/dialogs.service";
// modules
import { CustomMaterialModule } from "../shared/customer-material.module";
import { SharedModule } from "../shared/shared.module";
// components
import { ErrorDialog } from "./error-dialog/error-dialog.component";
import { ContextDialog } from "./context-dialog/context-dialog.component";
import { ConfirmDialog } from "./confirm-dialog/confirm-dialog.component";
import { ConfirmMessageDialogComponent } from './confirm-message-dialog/confirm-message-dialog.component';
import { PetDialogComponent } from './pet-dialog/pet-dialog.component';
import { PetInfoDialogComponent } from './pet-dialog/pet-info-dialog/pet-info-dialog.component';
import { PetTableDialogComponent } from './pet-dialog/pet-table-dialog/pet-table-dialog.component';
import { TreatmentDialogComponent } from './treatment-dialog/treatment-dialog.component';
import { TreatmentInfoDialogComponent } from './treatment-dialog/treatment-info-dialog/treatment-info-dialog.component';
import { MedicineDialogComponent } from './medicine-dialog/medicine-dialog.component';
import { MedicineInfoDialogComponent } from './medicine-dialog/medicine-info-dialog/medicine-info-dialog.component';
import { MedicineTableDialogComponent } from './medicine-dialog/medicine-table-dialog/medicine-table-dialog.component';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { AppointmentInfoDialogComponent } from './appointment-dialog/appointment-info-dialog/appointment-info-dialog.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { CustomerTableDialogComponent } from './customer-dialog/customer-table-dialog/customer-table-dialog.component';
import { PetHaveDiagnoseDialogComponent } from './pet-have-diagnose-dialog/pet-have-diagnose-dialog.component';
import { PetHaveDiagnoseInfoDialogComponent } from './pet-have-diagnose-dialog/pet-have-diagnose-info-dialog/pet-have-diagnose-info-dialog.component';
import { DiagnosesTableExtendComponent } from './pet-have-diagnose-dialog/diagnoses-table-extend/diagnoses-table-extend.component';
import { TreatmentTableExtendComponent } from './pet-have-diagnose-dialog/treatment-table-extend/treatment-table-extend.component';

@NgModule({
  imports: [
    // angular
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // customer Module
    SharedModule,
    CustomMaterialModule,
  ],
  declarations: [
    ErrorDialog,
    ConfirmDialog,
    ContextDialog,
    ConfirmMessageDialogComponent,
    PetDialogComponent,
    PetInfoDialogComponent,
    PetTableDialogComponent,
    TreatmentDialogComponent,
    TreatmentInfoDialogComponent,
    MedicineDialogComponent,
    MedicineInfoDialogComponent,
    MedicineTableDialogComponent,
    AppointmentDialogComponent,
    AppointmentInfoDialogComponent,
    CustomerDialogComponent,
    CustomerTableDialogComponent,
    PetHaveDiagnoseDialogComponent,
    PetHaveDiagnoseInfoDialogComponent,
    DiagnosesTableExtendComponent,
    TreatmentTableExtendComponent,
  ],
  providers: [
    DialogsService,
  ],
  // a list of components that are not referenced in a reachable component template.
  // doc url is :https://angular.io/guide/ngmodule-faq
  entryComponents: [
    ErrorDialog,
    ConfirmDialog,
    ContextDialog,
    ConfirmMessageDialogComponent,
    PetDialogComponent,
    PetInfoDialogComponent,
    PetTableDialogComponent,
    TreatmentDialogComponent,
    TreatmentInfoDialogComponent,
    MedicineDialogComponent,
    MedicineInfoDialogComponent,
    MedicineTableDialogComponent,
    AppointmentDialogComponent,
    AppointmentInfoDialogComponent,
    CustomerDialogComponent,
    CustomerTableDialogComponent,
    PetHaveDiagnoseDialogComponent,
    PetHaveDiagnoseInfoDialogComponent,
  ],
})
export class DialogsModule { }
