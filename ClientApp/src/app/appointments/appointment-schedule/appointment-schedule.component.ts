import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from "fullcalendar"
import { AppointmentService } from '../shared/appointment.service';
import { FieldConfig } from 'src/app/shared/dynamic-form/field-config.model';
import { OptionSchedule } from 'src/app/shared/basemode/option-schedule.model';
import * as moment from "moment";
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.scss']
})
export class AppointmentScheduleComponent implements OnInit {

  constructor(
    private service: AppointmentService,
    private serviceDialog: DialogsService,
    private viewCon:ViewContainerRef
  ) {
    moment.locale("th-TH");
  }

  // Parameter
  calendarOptions: Options;
  optionSchedule: OptionSchedule;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  isLoading: boolean = false;
  regConfig: Array<FieldConfig>;
  displayEvent: any;
  events = null;

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [],
      timeFormat: 'HH:mm'
    };

    if (!this.optionSchedule) {
      let sDate = moment().startOf('month').toDate();
      let eDate = moment().endOf('month').toDate();

      this.optionSchedule = {
        SDate: sDate,
        EDate: eDate
      };
    }

    this.loadevents();
  }

  // Loadevent
  loadevents() {
    if (this.optionSchedule) {
      this.isLoading = true;
      this.service.getScheduleWithhScroll(this.optionSchedule).subscribe(data => {
        this.events = data;
        this.isLoading = false;
      });
    }
  }

  // on button calender click
  clickButton(model: any) {
    // let value = this.ucCalendar.fullCalendar('getDate');
    // console.log("getdate", value);

    // console.log("clickButton", model);
    this.displayEvent = model;
    // model have buttonType
    if (model.buttonType) {
      // model change month
      if (model.buttonType === "prev" || model.buttonType === "next") {
        if (model.data) {

          //debug here
          // console.log(JSON.stringify(model.data));

          this.optionSchedule = {
            SDate: moment(model.data).startOf('month').toDate(),
            EDate: moment(model.data).endOf('month').toDate()
          };

          this.loadevents();
        }
      }
    }
  }

  // on day click
  dayClick(model: any) {
    // console.log("dayClick",model);
  }

  // on event click information
  eventClick(model: any) {
    //model = {
    //  event: {
    //    id: model.event.id,
    //    start: model.event.start,
    //    end: model.event.end,
    //    title: model.event.title,
    //    allDay: model.event.allDay
    //    // other params
    //  },
    //  duration: {}
    //}
    //this.displayEvent = model;

    if (model) {
      if (model.event) {
        if (model.event.id) {
          let AppointmentId = model.event.id;
          this.service.getOneKeyNumber({ AppointmentId: AppointmentId })
            .subscribe(dbAppointment => {
              if (dbAppointment) {
                this.serviceDialog.dialogAppointmentInfo(this.viewCon, { info: dbAppointment, multi: false, option: false })
                  .subscribe(result => {
                    if (result) {
                      this.service.updateModelWithKey(result)
                        .subscribe(dbResult => {
                          if (dbResult) {
                            this.serviceDialog.context("ข้อความระบบ", "บันทึกข้อมูลเรียบร้อย", this.viewCon)
                              .subscribe(() => this.loadevents());
                          }
                        });
                    }
                  });
              }
            });
        }
      }
    }
  }

  // on event calender change
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
}
