import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialogEntryOnlyComponent } from 'src/app/shared/baseclases/base-dialog-entry-only.component';
import { Appointment } from 'src/app/appointments/shared/appointment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInfo } from 'src/app/shared/basemode/dialog-info.model';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent extends BaseDialogEntryOnlyComponent<Appointment> {
  /** employee-dialog ctor */
  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInfo<Appointment>
  ) {
    super(dialogRef);
  }

  // on init
  onInit(): void {
    if (this.data) {
      if (this.data.info) {

        // debug here
        // console.log(this.data);

        if (this.data.info.AppointmentId) {
          this.InfoValue = Object.assign({}, this.data.info);
        }
      }
    }
  }
}
