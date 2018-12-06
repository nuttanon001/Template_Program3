import { BaseModel } from "src/app/shared/basemode/base-model.model";

export interface Medicine extends BaseModel {
  MedicineId: number;
  MedicineClass?: string;
  Name?: string;
  Description?: string;
  Remark?: string;
}
