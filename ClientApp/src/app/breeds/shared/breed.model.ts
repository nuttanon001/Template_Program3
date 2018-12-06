import { BaseModel } from "src/app/shared/basemode/base-model.model";

export interface Breed extends BaseModel {
  BreedId?: number;
  Name?: string;
  Description?: string;
}
