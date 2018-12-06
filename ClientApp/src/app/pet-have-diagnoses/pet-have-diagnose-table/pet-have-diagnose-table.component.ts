import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseTableComponent, deepIndexOf } from 'src/app/shared/baseclases/base-table.component';
import { PetHaveDiagnose, MucousMembrane, StatusPetHasDiagonsis } from '../shared/pet-have-diagnose.model';
import { PetHaveDiagnoseService } from '../shared/pet-have-diagnose.service';
import * as moment from "moment";
import { FormControl } from '@angular/forms';
// Rxjs
import {
  map, startWith,
  switchMap, catchError,
} from "rxjs/operators";
import { of as observableOf, merge, Observable } from 'rxjs';
import { Scroll } from 'src/app/shared/basemode/scroll.model';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';

@Component({
  selector: 'app-pet-have-diagnose-table',
  templateUrl: './pet-have-diagnose-table.component.html',
  styleUrls: ['./pet-have-diagnose-table.component.scss']
})
export class PetHaveDiagnoseTableComponent
  extends BaseTableComponent<PetHaveDiagnose, PetHaveDiagnoseService> {

  constructor(
    service: PetHaveDiagnoseService,
    private serviceDialogs: DialogsService,
    private viewCon: ViewContainerRef
  ) {
    super(service);

    this.columns = [
      { columnName: "เจ้าของ", columnField: "CustomerName", cell: (row: PetHaveDiagnose) => row.CustomerName },
      { columnName: "สัตว์เลี้ยง", columnField: "PetName", cell: (row: PetHaveDiagnose) => row.PetName },
      { columnName: "ชนิด", columnField: "BreedName", cell: (row: PetHaveDiagnose) => row.BreedName },
      { columnName: "อาการ", columnField: "Description", cell: (row: PetHaveDiagnose) => row.Description },
      { columnName: "หมายเหตุ", columnField: "Remark", cell: (row: PetHaveDiagnose) => row.Remark },
      { columnName: "วันที่", columnField: "DiagnosisDate", cell: (row: PetHaveDiagnose) => moment(row.DiagnosisDate).format("DD-MM-YYYY") },
      { columnName: "น้ำหนัก", columnField: "Weight", cell: (row: PetHaveDiagnose) => row.Weight },
      { columnName: "สถานะ", columnField: "StatusPetHasDiagonsis", cell: (row: PetHaveDiagnose) => StatusPetHasDiagonsis[row.StatusPetHasDiagonsis]},
      // { columnName: "หายใจ", columnField: "BreathingRate", cell: (row: PetHaveDiagnose) => row.BreathingRate },
      // { columnName: "สีเหงือก", columnField: "MucousMembrane", cell: (row: PetHaveDiagnose) => MucousMembrane[row.MucousMembrane] },
      // { columnName: "เสียงหัวใจ", columnField: "HeartSound", cell: (row: PetHaveDiagnose) => row.HeartSound },
      // { columnName: "เสียงปอด", columnField: "LungSound", cell: (row: PetHaveDiagnose) => row.LungSound },
      // { columnName: "ระดับน้ำ", columnField: "Hydration", cell: (row: PetHaveDiagnose) => row.Hydration },
    ];
    this.displayedColumns = this.columns.map(x => x.columnField);
    //this.displayedColumns.splice(0, 0, "select");
    this.displayedColumns.splice(0, 0, "Command");
  }

  petControl: FormControl;

  ngOnInit(): void {
    this.petControl = new FormControl("");

    this.templateSelect = new Array;
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.searchBox.search.subscribe(() => this.paginator.pageIndex = 0);
    // select where
    if (this.OptionFilter) {
      this.searchBox.setInput = this.OptionFilter;
      this.searchBox.search2 = this.OptionFilter;
    }

    merge(this.sort.sortChange, this.paginator.page, this.searchBox.search, this.petControl.valueChanges)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          let scroll: Scroll = {
            Skip: this.paginator.pageIndex * this.paginator.pageSize,
            Take: this.paginator.pageSize || 10,
            Filter: this.searchBox.search2,
            SortField: this.sort.active,
            SortOrder: this.sort.direction === "desc" ? 1 : -1,
            WhereId: this.WhereId
          };
          return this.service.getAllWithScroll(scroll, this.isSubAction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.Scroll.TotalRow;
          return data.Data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          return observableOf([]);
        })
      ).subscribe(data => {
        this.dataSource.data = data;
        // Addtion
        if (this.templateSelect && this.templateSelect.length > 0) {
          this.dataSource.data.forEach(row => {
            if (this.isKeyIndex) {
              this.templateSelect.forEach(value => {
                if (value[this.isKeyIndex].toString() === row[this.isKeyIndex].toString()) {
                  this.selection.select(row)
                }
              });
            } else {
              if (deepIndexOf(this.templateSelect, row) !== -1) {
                this.selection.select(row)
              }
            }
          });
        }
      });

    // Selection
    this.selection = new SelectionModel<PetHaveDiagnose>(this.isMultiple, [], true);
    this.selection.onChange.subscribe(selected => {
      // Added
      if (selected.added && selected.added.length > 0) {
        if (this.isMultiple) {
          selected.added.forEach(item => {
            if (this.isKeyIndex) {
              this.templateSelect.push(Object.assign({}, item));
            } else {
              if (deepIndexOf(this.templateSelect, item) === -1) {
                this.templateSelect.push(Object.assign({}, item));
              }
            }
            this.selectedRow = item;
          });
          this.returnSelectesd.emit(this.templateSelect);
        } else {
          if (selected.added[0]) {
            this.selectedRow = selected.added[0];
            this.returnSelected.emit(selected.added[0]);
          }
        }
      }
      // Remove
      if (selected.removed && selected.removed.length > 0) {
        selected.removed.forEach(item => {
          if (this.isKeyIndex) {
            if (this.templateSelect && this.templateSelect.length > 0) {
              this.templateSelect.forEach((value, index) => {
                if (value[this.isKeyIndex].toString() === item[this.isKeyIndex].toString()) {
                  this.templateSelect.splice(index, 1);
                }
              });
            }
          } else {
            if (this.templateSelect && this.templateSelect.length > 0) {
              let index = deepIndexOf(this.templateSelect, item);
              // console.log("Remove", index);
              this.templateSelect.splice(index, 1);
            }
          }

          if (item === this.selectedRow) {
            this.selectedRow = undefined;
            this.returnSelected.emit(undefined);
          }
        });
      }
    });
  }

  petFormClick(): void {
    this.serviceDialogs.dialogPetInfoAndTable(this.viewCon, { info: undefined, multi: false, option: true })
      .subscribe(petInfo => {
        this.WhereId = petInfo ? petInfo.PetId : undefined;
        this.petControl.patchValue(petInfo ? petInfo.PetName : undefined);
      });
  }
}
