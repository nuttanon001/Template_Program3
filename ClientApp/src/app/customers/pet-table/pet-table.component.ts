import { Component, OnInit } from '@angular/core';
import { BaseTableDetailComponent } from 'src/app/shared/baseclases/base-table-detail.component';
import { Pet, PetSex } from 'src/app/pets/shared/pet.model';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.scss']
})
export class PetTableComponent extends BaseTableDetailComponent<Pet>{
  constructor() {
    super();
    this.columns = [
      { columnName: "ชื่อสัตว์เลี้ยง", columnField: "PetName", cell: (row: Pet) => row.PetName },
      { columnName: "ประเภท", columnField: "BreedName", cell: (row: Pet) => row.BreedName },
      { columnName: "อายุ", columnField: "Age", cell: (row: Pet) => row.Age },
      { columnName: "เพศ", columnField: "Sex", cell: (row: Pet) => PetSex[row.Sex]},
    ];
    this.displayedColumns = this.columns.map(x => x.columnField);
    this.displayedColumns.splice(0, 0, "Command");
  }
}
