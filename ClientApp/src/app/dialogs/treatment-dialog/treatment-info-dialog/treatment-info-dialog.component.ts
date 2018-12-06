import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { BaseInfoDialogComponent } from 'src/app/shared/baseclases/base-info-dialog-component';
import { Treatments } from 'src/app/pet-have-diagnoses/shared/treatments.model';
import { typeField, inputType, ValidatorField, OptionField } from 'src/app/shared/dynamic-form/field-config.model';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShareService } from 'src/app/shared/share.service';
import { DiagnosesService } from 'src/app/pet-have-diagnoses/shared/diagnoses.service';
import { DialogsService } from '../../shared/dialogs.service';
import { Medicine } from 'src/app/medicines/shared/medicine.model';

@Component({
  selector: 'app-treatment-info-dialog',
  templateUrl: './treatment-info-dialog.component.html',
  styleUrls: ['./treatment-info-dialog.component.scss'],
  providers: [ShareService,DiagnosesService]
})
export class TreatmentInfoDialogComponent extends BaseInfoDialogComponent<Treatments> implements OnDestroy  {

  constructor(
    private serviceShared: ShareService,
    private serviceDialogs: DialogsService,
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
      }

      this.regimens = [
        "เช้า",
        "กลางวัน",
        "เย็น",
        "เช้า-กลางวัน",
        "เช้า-กลางวัน-เย็น",
        "เช้า-เย็น",
        "กลางวัน-เย็น",
      ];

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
        label: "ชื่อยา",
        inputType: inputType.text,
        name: "MedicineName",
        disabled: this.denySave,
        readonly: true,
        value: this.InfoValue.MedicineName,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          },
        ]
      },
      {
        type: typeField.input,
        label: "ปริมาณต่อครั้ง",
        inputType: inputType.number,
        name: "Volumes",
        disabled: this.denySave,
        value: this.InfoValue.Volumes,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          },
        ]
      },
      {
        type: typeField.input,
        label: "ทั้งหมด",
        inputType: inputType.number,
        name: "TotalTime",
        disabled: this.denySave,
        value: this.InfoValue.TotalTime,
      },
      {
        type: typeField.select,
        label: "การใช้ยา",
        name: "TreatmentRegimen",
        options: this.regimens.map(item => ({ label: item, value: item })),
        disabled: this.denySave,
        value: this.InfoValue.TreatmentRegimen,
        validations: [
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(250),
            message: "ไม่เกิน 250 ตัวอักษร"
          },
        ]
      },
      {
        type: typeField.radiobutton,
        label: "หน่วย",
        name: "Uom",
        options: [
          { label: "โดส", value: "โดส" },
          { label: "ซีซี", value: "ซีซี" },
          { label: "เม็ด", value: "เม็ด" },
          { label: "ครั้ง", value: "ครั้ง" },
          { label: "หยด", value: "หยด" },
        ],
        disabled: this.denySave,
        value: this.InfoValue.Uom,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          },
        ]
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
          },
        ]
      },
      {
        type: typeField.input,
        label: "หมายเหตุ",
        inputType: inputType.text,
        name: "Remark",
        disabled: this.denySave,
        value: this.InfoValue.Remark,
        validations: [
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(250),
            message: "ไม่เกิน 250 ตัวอักษร"
          },
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
      if (data.name.indexOf("MedicineName") !== -1 ) {
        this.serviceDialogs.dialogMedicineTable(this.viewCon, { info: undefined, option: true, multi: false })
          .subscribe((medicine: Medicine) => {
            // console.log(pet);
            this.serviceShared.toChild(
              {
                name: data.name,
                value: medicine.Name
              });
            this.InfoValue.MedicineId = medicine.MedicineId;
          });
      }
    });
  }
}
