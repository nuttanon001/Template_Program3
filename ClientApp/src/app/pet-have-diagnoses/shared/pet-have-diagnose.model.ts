import { BaseModel } from "src/app/shared/basemode/base-model.model";
import { Diagnoses } from "./diagnoses.model";
import { Treatments } from "./treatments.model";

export interface PetHaveDiagnose extends BaseModel {
  PetHaveDiagnosisId: number;
  Description?: string;
  Remark?: string;
  DiagnosisDate?: Date;
  Weight?: number;
  BreathingRate?: number;
  HeartRate?: number;
  MucousMembrane?: MucousMembrane;
  HeartSound?: boolean;
  LungSound?: boolean;
  Hydration?: boolean;
  StatusPetHasDiagonsis?: StatusPetHasDiagonsis;
  Temperature?: number;
  // Relation
  PetId?: number;
  Diagnoses?: Array<Diagnoses>;
  Treatments?: Array<Treatments>;
  // ViewModel
  PetName?:string;
  CustomerName?: string;
  BreedName?: string;
}

export enum MucousMembrane {
  VeryDarkRedGums = 1,
  PinkAndMoistGums,
  WhiteOrPaleGums,
  BlueCyanosisGums,
  YellowJaundiceGums,
  Petechia,
}

export enum StatusPetHasDiagonsis {
  Diagnosis = 1,
  Treatment,
  Complete,
  Cancel,
  Pause
}
