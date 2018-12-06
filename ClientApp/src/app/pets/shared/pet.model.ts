import { BaseModel } from "src/app/shared/basemode/base-model.model";

export interface Pet extends BaseModel {
  PetId :number;
  PetName ?: string;
  Image ?:string;
  Sex ?: PetSex;
  Sterilization ?: boolean;
  Remark ?:string;
  BirthDate ?:Date;
  RegisterDate ?: Date;
  // Relation
  CustomerId ?:number;
  BreedId ?: number;
  // ViewModel
  Age ?:string;
  BreedName ?:string;
  CustomerName ?:string;
}

export enum PetSex {
  เพศผู้ = 1,
  เพศเมีย,
  MaleSterile,
  FemaleSterile
}
