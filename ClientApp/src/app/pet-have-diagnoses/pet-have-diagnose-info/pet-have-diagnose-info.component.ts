import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseInfoComponent } from 'src/app/shared/baseclases/base-info-component';
import { PetHaveDiagnose, StatusPetHasDiagonsis } from '../shared/pet-have-diagnose.model';
import { PetHaveDiagnoseService } from '../shared/pet-have-diagnose.service';
import { PetHaveDiagnoseCommunicateService } from '../shared/pet-have-diagnose-communicate.service';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { DiagnosesService } from '../shared/diagnoses.service';
import { Diagnoses } from '../shared/diagnoses.model';
import * as moment from "moment";
import { typeField, inputType, ValidatorField } from 'src/app/shared/dynamic-form/field-config.model';
import { Validators } from '@angular/forms';
import { ShareService } from 'src/app/shared/share.service';
import { Pet } from 'src/app/pets/shared/pet.model';
import { TreatmentsService } from '../shared/treatments.service';
import { Treatments } from '../shared/treatments.model';
import { PetService } from 'src/app/pets/shared/pet.service';

@Component({
  selector: 'app-pet-have-diagnose-info',
  templateUrl: './pet-have-diagnose-info.component.html',
  styleUrls: ['./pet-have-diagnose-info.component.scss'],
  providers: [ShareService]
})
export class PetHaveDiagnoseInfoComponent
  extends BaseInfoComponent<PetHaveDiagnose, PetHaveDiagnoseService, PetHaveDiagnoseCommunicateService> {

  constructor(
    service: PetHaveDiagnoseService,
    serviceCom: PetHaveDiagnoseCommunicateService,
    private serviceShared: ShareService,
    private servicePet:PetService,
    private serviceDiagnoses: DiagnosesService,
    private serviceTreatment: TreatmentsService,
    private serviceDialogs: DialogsService,
    private viewCon: ViewContainerRef,
  ) { super(service, serviceCom) }

  // Parameters

  // Methods
  onGetDataByKey(InfoValue: PetHaveDiagnose): void {
    if (InfoValue && InfoValue.PetHaveDiagnosisId) {
      this.service.getOneKeyNumber(InfoValue)
        .subscribe(dbData => {
          this.InfoValue = dbData;
          this.isValid = true;

          if (this.InfoValue.PetHaveDiagnosisId) {
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
        }, error => console.error(error), () => this.buildForm());
    }
    else {
      this.InfoValue = {
        PetHaveDiagnosisId: 0,
        DiagnosisDate: moment().toDate(),
        Diagnoses: new Array,
        Treatments: new Array,
        StatusPetHasDiagonsis: StatusPetHasDiagonsis.Diagnosis,
        PetId: 0
      };


      if (InfoValue) {
        if (InfoValue.PetId) {
          this.InfoValue.PetId = InfoValue.PetId;
        }
      }

      if (this.InfoValue.PetId) {
        this.servicePet.getOneKeyNumber({ PetId:this.InfoValue.PetId })
          .subscribe(dbPet => {
            if (this.regConfig) {
              let temp = ["PetName", "CustomerName", "BreedName"]
              temp.forEach(item => {
                this.serviceShared.toChild(
                  {
                    name: item,
                    value: dbPet[item]
                  });
              });
            } else {
              this.InfoValue.CustomerName = dbPet.CustomerName || "";
              this.InfoValue.PetName = dbPet.PetName || "";
              this.InfoValue.BreedName = dbPet.BreedName || "";
            }
          });
      }

      this.buildForm();
    }
  }

  // Build Form
  buildForm(): void {

    this.regConfig = [
      // BasemodelRequireWorkpermit //
      {
        type: typeField.inputclick,
        label: "เจ้าของสัตว์เลี้ยง",
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
        label: "อุณหภูมิ",
        inputType: inputType.number,
        name: "Temperature",
        disabled: this.denySave,
        value: this.InfoValue.Temperature,
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
    // let ExcludeList = this.regConfig.map((item) => item.name);
  }

  // set communicate
  SetCommunicatetoParent(): void {
    if (this.isValid) {
      if (this.InfoValue.Diagnoses.length > 0 || this.InfoValue.Treatments.length > 0) {
        // debug here
        // console.log("communicateService");
        this.communicateService.toParent(this.InfoValue);
      }
    }
  }

  // submit dynamic form
  submitDynamicForm(InfoValue?: PetHaveDiagnose): void {
    if (InfoValue) {
      if (!this.denySave) {
        let template = InfoValue;
        // Template
        for (let key in template) {
          // console.log(key);
          this.InfoValue[key] = template[key];
        }
        this.isValid = true;
        //debug here
        // console.log(JSON.stringify(InfoValue));
        this.SetCommunicatetoParent();
      }
    }
  }

  // event from component
  FromComponents(): void {
    this.subscription2 = this.serviceShared.ToParent$.subscribe(data => {
      if (data.name.indexOf("PetName") !== -1 || data.name.indexOf("CustomerName") !== -1 ||
          data.name.indexOf("BreedName") !== -1) {
        this.serviceDialogs.dialogPetInfoAndTable(this.viewCon, {info:undefined,option:true,multi:false})
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

  // Precaution
  OnDiagnosesAction(Item: { data?: Diagnoses, option: number }): void {
    if (this.denySave) {
      return;
    }
    if (Item.option === 1 && !Item.data) {
      let rowIndex = (this.InfoValue.Diagnoses.length || 0) + 1;

      this.InfoValue.Diagnoses.push({
        DiagnosisId: 0,
        PetHaveDiagnosisId: this.InfoValue.PetHaveDiagnosisId,
        Description: "",
        Remark: "",
        RowIndex: rowIndex
      });
      this.InfoValue.Diagnoses = this.InfoValue.Diagnoses.slice();
      this.SetCommunicatetoParent();
    }
    else if (Item.option === 2) {
      const diagnose = this.InfoValue.Diagnoses.find(value => value.RowIndex == Item.data.RowIndex);
      if (diagnose) {
        diagnose.Description = Item.data.Description;
        diagnose.Remark = Item.data.Remark;
      }
      this.InfoValue.Diagnoses = this.InfoValue.Diagnoses.slice();
      this.SetCommunicatetoParent();
    }
    else if (Item.option === 0) {
      let indexItem = this.InfoValue.Diagnoses.indexOf(Item.data);
      this.InfoValue.Diagnoses.splice(indexItem, 1);
      this.InfoValue.Diagnoses = this.InfoValue.Diagnoses.slice();
      this.SetCommunicatetoParent();
    }
  }

  // Precaution
  OnTreatmentsAction(Item: { data?: Treatments, option: number }): void {
    if (this.denySave) {
      return;
    }
    let indexItem = -1;

    if (Item.option === 2) {
      if (Item.data) {
        indexItem = this.InfoValue.Treatments.indexOf(Item.data);
      }

      let rowIndex = (this.InfoValue.Treatments.length || 0) + 1;

      let infoTreatement: Treatments;
      // IF Edit data
      if (Item.data) {
        infoTreatement = Object.assign({}, Item.data);
      } else { // Else New data
        infoTreatement = {
          TreatmentId: 0,
          PetHaveDiagnosisId: this.InfoValue.PetHaveDiagnosisId,
          RowIndex: rowIndex
        };
      }

      this.serviceDialogs.dialogTreatmentInfo(this.viewCon, { info: infoTreatement, option: true, multi: false })
        .subscribe((info: Treatments) => {
          if (info) {
            // if 
            if (this.InfoValue.Treatments.find(item => item.RowIndex === info.RowIndex)) {
              if (indexItem > -1) {
                // remove item
                this.InfoValue.Treatments.splice(indexItem, 1);
              }
            }
            this.InfoValue.Treatments.push(Object.assign({}, info));
            this.InfoValue.Treatments = this.InfoValue.Treatments.slice();
            this.SetCommunicatetoParent();
          }
        });
    }
    else if (Item.option === 3) {
      const diagnose = this.InfoValue.Treatments.find(value => value.RowIndex == Item.data.RowIndex);
      if (diagnose) {
        diagnose.Volumes = Item.data.Volumes;
        diagnose.TreatmentRegimen = Item.data.TreatmentRegimen;
        diagnose.Uom = Item.data.Uom;
        diagnose.Description = Item.data.Description;
        diagnose.Remark = Item.data.Remark;
      }
      this.InfoValue.Treatments = this.InfoValue.Treatments.slice();
      this.SetCommunicatetoParent();
    }
    else if (Item.option === 0) {
      let indexItem = this.InfoValue.Treatments.indexOf(Item.data);
      this.InfoValue.Treatments.splice(indexItem, 1);
      this.InfoValue.Treatments = this.InfoValue.Treatments.slice();
      this.SetCommunicatetoParent();
    }
  }
}
