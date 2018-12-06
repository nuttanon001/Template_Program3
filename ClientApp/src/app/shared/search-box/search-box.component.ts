import {
  Component, OnInit, Input,
  Output, EventEmitter, ElementRef, 
} from "@angular/core";

// by importing just the rxjs operators we need, We're theoretically able
// to reduce our build size vs. importing all of them.
import { Observable, fromEvent } from "rxjs";
import { map,debounceTime,distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "search-box",
  template: `
    <mat-form-field>
        <input id="search-box1" type="text" matInput
               placeholder="Search here..." maxlength="50" autofocus
               [(ngModel)]="setInput">
    </mat-form-field>
  `
})
export class SearchBoxComponent implements OnInit {
  @Input() setInput: string;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  search2: string;

  constructor() {}

  ngOnInit(): void {
    const el = document.getElementById("search-box1");
    // convert the `keyup` event into an observable stream
    fromEvent(el, 'input').pipe(
      debounceTime(350),
      distinctUntilChanged(),
      map((e: any) => {
        return e.target.value;
      }),
     ).subscribe( //extract the value of the input
      (results: any) => {
        this.search2 = results;
        this.search.emit(this.search2);
      });
  }
}
