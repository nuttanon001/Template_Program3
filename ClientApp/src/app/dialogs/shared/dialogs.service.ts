// Angular Core
import { Injectable, ViewContainerRef } from "@angular/core";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
// rxjs
import { Observable } from "rxjs";
// module
// components
import { ErrorDialog } from "../error-dialog/error-dialog.component";
import { ConfirmDialog } from "../confirm-dialog/confirm-dialog.component";
import { ContextDialog } from "../context-dialog/context-dialog.component";
import { ConfirmMessageDialogComponent } from "../confirm-message-dialog/confirm-message-dialog.component";
import { Pet } from "src/app/pets/shared/pet.model";
import { PetDialogComponent } from "../pet-dialog/pet-dialog.component";
import { DialogInfo } from "src/app/shared/basemode/dialog-info.model";
import { Treatments } from "src/app/pet-have-diagnoses/shared/treatments.model";
import { TreatmentDialogComponent } from "../treatment-dialog/treatment-dialog.component";
import { Medicine } from "src/app/medicines/shared/medicine.model";
import { MedicineDialogComponent } from "../medicine-dialog/medicine-dialog.component";
import { Appointment } from "src/app/appointments/shared/appointment.model";
import { AppointmentDialogComponent } from "../appointment-dialog/appointment-dialog.component";
import { Customer } from "src/app/customers/shared/customer.model";
import { CustomerDialogComponent } from "../customer-dialog/customer-dialog.component";
import { PetHaveDiagnose } from "src/app/pet-have-diagnoses/shared/pet-have-diagnose.model";
import { PetHaveDiagnoseDialogComponent } from "../pet-have-diagnose-dialog/pet-have-diagnose-dialog.component";

@Injectable({
  providedIn:"root"
})

export class DialogsService {
  // width and height > width and height in scss master-dialog
  width: string = "80vh";
  height: string = "80vw";

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialog>;
    let config: MatDialogConfig = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ConfirmDialog, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public context(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MatDialogRef<ContextDialog>;
    let config: MatDialogConfig = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ContextDialog, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public error(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MatDialogRef<ErrorDialog>;
    let config: MatDialogConfig = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ErrorDialog, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public confirmMessage(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<{ result: boolean, message: string }> {

    let dialogRef: MatDialogRef<ConfirmMessageDialogComponent>;
    let config: MatDialogConfig = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(ConfirmMessageDialogComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

 /**
  * 
  * @param viewContainerRef
  * @param data = info: Pet and option: 
  */
  public dialogPetInfoAndTable(viewContainerRef: ViewContainerRef, data: DialogInfo<Pet>): Observable<Pet> {
    let dialogRef: MatDialogRef<PetDialogComponent>;
    let config: MatDialogConfig = new MatDialogConfig();

    // config
    config.viewContainerRef = viewContainerRef;
    config.data = data;
    config.hasBackdrop = true;

    // open dialog
    dialogRef = this.dialog.open(PetDialogComponent, config);
    return dialogRef.afterClosed();
  }

  /**
  * 
  * @param viewContainerRef
  * @param data = info: Treatment 
  */
  public dialogTreatmentInfo(viewContainerRef: ViewContainerRef, data: DialogInfo<Treatments>): Observable<Treatments> {
    let dialogRef: MatDialogRef<TreatmentDialogComponent>;
    let config: MatDialogConfig = new MatDialogConfig();

    // config
    config.viewContainerRef = viewContainerRef;
    config.data = data;
    config.hasBackdrop = true;

    // open dialog
    dialogRef = this.dialog.open(TreatmentDialogComponent, config);
    return dialogRef.afterClosed();
  }

  /**
  * 
  * @param viewContainerRef
  * @param data = info: Medicine  */
  public dialogMedicineTable(viewContainerRef: ViewContainerRef, data: DialogInfo<Medicine>): Observable<Medicine|Array<Medicine>> {
    let dialogRef: MatDialogRef<MedicineDialogComponent>;
    let config: MatDialogConfig = new MatDialogConfig();

    // config
    config.viewContainerRef = viewContainerRef;
    config.data = data;
    config.hasBackdrop = true;

    // open dialog
    dialogRef = this.dialog.open(MedicineDialogComponent, config);
    return dialogRef.afterClosed();
  }

  /**
  * @param viewContainerRef
  * @param data = info: Medicine
  */
  public dialogCustomerTable(viewContainerRef: ViewContainerRef, data: DialogInfo<Customer>): Observable<Customer | Array<Customer>> {
    let dialogRef: MatDialogRef<CustomerDialogComponent>;
    let config: MatDialogConfig = new MatDialogConfig();

    // config
    config.viewContainerRef = viewContainerRef;
    config.data = data;
    config.hasBackdrop = true;

    // open dialog
    dialogRef = this.dialog.open(CustomerDialogComponent, config);
    return dialogRef.afterClosed();
  }

  /**
  * @param viewContainerRef
  * @param data = info: Appointment 
  */
  public dialogAppointmentInfo(viewContainerRef: ViewContainerRef, data: DialogInfo<Appointment>): Observable<Appointment> {
    let dialogRef: MatDialogRef<AppointmentDialogComponent>;
    let config: MatDialogConfig = new MatDialogConfig();

    // config
    config.viewContainerRef = viewContainerRef;
    config.data = data;
    config.hasBackdrop = true;

    // open dialog
    dialogRef = this.dialog.open(AppointmentDialogComponent, config);
    return dialogRef.afterClosed();
  }

  /**
 * @param viewContainerRef
 * @param data = info: Appointment 
 */
  public dialogPetHaveDiagnosesInfo(viewContainerRef: ViewContainerRef, data: DialogInfo<PetHaveDiagnose>): Observable<PetHaveDiagnose> {
    let dialogRef: MatDialogRef<PetHaveDiagnoseDialogComponent>;
    let config: MatDialogConfig = new MatDialogConfig();

    // config
    config.viewContainerRef = viewContainerRef;
    config.data = data;
    config.hasBackdrop = true;

    // open dialog
    dialogRef = this.dialog.open(PetHaveDiagnoseDialogComponent, config);
    return dialogRef.afterClosed();
  }

}


