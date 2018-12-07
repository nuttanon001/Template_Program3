import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { BaseInfoDialogComponent } from 'src/app/shared/baseclases/base-info-dialog-component';
import { PetHaveDiagnose } from 'src/app/pet-have-diagnoses/shared/pet-have-diagnose.model';
import { ShareService } from 'src/app/shared/share.service';
import { DialogsService } from '../../shared/dialogs.service';
import { Subscription } from 'rxjs';
import { PetHaveDiagnoseService } from 'src/app/pet-have-diagnoses/shared/pet-have-diagnose.service';
import { DiagnosesService } from 'src/app/pet-have-diagnoses/shared/diagnoses.service';
import { TreatmentsService } from 'src/app/pet-have-diagnoses/shared/treatments.service';
import { Diagnoses } from 'src/app/pet-have-diagnoses/shared/diagnoses.model';
import { Treatments } from 'src/app/pet-have-diagnoses/shared/treatments.model';
import { typeField, inputType, ValidatorField } from 'src/app/shared/dynamic-form/field-config.model';
import { Validators } from '@angular/forms';
import { Pet } from 'src/app/pets/shared/pet.model';

@Component({
  selector: 'app-pet-have-diagnose-info-dialog',
  templateUrl: './pet-have-diagnose-info-dialog.component.html',
  styleUrls: ['./pet-have-diagnose-info-dialog.component.scss'],
  providers: [ShareService, DialogsService]
})
export class PetHaveDiagnoseInfoDialogComponent extends BaseInfoDialogComponent<PetHaveDiagnose> implements OnDestroy {

  constructor(
    private serviceShared: ShareService,
    private serviceDialogs: DialogsService,
    private serviceDiagnoses: DiagnosesService,
    private serviceTreatment: TreatmentsService,
    private viewCon: ViewContainerRef
  ) { super() }
  // Parameters
  regimens: Array<string>;
  subscription2: Subscription;

  ngOnInit(): void {
    if (this.InfoValue) {
      if (this.InfoValue) {
        this.denySave = this.InfoValue.ReadOnly;
        this.isValid = this.InfoValue.PetHaveDiagnosisId && this.InfoValue.PetHaveDiagnosisId > 0;

        // new Array
        this.InfoValue.Diagnoses = new Array;
        this.InfoValue.Treatments = new Array;
        // get Array from database
        this.serviceDiagnoses.getByMasterId(this.InfoValue.PetHaveDiagnosisId)
          .subscribe(data => {
            // this.InfoValue.ActualDetails = data.slice();
            // $id
            if (data) {
              let RowIndex = 1;
              data.forEach(item => {
                let temp: Diagnoses = {
                  DiagnosisId: 0,
                  RowIndex: RowIndex
                };
                RowIndex += 1;
                for (let key in item) {
                  if (key.indexOf("$id") === -1) {
                    temp[key] = item[key];
                  }
                }

                this.InfoValue.Diagnoses.push(temp);
              });
              this.InfoValue.Diagnoses = this.InfoValue.Diagnoses.slice();
            }
          });

        this.serviceTreatment.getByMasterId(this.InfoValue.PetHaveDiagnosisId)
          .subscribe(data => {
            if (data) {
              let RowIndex2 = 1;
              data.forEach(item => {
                let temp2: Treatments = {
                  TreatmentId: 0,
                  RowIndex: RowIndex2
                };
                RowIndex2 += 1;
                for (let key in item) {
                  if (key.indexOf("$id") === -1) {
                    temp2[key] = item[key];
                  }
                }

                this.InfoValue.Treatments.push(temp2);
              });
              this.InfoValue.Treatments = this.InfoValue.Treatments.slice();
            }
          });
      }

      this.buildForm();
    }

    // subscription
    this.FromComponents();
  }

