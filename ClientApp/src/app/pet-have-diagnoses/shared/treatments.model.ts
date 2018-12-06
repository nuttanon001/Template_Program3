import { BaseModel } from "src/app/shared/basemode/base-model.model";

export interface Treatments extends BaseModel {
  TreatmentId :number;
  TreatmentRegimen ?:string;
  Description ?:string;
  Remark ?:string;
  Volumes?: number;
  TotalTime?: number;
  Uom ?:string;
  //Relation
  PetHaveDiagnosisId ?:number;
  MedicineId ?:number;
  // ViewModel
  MedicineName?: string;
  RowIndex?: number;
}
