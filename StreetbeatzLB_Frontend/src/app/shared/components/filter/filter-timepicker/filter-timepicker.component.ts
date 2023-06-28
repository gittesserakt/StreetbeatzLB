import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Time} from "@angular/common";

@Component({
  selector: 'app-filter-timepicker',
  templateUrl: './filter-timepicker.component.html',
  styleUrls: ['./filter-timepicker.component.scss']
})
export class FilterTimepickerComponent implements OnInit {

  @Input() set inTime(value: Time | null) {
    if (value !== null) {
      this.hoursControl.setValue(value.hours);
      this.minutesControl.setValue(value.minutes);
    } else {
      this.hoursControl.setValue(null);
      this.minutesControl.setValue(null);
    }
  }

  @Output() outTime= new EventEmitter<Time | null>();
  hoursControl:FormControl<number | null>  = new FormControl(0);
  minutesControl: FormControl<number | null> = new FormControl(0);

  ngOnInit() {
    this.hoursControl.valueChanges.subscribe(() => this.timeChangeEvent());
    this.minutesControl.valueChanges.subscribe(() => this.timeChangeEvent());
  }

  timeChangeEvent() {
    this.outTime.emit(this.getTime());
  }

  incrementHours() {
    const hours = this.hoursControl.value;
    if (hours !== null) {
      this.hoursControl.setValue((hours + 1) % 24);
    } else {
      this.hoursControl.setValue(0);
    }
  }

  decrementHours() {
    const hours = this.hoursControl.value;
    if (hours !== null) {
      this.hoursControl.setValue((hours - 1 + 24) % 24);
    } else {
      this.hoursControl.setValue(0);
    }
  }

  incrementMinutes() {
    const minutes = this.minutesControl.value;
    if (minutes !== null) {
      this.minutesControl.setValue((minutes + 1) % 60);
    } else {
      this.minutesControl.setValue(0);
    }
  }

  decrementMinutes() {
    const minutes = this.minutesControl.value;
    if (minutes !== null) {
      this.minutesControl.setValue((minutes - 1 + 60) % 60);
    } else {
      this.minutesControl.setValue(0);
    }
  }

  getTime(): Time | null {
    if (this.hoursControl.value === null && this.minutesControl.value === null) {
      return null;
    }
    const hours: number = this.hoursControl.value === null ? 0 : this.hoursControl.value;
    const minutes: number = this.minutesControl.value === null ? 0 : this.minutesControl.value;
    return {hours,minutes};
  }

}