  // Build Form
  buildForm(): void {
    this.regConfig = [
      // BasemodelRequireWorkpermit //
      {
        type: typeField.inputclick,
        label: "เจ้าขอสัตว์เลี้ยง",
        inputType: inputType.text,
        name: "CustomerName",
        disabled: this.denySave,
        value: this.InfoValue.CustomerName,
        readonly: true,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          },
        ]
      },
      {
        type: typeField.inputclick,
        label: "ชื่อสัตว์เลี้ยง",
        inputType: inputType.text,
        name: "PetName",
        disabled: this.denySave,
        value: this.InfoValue.PetName,
        readonly: true,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          },
        ]
      },
      {
        type: typeField.inputclick,
        label: "ชนิดสัตว์เลี้ยง",
        inputType: inputType.text,
        name: "BreedName",
        disabled: this.denySave,
        value: this.InfoValue.BreedName,
        readonly: true,
      },
      {
        type: typeField.date,
        label: "วันที่เข้ารับการรรักษา",
        name: "DiagnosisDate",
        disabled: this.denySave,
        value: this.InfoValue.DiagnosisDate,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          }
        ]
      },
      {
        type: typeField.input,
        label: "น้ำหนัก",
        inputType: inputType.number,
        name: "Weight",
        disabled: this.denySave,
        value: this.InfoValue.Weight,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          }
        ]
      },
      {
        type: typeField.input,
        label: "อัตราการหายใจ",
        inputType: inputType.number,
        name: "BreathingRate",
        disabled: this.denySave,
        value: this.InfoValue.BreathingRate,
      },
      {
        type: typeField.input,
        label: "อัตราการเต้นหัวใจ",
        inputType: inputType.number,
        name: "HeartRate",
        disabled: this.denySave,
        value: this.InfoValue.HeartRate,
      },
      {
        type: typeField.radiobutton,
        label: "ลักษณะเหงือก",
        name: "MucousMembrane",
        options: [
          { label: "VeryDarkRedGums", value: 1 },
          { label: "PinkAndMoistGums", value: 2 },
          { label: "WhiteOrPaleGums", value: 3 },
          { label: "BlueCyanosisGums", value: 4 },
          { label: "YellowJaundiceGums", value: 5 },
          { label: "Petechia", value: 6 },
        ],
        disabled: this.denySave,
        value: this.InfoValue.MucousMembrane,
      },
      {
        type: typeField.checkbox,
        label: "เสียงหัวใจปรกติ",
        name: "HeartSound",
        disabled: this.denySave,
        value: this.InfoValue.HeartSound,
      },
      {
        type: typeField.checkbox,
        label: "เสียงปอดปรกติ",
        name: "LungSound",
        disabled: this.denySave,
        value: this.InfoValue.LungSound,
      },
      {
        type: typeField.checkbox,
        label: "สถานะการขาดน้ำปรกติ",
        name: "Hydration",
        disabled: this.denySave,
        value: this.InfoValue.Hydration,
      },
      {
        type: typeField.input,
        label: "รายละเอียด",
        inputType: inputType.text,
        name: "Description",
        disabled: this.denySave,
        value: this.InfoValue.Description,
        validations: [
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(250),
            message: "ไม่เกิน 250 ตัวอักษร"
          }
        ]
      },
      {
        type: typeField.input,
        label: "หมายเหตุอื่นๆ ",
        inputType: inputType.text,
        name: "Remark",
        disabled: this.denySave,
        value: this.InfoValue.Remark,
        validations: [
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(250),
            message: "ไม่เกิน 250 ตัวอักษร"
          }
        ]
      },
    ];
  }

  ngOnDestroy(): void {
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

  // event from component
  FromComponents(): void {
    this.subscription2 = this.serviceShared.ToParent$.subscribe(data => {
      if (data.name.indexOf("PetName") !== -1 || data.name.indexOf("CustomerName") !== -1 ||
        data.name.indexOf("BreedName") !== -1) {
        this.serviceDialogs.dialogPetInfoAndTable(this.viewCon, { info: undefined, option: true, multi: false })
          .subscribe((pet: Pet) => {
            // console.log(pet);

            let temp = ["PetName", "CustomerName", "BreedName"]
            temp.forEach(item => {
              this.serviceShared.toChild(
                {
                  name: item,
                  value: pet[item]
                });
            });
            this.InfoValue.PetId = pet.PetId;
          });
      }
    });
  }
}
