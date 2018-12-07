import { Component, OnInit } from '@angular/core';
import { CustomerTableComponent } from 'src/app/customers/customer-table/customer-table.component';
import { CustomerService } from 'src/app/customers/shared/customer.service';

@Component({
  selector: 'app-customer-table-dialog',
  templateUrl: '../../../customers/customer-table/customer-table.component.html',
  styleUrls: ['./customer-table-dialog.component.scss']
})
export class CustomerTableDialogComponent extends CustomerTableComponent {

  constructor(service:CustomerService) {
    super(service);
  }
}
