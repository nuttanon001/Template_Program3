import { Component, OnInit } from '@angular/core';
import { TreatmentTableComponent } from 'src/app/pet-have-diagnoses/treatment-table/treatment-table.component';

@Component({
  selector: 'app-treatment-table-extend',
  templateUrl: '../../../pet-have-diagnoses/treatment-table/treatment-table.component.html',
  styleUrls: ['../../../pet-have-diagnoses/treatment-table/treatment-table.component.scss']
})

export class TreatmentTableExtendComponent extends TreatmentTableComponent {
  constructor() { super() }
}
