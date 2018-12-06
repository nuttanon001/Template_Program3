import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { PetHaveDiagnoseCommunicateService } from '../shared/pet-have-diagnose-communicate.service';
import { BaseMasterComponent } from 'src/app/shared/baseclases/base-master-component';
import { PetHaveDiagnose } from '../shared/pet-have-diagnose.model';
import { PetHaveDiagnoseService } from '../shared/pet-have-diagnose.service';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { PetHaveDiagnoseTableComponent } from '../pet-have-diagnose-table/pet-have-diagnose-table.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pet-have-diagnose-master',
  templateUrl: './pet-have-diagnose-master.component.html',
  styleUrls: ['./pet-have-diagnose-master.component.scss'],
  providers: [PetHaveDiagnoseCommunicateService]
})
export class PetHaveDiagnoseMasterComponent
  extends BaseMasterComponent<PetHaveDiagnose, PetHaveDiagnoseService, PetHaveDiagnoseCommunicateService> {

  constructor(
    service: PetHaveDiagnoseService,
    serviceCom: PetHaveDiagnoseCommunicateService,
    serviceDialog: DialogsService,
    viewCon: ViewContainerRef,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    super(service, serviceCom, serviceDialog, viewCon);
  }

  backToSchedule: boolean = false;
  @ViewChild(PetHaveDiagnoseTableComponent)
  private tableComponent: PetHaveDiagnoseTableComponent;

  onReloadData(): void {
    this.tableComponent.reloadData();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.route.paramMap.subscribe((param: ParamMap) => {
      let key: number = Number(param.get("key") || 0);
      if (key) {
        let value: { data: PetHaveDiagnose, option: number } = {
          data: {
            PetHaveDiagnosisId: 0,
            PetId: key,
          },
          option: 1
        }
        this.backToSchedule = true;
        this.onDetailView(value);
      }
    }, error => console.error(error));
  }
}
