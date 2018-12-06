import { Component, OnInit } from '@angular/core';
import { BaseTableDetailComponent } from 'src/app/shared/baseclases/base-table-detail.component';
import { Treatments } from '../shared/treatments.model';

@Component({
  selector: 'app-treatment-table',
  templateUrl: './treatment-table.component.html',
  styleUrls: ['./treatment-table.component.scss']
})
export class TreatmentTableComponent extends BaseTableDetailComponent<Treatments>{

  constructor() {
    super();
    this.columns = [
      { columnName: "ชื่อยา", columnField: "MedicineName", cell: (row: Treatments) => row.MedicineName },
      { columnName: "ต่อครั้ง", columnField: "Volumes", cell: (row: Treatments) => row.Volumes ,width : 70},
      { columnName: "กี่ครั้ง", columnField: "TotalTime", cell: (row: Treatments) => row.TotalTime , width : 70},
      { columnName: "การใช้ยา", columnField: "TreatmentRegimen", cell: (row: Treatments) => row.TreatmentRegimen },
      { columnName: "รายละเอียด", columnField: "Description", cell: (row: Treatments) => row.Description },
      { columnName: "หน่วย", columnField: "Uom", cell: (row: Treatments) => row.Uom ,width:95},
    ];
    this.displayedColumns = this.columns.map(x => x.columnField);
    this.displayedColumns.splice(0, 0, "Command");
  }

  // on blur
  onBlurText(rowData?: Treatments): void {
    //Debug here
    if (rowData) {
      this.returnSelectedWith.emit({
        data: rowData,
        option: 3
      });
    }
  }
}
