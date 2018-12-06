import { BaseModel } from "src/app/shared/basemode/base-model.model";

export interface Diagnoses extends BaseModel {
  DiagnosisId :number;
  Description ?:string;
  Remark ?: string;
  //Relation
  PetHaveDiagnosisId?: number;
  //ViewModel
  RowIndex?: number;
}
