import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/baseclases/base-table.component';
import { Appointment, AppointmentStatus } from '../shared/appointment.model';
import { AppointmentService } from '../shared/appointment.service';
import * as moment from "moment";

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss']
})
export class AppointmentTableComponent
  extends BaseTableComponent<Appointment, AppointmentService> {

  constructor(service: AppointmentService) {
    super(service);

    this.columns = [
      { columnName: "วันที่สร้าง", columnField: "CreateDate", cell: (row: Appointment) => moment(row.CreateDate).format("DD-MM-YYYY") },
      { columnName: "นัดหมาย", columnField: "AppointmentDate", cell: (row: Appointment) => moment(row.AppointmentDate).format("DD-MM-YYYY เวลา HH:mm") },
      { columnName: "สัตว์เลี้ยง", columnField: "PetName", cell: (row: Appointment) => row.PetName },
      { columnName: "ชื่อเจ้าของ", columnField: "CustomerName", cell: (row: Appointment) => row.CustomerName },
      { columnName: "ช่องการติดต่อ", columnField: "Communicate", cell: (row: Appointment) => row.Communicate },
      { columnName: "สถานะ", columnField: "AppointmentStatus", cell: (row: Appointment) => AppointmentStatus[row.AppointmentStatus] },
    ];
    this.displayedColumns = this.columns.map(x => x.columnField);
    //this.displayedColumns.splice(0, 0, "select");
    this.displayedColumns.splice(0, 0, "Command");
  }
}
