import { AppointmentStatus } from "src/app/appointments/shared/appointment.model";

export interface OptionSchedule {
  Filter?: string;
  Skip?: number;
  Take?: number;
  SDate?: Date;
  EDate?: Date;
  Status?: AppointmentStatus;
}
