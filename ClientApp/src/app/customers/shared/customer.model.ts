import { BaseModel } from "src/app/shared/basemode/base-model.model";
import { Pet } from "src/app/pets/shared/pet.model";

export interface Customer extends BaseModel {
  CustomerId: number;
  FirstName?: string;
  LastName?: string;
  Image?: string;
  Sex?: Sex;
  Address?: string;
  Address2?: string;
  Infomation?: string;
  BirthDate?: Date;
  RegisterDate?: Date;
  PhoneNo?: string;
  MailAddress?: string;
  Remark?: string;
  Pets?: Array<Pet>;
  // ViewModel
  Age?: string;
  FullName?: string;
  SexString?: string;
}

export enum Sex {
  ชาย = 1,
  หญิง
}
