import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/baseclases/base-table.component';
import { Medicine } from '../shared/medicine.model';
import { MedicineService } from '../shared/medicine.service';

@Component({
  selector: 'app-medicine-table',
  templateUrl: './medicine-table.component.html',
  styleUrls: ['./medicine-table.component.scss']
})
export class MedicineTableComponent extends BaseTableComponent<Medicine, MedicineService> {

  constructor(service: MedicineService) {
    super(service);

    this.columns = [
      { columnName: "ชื่อยา", columnField: "Name", cell: (row: Medicine) => row.Name },
      { columnName: "ประเภทยา", columnField: "MedicineClass", cell: (row: Medicine) => row.MedicineClass },
      { columnName: "คำอธิบาย", columnField: "Description", cell: (row: Medicine) => row.Description },
    ];
    this.displayedColumns = this.columns.map(x => x.columnField);
    //this.displayedColumns.splice(0, 0, "select");
    this.displayedColumns.splice(0, 0, "Command");
  }
}
