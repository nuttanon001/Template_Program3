import { Component, OnInit } from '@angular/core';
import { DiagnosesTableComponent } from 'src/app/pet-have-diagnoses/diagnoses-table/diagnoses-table.component';

@Component({
  selector: 'app-diagnoses-table-extend',
  templateUrl: '../../../pet-have-diagnoses/diagnoses-table/diagnoses-table.component.html',
  styleUrls: ['../../../pet-have-diagnoses/diagnoses-table/diagnoses-table.component.scss']
})
export class DiagnosesTableExtendComponent extends DiagnosesTableComponent {

  constructor() {
    super();
  }
}
