import {Component, EventEmitter, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Filter} from "../../../core/models/filter.model";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  device:String = "Web";
  filter: Filter = new Filter(null, null, null, null);
  dateTimeFilter: Filter = new Filter(null, null, null, null); // date and time will be combined into one filter
  @Output() outFilter = new EventEmitter<Filter>();

  displayMap= new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.WebLandscape
    ]).subscribe(result =>{
      //console.log(result);
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.device = this.displayMap.get(query) as String;
        }
      }
      //console.log(this.device);
    })
  }

  filtersChanged(event: Filter) {
    this.filter = event;
    const _dateTime = this.filter.date ? new Date(this.filter.date) : null;
    if (_dateTime && this.filter.time) {
      _dateTime.setHours(this.filter.time.hours);
      _dateTime.setMinutes(this.filter.time.minutes);
    }
    this.dateTimeFilter = new Filter(_dateTime, null, this.filter.artist, this.filter.stage);
    this.outFilter.emit(this.dateTimeFilter);
    console.log(this.dateTimeFilter);
  }
}
