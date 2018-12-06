import { Component, OnInit } from '@angular/core';
import { BaseTableDetailComponent } from 'src/app/shared/baseclases/base-table-detail.component';
import { Diagnoses } from '../shared/diagnoses.model';

@Component({
  selector: 'app-diagnoses-table',
  templateUrl: './diagnoses-table.component.html',
  styleUrls: ['./diagnoses-table.component.scss']
})
export class DiagnosesTableComponent extends BaseTableDetailComponent<Diagnoses>{

  constructor() {
    super();
    this.columns = [
      { columnName: "อาการป่วย", columnField: "Description", cell: (row: Diagnoses) => row.Description },
      { columnName: "อื่นๆ", columnField: "Remark", cell: (row: Diagnoses) => row.Remark },
    ];
    this.displayedColumns = this.columns.map(x => x.columnField);
    this.displayedColumns.splice(0, 0, "Command");
  }

  // on blur
  onBlurText(rowData?: Diagnoses): void {
    //Debug here
    if (rowData) {
      this.returnSelectedWith.emit({
        data: rowData,
        option: 2
      });
    }
  }

}
