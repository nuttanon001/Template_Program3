import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { BaseInfoDialogComponent } from 'src/app/shared/baseclases/base-info-dialog-component';
import { Appointment, AppointmentStatus } from 'src/app/appointments/shared/appointment.model';
import { ShareService } from 'src/app/shared/share.service';
import { DialogsService } from '../../shared/dialogs.service';
import { Subscription } from 'rxjs';
import { typeField, ValidatorField, inputType } from 'src/app/shared/dynamic-form/field-config.model';
import { Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customers/shared/customer.service';
import { Pet } from 'src/app/pets/shared/pet.model';

@Component({
  selector: 'app-appointment-info-dialog',
  templateUrl: './appointment-info-dialog.component.html',
  styleUrls: ['./appointment-info-dialog.component.scss'],
  providers: [ShareService, DialogsService]
})
export class AppointmentInfoDialogComponent extends BaseInfoDialogComponent<Appointment> implements OnDestroy {

  constructor(
    private serviceShared: ShareService,
    private serviceDialogs: DialogsService,
    private serviceCustomer: CustomerService,
    private viewCon: ViewContainerRef
  ) { super() }
  // Parameters
  regimens: Array<string>;
  subscription2: Subscription;

  ngOnInit(): void {
    if (this.InfoValue) {
      if (this.InfoValue) {
        this.denySave = this.InfoValue.ReadOnly;
        this.isValid = this.InfoValue.AppointmentId && this.InfoValue.AppointmentId > 0;
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
        type: typeField.inputclick,
        label: "ข้อมูลติดต่อ",
        inputType: inputType.text,
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

  ngOnDestroy(): void {
    if (this.subscription2) {
      this.subscription2.unsubscribe();
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
