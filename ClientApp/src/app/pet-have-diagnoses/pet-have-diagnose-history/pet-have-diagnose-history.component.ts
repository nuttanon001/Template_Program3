import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PetHaveDiagnoseService } from '../shared/pet-have-diagnose.service';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { History } from '../shared/history.model';
import { PetHaveDiagnose, StatusPetHasDiagonsis, MucousMembrane } from '../shared/pet-have-diagnose.model';
import { LazyLoadEvent } from 'primeng/primeng';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Customer } from 'src/app/customers/shared/customer.model';
import { ResueaColumn } from 'src/app/shared/basemode/resuea-column.model';
import * as moment from "moment";

@Component({
  selector: 'app-pet-have-diagnose-history',
  templateUrl: './pet-have-diagnose-history.component.html',
  styleUrls: ['./pet-have-diagnose-history.component.scss']
})
export class PetHaveDiagnoseHistoryComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: PetHaveDiagnoseService,
    private serviceDialog: DialogsService,
    private viewCon: ViewContainerRef
  ) {
    // 100 for bar | 200 for titil and filter
    this.mobHeight = (window.screen.height - 290) + "px";
  }
  // Parameter
  historyForm: FormGroup;
  history: History;
  timeout: any;
  totalRow: number;
  first: number = 0;
  datasource: Array<PetHaveDiagnose>;
  mobHeight: any;
  columns: Array<ResueaColumn<PetHaveDiagnose>>;

  ngOnInit() {
    if (!this.history) {
      this.history = {
        Skip: 0,
        Take: 50
      };
    }

    this.columns = [
      { columnName: "เจ้าของ", columnField: "CustomerName", cell: (row: PetHaveDiagnose) => row.CustomerName },
      { columnName: "สัตว์เลี้ยง", columnField: "PetName", cell: (row: PetHaveDiagnose) => row.PetName },
      { columnName: "ชนิด", columnField: "BreedName", cell: (row: PetHaveDiagnose) => row.BreedName },
      { columnName: "อาการ", columnField: "Description", cell: (row: PetHaveDiagnose) => row.Description },
      { columnName: "หมายเหตุ", columnField: "Remark", cell: (row: PetHaveDiagnose) => row.Remark },
      { columnName: "วันที่", columnField: "DiagnosisDate", cell: (row: PetHaveDiagnose) => moment(row.DiagnosisDate).format("DD-MM-YYYY") },
      { columnName: "น้ำหนัก", columnField: "Weight", cell: (row: PetHaveDiagnose) => row.Weight },
      { columnName: "หายใจ", columnField: "BreathingRate", cell: (row: PetHaveDiagnose) => row.BreathingRate },
      { columnName: "สีเหงือก", columnField: "MucousMembrane", cell: (row: PetHaveDiagnose) => MucousMembrane[row.MucousMembrane] },
      { columnName: "เสียงหัวใจ", columnField: "HeartSound", cell: (row: PetHaveDiagnose) => row.HeartSound ? "ปกติ" : "ไม่ปกติ"},
      { columnName: "เสียงปอด", columnField: "LungSound", cell: (row: PetHaveDiagnose) => row.LungSound ? "ปกติ" : "ไม่ปกติ" },
      { columnName: "ระดับน้ำ", columnField: "Hydration", cell: (row: PetHaveDiagnose) => row.Hydration ? "ปกติ" : "ไม่ปกติ" },
      { columnName: "สถานะ", columnField: "StatusPetHasDiagonsis", cell: (row: PetHaveDiagnose) => StatusPetHasDiagonsis[row.StatusPetHasDiagonsis] },
    ];

    this.buildForm();
  }

  buildForm(): void {
    this.historyForm = this.fb.group({
      CustomerId: [this.history.CustomerId],
      CustomerName: "",
      EDate: [this.history.EDate],
      PetId: [this.history.PetId],
      PetName: "",
      SDate: [this.history.SDate],
      Skip: [this.history.Skip],
      SortField: [this.history.SortField],
      SortOrder: [this.history.SortOrder],
      Take: [this.history.Take],
      TotalRow: [this.history.TotalRow],
    });

    this.historyForm.valueChanges.pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((data: any) => this.onValueChanged(data));
  }

  // on value change
  onValueChanged(data?: any): void {
    if (!this.historyForm) { return; }
    this.history = this.historyForm.getRawValue() as History;
    //if (this.needReset) {
    //  this.scroll.Skip = 0;
    //  this.first = 0;
    //}
    // this.loading = true;
    this.onGetData(this.history);
  }

  // on get data
  onGetData(history: History): void {
    this.service.getHistoryDiagnose(history)
      .subscribe(dbData => {
        if (dbData && dbData.TotalRow) {
          this.totalRow = dbData.TotalRow;

          this.datasource = new Array;
          this.datasource = dbData.Data.slice();

          // console.log(JSON.stringify(this.datasource));
        } else {
          this.totalRow = 0;
          this.first = 0;
          this.datasource = new Array;
        }
      });
  }

  // on load lazy
  loadLazy(event: LazyLoadEvent) {
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page

    //imitate db connection over a network
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.first = event.first;

    this.historyForm.patchValue({
      Skip: event.first,
      Take: (event.rows || 50),
    });

    //this.timeout = setTimeout(() => {
    //  this.lazyCars = [];
    //  if (this.cars) {
    //    this.lazyCars = this.cars.slice(event.first, (event.first + event.rows));
    //  }
    //}, 1000);
  }

  // on dialog
  openDialog(type: string): void {
    if (type.indexOf("PetName") !== -1) {
      this.serviceDialog.dialogPetInfoAndTable(this.viewCon, { info: undefined, multi: false, option: true })
        .subscribe(petResult => {
          this.historyForm.patchValue({
            PetName: petResult ? petResult.PetName : "",
            PetId:petResult ? petResult.PetId : undefined
          });
        });
    }
    else if (type.indexOf("CustomerName") !== -1) {
      this.serviceDialog.dialogCustomerTable(this.viewCon, { info: undefined, multi: false, option: true })
        .subscribe((customerResult:Customer) => {
          this.historyForm.patchValue({
            CustomerName: customerResult ? customerResult.FullName : "",
            CustomerId: customerResult ? customerResult.CustomerId : undefined
          });
        });
    }
  }

  onShowPetHaveDiagnose(row?:PetHaveDiagnose): void {
    if (row) {
      this.serviceDialog.dialogPetHaveDiagnosesInfo(this.viewCon, { info: row, multi: false, option: false })
        .subscribe(result => {

        });
    }
  }

  // reset
  resetFilter(): void {
    this.datasource = new Array;
    this.first = 0;
    this.history = {
      Skip: 0,
      Take : 50
    };
    // this.loading = true;
    this.buildForm();
    this.onGetData(this.history);
  }
}
