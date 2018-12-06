import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialogEntryOnlyComponent } from 'src/app/shared/baseclases/base-dialog-entry-only.component';
import { Treatments } from 'src/app/pet-have-diagnoses/shared/treatments.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInfo } from 'src/app/shared/basemode/dialog-info.model';

@Component({
  selector: 'app-treatment-dialog',
  templateUrl: './treatment-dialog.component.html',
  styleUrls: ['./treatment-dialog.component.scss']
})
export class TreatmentDialogComponent extends BaseDialogEntryOnlyComponent<Treatments> {
  /** employee-dialog ctor */
  constructor(
    public dialogRef: MatDialogRef<TreatmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInfo<Treatments>
  ) {
    super(dialogRef);
  }

  // on init
  onInit(): void {
    if (this.data) {
      if (this.data.info) {

        // debug here
        // console.log(this.data);

        if (this.data.info) {
          this.InfoValue = Object.assign({}, this.data.info);
        } 
      }
    }
  }
}
