import { BaseModel } from "src/app/shared/basemode/base-model.model";

export interface Appointment extends BaseModel {
  AppointmentId: number;
  AppointmentDate?: Date;
  AppointmentTime?: string;
  AppointmentStatus ?: AppointmentStatus;
  Description ?: string;
  Remark ?:string;
  //FK
  // Pet
  PetId ?: number;
  //ViewModel
  PetName ?:string;
  CustomerName ?:string;
  Communicate ?:string;
}

export enum AppointmentStatus {
  Wait = 1,
  Complate,
  Cancel
}
