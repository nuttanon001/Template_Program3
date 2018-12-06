import { Component, OnInit } from '@angular/core';
import { BaseInfoDialogComponent } from 'src/app/shared/baseclases/base-info-dialog-component';
import { Pet } from 'src/app/pets/shared/pet.model';
import { typeField, inputType, OptionField, ValidatorField } from 'src/app/shared/dynamic-form/field-config.model';
import { Validators } from '@angular/forms';
import { BreedService } from 'src/app/breeds/shared/breed.service';
import { Breed } from 'src/app/breeds/shared/breed.model';

@Component({
  selector: 'app-pet-info-dialog',
  templateUrl: './pet-info-dialog.component.html',
  styleUrls: ['./pet-info-dialog.component.scss']
})
export class PetInfoDialogComponent extends BaseInfoDialogComponent<Pet> {
  constructor(
    private serviceBreed:BreedService
  ) { super() }

  breeds?: OptionField[];

  ngOnInit(): void {
    if (this.InfoValue) {

      this.serviceBreed.getAll()
        .subscribe((result:Array<Breed>) => {
          if (result) {
            this.breeds = new Array;
            result.forEach(item => {
              this.breeds.push({
                label: item.Name,
                value: item.BreedId
              });
            });
          }
        }, () => { }, () => this.buildForm());

      if (this.InfoValue) {
        this.denySave = this.InfoValue.ReadOnly;
      }

      // this.buildForm();
    }
  }

  // Build Form
  buildForm(): void {
    this.regConfig = [
      // BasemodelRequireWorkpermit //
      {
        type: typeField.input,
        label: "ชื่อสัตว์เลี้ยง",
        inputType: inputType.text,
        name: "PetName",
        disabled: this.denySave,
        value: this.InfoValue.PetName,
        validations: [
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(250),
            message: "ไม่เกิน 250 ตัวอักษร"
          },
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          },
        ]
      },
      {
        type: typeField.select,
        label: "ชนิดสัตว์เลี้ยง",
        name: "BreedId",
        options : this.breeds,
        disabled: this.denySave,
        value: this.InfoValue.BreedId,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          }
        ]
      },
      {
        type: typeField.radiobutton,
        label: "เพศ",
        name: "Sex",
        options: [
          { label: "เพศผู้", value: 1 },
          { label: "เพศเมีย", value: 2 },
        ],
        disabled: this.denySave,
        value: this.InfoValue.Sex,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          },
        ]
      },
      {
        type: typeField.checkbox,
        label: "ทำหมัน",
        name: "Sterilization",
        disabled: this.denySave,
        value: this.InfoValue.Sterilization
      },
      {
        type: typeField.date,
        label: "เกิดวันที่",
        name: "BirthDate",
        disabled: this.denySave,
        value: this.InfoValue.BirthDate,
        validations: [
          {
            name: ValidatorField.required,
            validator: Validators.required,
            message: "ข้อมูลจำเป็นต้องระบุ"
          }
        ]
      },
      {
        type: typeField.date,
        label: "วันที่ลงทะเบียน",
        name: "RegisterDate",
        disabled: this.denySave,
        value: this.InfoValue.RegisterDate,
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
}
