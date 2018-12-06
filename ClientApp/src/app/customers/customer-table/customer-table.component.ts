import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/baseclases/base-table.component';
import { Customer, Sex } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import * as moment from "moment";

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent
  extends BaseTableComponent<Customer, CustomerService> {

  constructor(service: CustomerService) {
    super(service);

    this.columns = [
      { columnName: "ชื่อ", columnField: "FullName", cell: (row: Customer) => row.FullName },
      { columnName: "อายุ", columnField: "Age", cell: (row: Customer) => row.Age },
      { columnName: "เบอร์", columnField: "PhoneNo", cell: (row: Customer) => row.PhoneNo },
      { columnName: "วันที่ลงทะเบียน", columnField: "RegisterDate", cell: (row: Customer) => moment(row.RegisterDate).format("DD-MM-YYYY") },
      { columnName: "เพศ", columnField: "Sex",cell: (row: Customer) => Sex[row.Sex] },
    ];
    this.displayedColumns = this.columns.map(x => x.columnField);
    //this.displayedColumns.splice(0, 0, "select");
    this.displayedColumns.splice(0, 0, "Command");
  }
}
