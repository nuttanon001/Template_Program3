import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseInfoComponent } from 'src/app/shared/baseclases/base-info-component';
import { Appointment, AppointmentStatus } from '../shared/appointment.model';
import { AppointmentService } from '../shared/appointment.service';
import { AppointmentCommunicateService } from '../shared/appointment-communicate.service';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { typeField, inputType, ValidatorField, FieldConfig } from 'src/app/shared/dynamic-form/field-config.model';
import { Validators } from '@angular/forms';
import { Pet } from 'src/app/pets/shared/pet.model';
import { ShareService } from 'src/app/shared/share.service';
import { CustomerService } from 'src/app/customers/shared/customer.service';

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.scss'],
  providers: [ShareService]
})
export class AppointmentInfoComponent
  extends BaseInfoComponent<Appointment, AppointmentService, AppointmentCommunicateService> {

  constructor(
    service: AppointmentService,
    serviceCom: AppointmentCommunicateService,
    private serviceCustomer:CustomerService,
    private serviceShared: ShareService,
    private serviceDialogs: DialogsService,
    private viewCon: ViewContainerRef,
  ) { super(service, serviceCom) }

  // Parameters
  regConfig: Array<FieldConfig>;

  // Methods
  onGetDataByKey(InfoValue: Appointment): void {
    if (InfoValue && InfoValue.AppointmentId) {
      this.service.getOneKeyNumber(InfoValue)
        .subscribe(dbData => {
          this.InfoValue = dbData;
          this.isValid = true;
        }, error => console.error(error), () => this.buildForm());
    }
    else {
      this.InfoValue = {
        AppointmentId: 0,
        AppointmentDate: new Date,
        AppointmentStatus: AppointmentStatus.Wait
      };
      this.buildForm();
    }
  }

  // Build Form
  buildForm(): void {
    this.regConfig = [
      // BasemodelRequireWorkpermit //
      {
        type: typeField.radiobutton,
        label: "สถานะการนัดหมาย",
        name: "AppointmentStatus",
        options: [
          { label: "รอดำเนินการ", value: AppointmentStatus.Wait },
          { label: "เสร็จสิ้น", value: AppointmentStatus.Complate },
          { label: "ยกเลิก", value: AppointmentStatus.Cancel },
        ],
        disabled: this.denySave,
        value: this.InfoValue.AppointmentStatus,
      },
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
        type: typeField.textarea,
        label: "ข้อมูลติดต่อ",
        name: "Communicate",
        disabled: this.denySave,
        value: this.InfoValue.Communicate,
        readonly: true,
      },
      {
        type: typeField.date,
        label: "วันที่นัดหมาย",
        name: "AppointmentDate",
        disabled: this.denySave,
        value: this.InfoValue.AppointmentDate,
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
        inputType: inputType.time,
        label: "เวลานัดหมาย",
        name: "AppointmentTime",
        disabled: this.denySave,
        value: this.InfoValue.AppointmentTime,
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
        label: "รายละเอียด",
        inputType: inputType.text,
        name: "Description",
        disabled: this.denySave,
        value: this.InfoValue.Description,
        validations: [
          {
            name: ValidatorField.maxLength,
            validator: Validators.maxLength(500),
            message: "ไม่เกิน 500 ตัวอักษร"
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
            validator: Validators.maxLength(500),
            message: "ไม่เกิน 500 ตัวอักษร"
          }
        ]
      },
      
    ];
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
  submitDynamicForm(InfoValue?: Appointment): void {
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
      if (data.name.indexOf("PetName") !== -1 || data.name.indexOf("CustomerName") !== -1) {
        this.serviceDialogs.dialogPetInfoAndTable(this.viewCon, { info: undefined, option: true, multi: false })
          .subscribe((pet: Pet) => {
            // console.log(pet);

            let temp = ["PetName", "CustomerName"]
            temp.forEach(item => {
              this.serviceShared.toChild(
                {
                  name: item,
                  value: pet[item]
                });
            });
            this.InfoValue.PetId = pet.PetId;
            this.serviceCustomer.getOneKeyNumber({ CustomerId: pet.CustomerId })
              .subscribe(dbCustomer => {
                if (dbCustomer) {
                  let communicate = `Tel:${dbCustomer.PhoneNo} | อื่นๆ:${dbCustomer.MailAddress}`;
                  this.serviceShared.toChild({
                    name: "Communicate",
                    value: communicate
                  });
                }
              });
          });
      }
    });
  }
}
