// angular core
import {
  OnInit, OnDestroy,
  ElementRef, ViewChild, ViewContainerRef
} from "@angular/core";
// rxjs
import { Subscription } from "rxjs";
// classes
import { BaseModel } from "../basemode/base-model.model";
import { BaseRestService } from "./base-rest.service";
import { BaseCommunicateService } from "./base-communicate.service";
// services
import { DialogsService } from "../../dialogs/shared/dialogs.service";

export abstract class BaseMasterComponent
  <Model extends BaseModel,
  Service extends BaseRestService<Model>,
  CommunicateService extends BaseCommunicateService<Model>>
  implements OnInit, OnDestroy {
  /*
   * constructor
   */
  constructor(
    protected service: Service,
    protected communicateService: CommunicateService,
    protected dialogsService: DialogsService,
    protected viewContainerRef: ViewContainerRef,
  ) { }
  /*
   * Parameter
   */
  displayValue: Model | undefined;
  subscription: Subscription;
  // boolean event
  _showDetail: boolean;
  onLoading: boolean;
  canSave: boolean;
  // scroll: Scroll;

  /*
   * Property
   */
  get DisplayDataNull(): boolean {
    return this.displayValue === undefined;
  }
  get ShowDetail(): boolean {
    if (this._showDetail) {
      return this._showDetail;
    } else {
      return false;
    }
  }
  set ShowDetail(showEdit: boolean) {
    if (showEdit !== this._showDetail) {
      this._showDetail = showEdit;
    }
  }

  /*
   * Methods
   */
  // angular hook
  ngOnInit(): void {
    this.ShowDetail = false;
    this.onLoading = false;
    this.canSave = false;
    // Subsciption
    this.subscription = this.communicateService.ToParent$.subscribe(
      (communicateDate: Model) => {
        this.displayValue = communicateDate;
        this.canSave = communicateDate !== undefined && this.ShowDetail;
      });
  }

  // angular hook
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
  }

  // on cancel edit
  onCancelEdit(): void {
    this.displayValue = undefined;
    this.ShowDetail = false;
    this.canSave = false;
  }

  // on submit
  onSubmit(): void {
    this.canSave = false;
    if (this.displayValue.CreateDate) {
      this.onUpdateToDataBase(this.displayValue);
    } else {
      this.onInsertToDataBase(this.displayValue);
    }
  }

  // on save complete
  onSaveComplete(): void {
    this.dialogsService.context("System message", "Save completed.", this.viewContainerRef)
      .subscribe(result => {
        this.ShowDetail = false;
        this.displayValue = undefined;
      });
  }
  // on detail view
  onDetailView(value?: { data: Model, option: number }): void {
    if (value) {
      if (value.option === 1 || value.option === 2) {
        this.displayValue = value.data;
        this.displayValue.ReadOnly = value.option === 2;
        // Check status can edit if not readonly
        this.onLoading = true;
        this.ShowDetail = true;
        setTimeout(() => {
          this.communicateService.toChildEdit(this.displayValue);
          this.onLoading = false;
        }, 1000);
      }else if (value.option === 0) {
        this.onLoading = true;
        this.dialogsService.confirm("Warning Message", "Do you want delete this item?", this.viewContainerRef)
          .subscribe(result => {
            if (result) {
              this.service.deleteKeyNumber(value.data)
                .subscribe(dbData => { }, error => { }, () => {
                  this.onLoading = false;
                  this.onReloadData();
                });
            } else {
              this.onLoading = false;
            }
          });
        this.canSave = false;
      }
    } else {
      this.displayValue = undefined;
      this.ShowDetail = true;
      setTimeout(() => this.communicateService.toChildEdit(this.displayValue), 1000);
    }
  }

  // on insert data
  onInsertToDataBase(value: Model): void {
    // insert data
    this.service.addModel(value).subscribe(
      (complete: any) => {
        if (complete) {
          this.displayValue = complete;
          this.onSaveComplete();
        } 
        if (this.onLoading) {
          this.onLoading = false;
        }
      },
      (error: any) => {
        console.error(error);
        this.dialogsService.error("Failed !",
          "Save failed with the following error: Invalid Identifier code !!!", this.viewContainerRef);
      }
    );
  }

  // on update data
  onUpdateToDataBase(value: Model): void {
    // update data
    this.service.updateModelWithKey(value).subscribe(
      (complete: any) => {
        if (complete) {
          this.displayValue = complete;
          this.onSaveComplete();
        } 
        if (this.onLoading) {
          this.onLoading = false;
        }
      },
      (error: any) => {
        console.error(error);
        this.dialogsService.error("Failed !",
          "Save failed with the following error: Invalid Identifier code !!!", this.viewContainerRef);
      }
    );
  }

  // on reload table
  abstract onReloadData();
}
