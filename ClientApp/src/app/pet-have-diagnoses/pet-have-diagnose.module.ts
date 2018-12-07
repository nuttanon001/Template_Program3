// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../shared/customer-material.module';
// Module
import { PetHaveDiagnoseRoutingModule } from './pet-have-diagnose-routing.module';

// Components
import { PetHaveDiagnoseMasterComponent } from './pet-have-diagnose-master/pet-have-diagnose-master.component';
import { PetHaveDiagnoseInfoComponent } from './pet-have-diagnose-info/pet-have-diagnose-info.component';
import { PetHaveDiagnoseTableComponent } from './pet-have-diagnose-table/pet-have-diagnose-table.component';
import { DiagnosesTableComponent } from './diagnoses-table/diagnoses-table.component';
import { PetHaveDiagnoseCenterComponent } from './pet-have-diagnose-center.component';
import { TreatmentTableComponent } from './treatment-table/treatment-table.component';
import { PetHaveDiagnoseHistoryComponent } from './pet-have-diagnose-history/pet-have-diagnose-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    PetHaveDiagnoseRoutingModule,
  ],
  declarations: [
    PetHaveDiagnoseCenterComponent,
    PetHaveDiagnoseMasterComponent,
    PetHaveDiagnoseInfoComponent,
    PetHaveDiagnoseTableComponent,
    DiagnosesTableComponent,
    TreatmentTableComponent,
    PetHaveDiagnoseHistoryComponent,
  ]
})
export class PetHaveDiagnoseModule { }
