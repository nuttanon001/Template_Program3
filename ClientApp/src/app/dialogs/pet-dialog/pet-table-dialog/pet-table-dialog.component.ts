import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/baseclases/base-table.component';
import { Pet, PetSex } from 'src/app/pets/shared/pet.model';
import { PetService } from 'src/app/pets/shared/pet.service';
import * as moment from "moment";

@Component({
  selector: 'app-pet-table-dialog',
  templateUrl: './pet-table-dialog.component.html',
  styleUrls: ['./pet-table-dialog.component.scss'],
  providers: [PetService]
})
export class PetTableDialogComponent extends BaseTableComponent<Pet, PetService>{

  constructor(service: PetService) {
    super(service);

    this.columns = [
      { columnName: "PetName.", columnField: "PetName", cell: (row: Pet) => row.PetName },
      { columnName: "Sex.", columnField: "Sex", cell: (row: Pet) =>  PetSex[row.Sex] },
      { columnName: "Age.", columnField: "Age", cell: (row: Pet) => row.Age },
      { columnName: "BreedName.", columnField: "BreedName", cell: (row: Pet) => row.BreedName },
      { columnName: "CustomerName.", columnField: "CustomerName", cell: (row: Pet) => row.CustomerName },
      { columnName: "Date", columnField: "RegisterDate", cell: (row: Pet) => moment(row.RegisterDate).format("DD-MM-YYYY") },
    ];
    this.displayedColumns = this.columns.map(x => x.columnField);
    //this.displayedColumns.splice(0, 0, "select");
    this.displayedColumns.splice(0, 0, "Command");

    this.isKeyIndex = "CheckListId";
  }
}
