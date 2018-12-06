import { Component, OnInit } from '@angular/core';
import { MedicineTableComponent } from 'src/app/medicines/medicine-table/medicine-table.component';
import { MedicineService } from 'src/app/medicines/shared/medicine.service';

@Component({
  selector: 'app-medicine-table-dialog',
  templateUrl: '../../../medicines/medicine-table/medicine-table.component.html',
  styleUrls: ['../../../medicines/medicine-table/medicine-table.component.scss']
})
export class MedicineTableDialogComponent extends MedicineTableComponent {

  constructor(
    service:MedicineService
  ) {
    super(service);
  }
}
