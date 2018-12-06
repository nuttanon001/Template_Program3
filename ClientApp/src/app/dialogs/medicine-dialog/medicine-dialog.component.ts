import { Component, Inject } from '@angular/core';
import { BaseDialogEntryComponent } from 'src/app/shared/baseclases/base-dialog-entry.component';
import { Medicine } from 'src/app/medicines/shared/medicine.model';
import { MedicineService } from 'src/app/medicines/shared/medicine.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInfo } from 'src/app/shared/basemode/dialog-info.model';

@Component({
  selector: 'app-medicine-dialog',
  templateUrl: './medicine-dialog.component.html',
  styleUrls: ['./medicine-dialog.component.scss']
})
export class MedicineDialogComponent extends BaseDialogEntryComponent<Medicine,MedicineService> {

  constructor(
    service: MedicineService,
    public dialogRef: MatDialogRef<MedicineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInfo<Medicine>
  ) {
    super(
      service,
      dialogRef
    );
  }

  // on init
  onInit(): void {
    if (this.data) {
      this.fastSelectd = this.data.option;
      if (this.data.info) {
        if (!this.data.info.MedicineId) {
          this.InfoValue = Object.assign({}, this.data.info);
        } else {
          this.onEditInfo({
            data: this.data.info,
            option: 1
          });
        }
      }
    }
  }

}
