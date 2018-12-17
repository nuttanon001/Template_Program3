import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialogEntryComponent } from 'src/app/shared/baseclases/base-dialog-entry.component';
import { Pet } from 'src/app/pets/shared/pet.model';
import { PetService } from 'src/app/pets/shared/pet.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInfo } from 'src/app/shared/basemode/dialog-info.model';

@Component({
  selector: 'app-pet-dialog',
  templateUrl: './pet-dialog.component.html',
  styleUrls: ['./pet-dialog.component.scss'],
  //providers: [PetService]
})
export class PetDialogComponent extends BaseDialogEntryComponent<Pet, PetService> {
  /** employee-dialog ctor */
  constructor(
    service: PetService,
    public dialogRef: MatDialogRef<PetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInfo<Pet>
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
        if (!this.data.info.PetId) {
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
