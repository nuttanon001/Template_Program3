import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialogEntryOnlyComponent } from 'src/app/shared/baseclases/base-dialog-entry-only.component';
import { PetHaveDiagnose } from 'src/app/pet-have-diagnoses/shared/pet-have-diagnose.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInfo } from 'src/app/shared/basemode/dialog-info.model';

@Component({
  selector: 'app-pet-have-diagnose-dialog',
  templateUrl: './pet-have-diagnose-dialog.component.html',
  styleUrls: ['./pet-have-diagnose-dialog.component.scss']
})
export class PetHaveDiagnoseDialogComponent extends BaseDialogEntryOnlyComponent<PetHaveDiagnose> {
  /** employee-dialog ctor */
  constructor(
    public dialogRef: MatDialogRef<PetHaveDiagnoseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInfo<PetHaveDiagnose>
  ) {
    super(dialogRef);
  }

  // on init
  onInit(): void {
    if (this.data) {
      if (this.data.info) {

        // debug here
        // console.log(this.data);

        if (this.data.info.PetHaveDiagnosisId) {
          this.InfoValue = Object.assign({}, this.data.info);
        }
      }
    }
  }
}

