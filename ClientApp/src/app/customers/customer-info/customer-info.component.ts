import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseInfoComponent } from 'src/app/shared/baseclases/base-info-component';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { CustomerCommunicateService } from '../shared/customer-communicate.service';
import { PetService } from 'src/app/pets/shared/pet.service';
import { Pet } from 'src/app/pets/shared/pet.model';
import { typeField, inputType, ValidatorField } from 'src/app/shared/dynamic-form/field-config.model';
import { Validators } from '@angular/forms';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { BreedService } from 'src/app/breeds/shared/breed.service';
import { Breed } from 'src/app/breeds/shared/breed.model';
import * as moment from "moment";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent
  extends BaseInfoComponent<Customer, CustomerService, CustomerCommunicateService> {

  constructor(
    service: CustomerService,
    serviceCom: CustomerCommunicateService,
    private servicePet: PetService,
    private serviceBreed: BreedService,
    private serviceDialogs: DialogsService,
    private viewCon: ViewContainerRef,
    private router: Router,
    private route: ActivatedRoute,
  ) { super(service,serviceCom) }

  // Parameters
  breeds: Array<Breed>;

  // Methods
  onGetDataByKey(InfoValue: Customer): void {
    if (InfoValue && InfoValue.CustomerId)
    {
      // if set copy
      this.isCopying = InfoValue.Copying;

      this.service.getOneKeyNumber(InfoValue)
        .subscribe(dbData => {
          this.InfoValue = dbData;
          this.isValid = true;

          if (this.InfoValue.CustomerId) {
            // new Array
            this.InfoValue.Pets = new Array;
            // get array of data from database
            this.servicePet.getByMasterId(this.InfoValue.CustomerId)
              .subscribe(data => {
                // this.InfoValue.ActualDetails = data.slice();
                // $id
                if (data) {
                  data.forEach(item => {
                    let temp: Pet = {
                      PetId: 0
                    };
                    // loop deep clone without $id don't need it
                    for (let key in item) {
                      if (key.indexOf("$id") === -1) {
                        temp[key] = item[key];
                      }
                    }

                    // Set copying id is 0 , create and modify is undefined.
                    if (this.isCopying) {
                      temp.PetId = 0;
                      temp.RegisterDate = moment().toDate();
                      temp.CustomerId = 0;
                      temp.CreateDate = undefined;
                      temp.ModifyDate = undefined;
                    }

                    this.InfoValue.Pets.push(temp);
                  });
                  this.InfoValue.Pets = this.InfoValue.Pets.slice();
                }
              });
          }
        }, error => console.error(error), () => {
          if (this.isCopying) {
            this.InfoValue.CustomerId = 0;
            this.InfoValue.RegisterDate = moment().toDate();
            this.InfoValue.CreateDate = undefined;
            this.InfoValue.ModifyDate = undefined;
          }
          this.buildForm();
        });
    }
    else
    {
      this.InfoValue = {
        CustomerId: 0,
        RegisterDate: new Date,
        Pets: new Array,
      };
      this.buildForm();
    }

    this.serviceBreed.getAll()
      .subscribe((result:Array<Breed>) => {
        if (result) {
          this.breeds = new Array;
          this.breeds = result.slice();
        }
      });
  }

  // Build Form
  buildForm(): void {

    this.regConfig = [
      // BasemodelRequireWorkpermit //
      {
        type: typeField.input,
        label: "ชื่อ",
        inputType: inputType.text,
        name: "FirstName",
        disabled: this.denySave,
        value: this.InfoValue.FirstName,
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
        type: typeField.input,
        label: "นามสกุล",
        inputType: inputType.text,
        name: "LastName",
        disabled: this.denySave,
        value: this.InfoValue.LastName,
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
        type: typeField.radiobutton,
        label: "เพศ",
        name: "Sex",
        options: [
          { label: "เพศชาย", value: 1 },
          { label: "เพศหญิง", value: 2 }
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
        type: typeField.date,
        label: "เกิดวันที่",
        name: "BirthDate",
        disabled: true,
        value: this.InfoValue.BirthDate,
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
        label: "เบอร์ติดต่อ",
        inputType: inputType.text,
        name: "PhoneNo",
        disabled: this.denySave,
        value: this.InfoValue.PhoneNo,
        validations: [
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(20),
            message: "ไม่เกิน 20 ตัวอักษร"
          },
        ]
      },
      {
        type: typeField.input,
        label: "ไลน์ไอดี หรือ อีเมล์",
        inputType: inputType.text,
        name: "MailAddress",
        disabled: this.denySave,
        value: this.InfoValue.MailAddress,
        validations: [
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(150),
            message: "ไม่เกิน 150 ตัวอักษร"
          },
        ]
      },
      {
        type: typeField.input,
        label: "ที่อยู่ 1",
        inputType: inputType.text,
        name: "Address",
        disabled: this.denySave,
        value: this.InfoValue.Address,
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
        label: "ที่อยู่ 2",
        inputType: inputType.text,
        name: "Address2",
        disabled: this.denySave,
        value: this.InfoValue.Address2,
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
        label: "ข้อมูลพิ่มเติมอื่นๆ",
        inputType: inputType.text,
        name: "Infomation",
        disabled: this.denySave,
        value: this.InfoValue.Infomation,
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
    // let ExcludeList = this.regConfig.map((item) => item.name);
  }

  // set communicate
  SetCommunicatetoParent(): void {
    if (this.isValid) {
      if (this.InfoValue.Pets.length > 0) {
        // debug here
        // console.log("communicateService");
        this.communicateService.toParent(this.InfoValue);
      }
    }
  }

  // submit dynamic form
  submitDynamicForm(InfoValue?: Customer): void {
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
    //  if (data.name.indexOf("ProjectName") !== -1) {
    //    this.serviceDialogs.dialogSelectPlanMaster(this.viewContainer)
    //      .subscribe((planMaster: PlanMaster) => {
    //        this.serviceShared.toChild(
    //          {
    //            name: data.name,
    //            value: planMaster.ProjectName
    //          });
    //        this.InfoValue.ProjectCodeMasterId = planMaster.ProjectCodeMasterId;
    //        this.InfoValue.PlanMasterId = planMaster.PlanMasterId;
    //      });
    //  }
    //});
  }

  // Precaution
  OnPetAction(Item: { data?: Pet, option: number }): void {
    if (this.denySave) {
      return;
    }
    let indexItem = -1;

    if (Item) {
      if (Item.data) {
        indexItem = this.InfoValue.Pets.indexOf(Item.data);
      }

      if (Item.option === 2) // New or Edit
      {
        let infoPet: Pet;
        // IF Edit data
        if (Item.data) {
          infoPet = Object.assign({}, Item.data);
        } else { // Else New data
          infoPet = {
            PetId: 0,
            CustomerId: this.InfoValue.CustomerId,
            RegisterDate: moment().toDate(),
          };
        }

        this.serviceDialogs.dialogPetInfoAndTable(this.viewCon, { info: infoPet, option: true, multi: false })
          .subscribe((info: Pet) => {
            if (info) {
              // if 
              if (this.InfoValue.Pets.find(item => item.PetId === info.PetId)) {
                if (indexItem > -1) {
                  // remove item
                  this.InfoValue.Pets.splice(indexItem, 1);
                }
              }

              if (!info.BreedName) {
                info.BreedName = this.breeds.find(item => item.BreedId == info.BreedId).Name || "";
              }

              if (!info.Age) {
                info.Age = moment().diff(info.BirthDate, "years").toString();
              }

              this.InfoValue.Pets.push(Object.assign({}, info));
              this.InfoValue.Pets = this.InfoValue.Pets.slice();
              this.SetCommunicatetoParent();
            }
          });
      }
      else if (Item.option === 3) // To pet have diagnose
      {
        if (Item.data.PetId) {
          this.serviceDialogs.confirm("แจ้งเตือน", "คุณต้องการดำเนินการตรวจรักษาใช่หรือไม่ ? (ข้อมูลที่ยังไม่ได้รับการบันทึกจะหายทั้งหมด !!!)", this.viewCon)
            .subscribe(result => {
              if (result) {
                this.router.navigate(["diagnose/", Item.data.PetId]);
              }
            });
        } else {
          this.serviceDialogs.context("แจ้งเตือน", "โปรดดำเนินการบันทึกข้อมูลสัตว์เลี้ยงก่อนดำเนินตรวจรักษา !!!", this.viewCon)
            .subscribe();
        }
      }
      else if (Item.option === 4) // To pet have diagnose
      {
        if (Item.data.PetId) {
          this.serviceDialogs.confirm("แจ้งเตือน", "คุณต้องการดำเนินการตรวจรักษาใช่หรือไม่ ? (ข้อมูลที่ยังไม่ได้รับการบันทึกจะหายทั้งหมด !!!)", this.viewCon)
            .subscribe(result => {
              if (result) {
                this.router.navigate(["appointment/", Item.data.PetId]);
              }
            });
        } else {
          this.serviceDialogs.context("แจ้งเตือน", "โปรดดำเนินการบันทึกข้อมูลสัตว์เลี้ยงก่อนดำเนินตรวจรักษา !!!", this.viewCon)
            .subscribe();
        }
      }
      else if (Item.option === 0) // Remove
      {
        this.InfoValue.Pets.splice(indexItem, 1);
        this.InfoValue.Pets = this.InfoValue.Pets.slice();
        this.SetCommunicatetoParent();
      }
    }
  }
}
