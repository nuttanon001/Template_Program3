import { Component, OnInit } from '@angular/core';
import { BaseInfoComponent } from 'src/app/shared/baseclases/base-info-component';
import { Medicine } from '../shared/medicine.model';
import { MedicineService } from '../shared/medicine.service';
import { MedicineCommunicateService } from '../shared/medicine-communicate.service';
import { typeField, inputType, ValidatorField } from 'src/app/shared/dynamic-form/field-config.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-medicine-info',
  templateUrl: './medicine-info.component.html',
  styleUrls: ['./medicine-info.component.scss']
})
export class MedicineInfoComponent
  extends BaseInfoComponent<Medicine, MedicineService, MedicineCommunicateService> {

  constructor(
    service: MedicineService,
    serviceCom: MedicineCommunicateService,
  ) { super(service, serviceCom) }

  // Parameters

  // Methods
  onGetDataByKey(InfoValue: Medicine): void {
    if (InfoValue && InfoValue.MedicineId) {
      // if set copy
      this.isCopying = InfoValue.Copying;

      this.service.getOneKeyNumber(InfoValue)
        .subscribe(dbData => {
          this.InfoValue = dbData;
          this.isValid = true;
        }, error => console.error(error), () => {
          if (this.isCopying) {
            this.InfoValue.MedicineId = 0;
            this.InfoValue.CreateDate = undefined;
            this.InfoValue.ModifyDate = undefined;
          }
          this.buildForm();
        });
    }
    else {
      this.InfoValue = {
        MedicineId: 0,
      };
      this.buildForm();
    }
  }

  // Build Form
  buildForm(): void {

    this.regConfig = [
      // BasemodelRequireWorkpermit //
      {
        type: typeField.input,
        label: "ชื่อยา",
        inputType: inputType.text,
        name: "Name",
        disabled: this.denySave,
        value: this.InfoValue.Name,
        readonly: true,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          },
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(250),
            message: "ไม่เกิน 250 ตัวอักษร"
          }
        ]
      },
      {
        type: typeField.input,
        label: "กลุ่มยา",
        inputType: inputType.text,
        name: "MedicineClass",
        disabled: this.denySave,
        value: this.InfoValue.MedicineClass,
        readonly: true,
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
      // debug here
      // console.log("communicateService");
      this.communicateService.toParent(this.InfoValue);
    }
  }

  // submit dynamic form
  submitDynamicForm(InfoValue?: Medicine): void {
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
    //this.subscription2 = this.serviceShared.ToParent$.subscribe(data => {
    //  if (data.name.indexOf("PetName") !== -1 || data.name.indexOf("CustomerName") !== -1 ||
    //    data.name.indexOf("BreedName") !== -1) {
    //    this.serviceDialogs.dialogPetInfoAndTable(this.viewCon, { info: undefined, option: true, multi: false })
    //      .subscribe((pet: Pet) => {
    //        // console.log(pet);

    //        let temp = ["PetName", "CustomerName", "BreedName"]
    //        temp.forEach(item => {
    //          this.serviceShared.toChild(
    //            {
    //              name: item,
    //              value: pet[item]
    //            });
    //        });
    //        this.InfoValue.PetId = pet.PetId;
    //      });
    //  }
    //});
  }
}
