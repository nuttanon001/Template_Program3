import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../field-config.model";

@Component({
  selector: "app-input",
  template: `
  <mat-form-field [formGroup]="group" class="app-input">
    <input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
    <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
      <mat-error *ngIf="group.get(field.name).hasError(validation.name)">
        {{validation.message}}
      </mat-error>
    </ng-container>
  </mat-form-field>
`,
  styles: [`
 .app-input {
    width: 45%;
    margin: 5px;

    mat-form-field {
      width: 90%;
      min-height:50px;
      margin:5px;
    }
  }

  @media(max-width: 600px)
  {
    .app-input {
      width:100%;
      margin: 5px;

      mat-form-field {
        width: 90%;
        min-height:50px;
        margin:5px;
      }
    }
  }

`]
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() { }
  ngOnInit() { }
}
