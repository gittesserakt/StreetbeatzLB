import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Filter} from "../../../core/models/filter.model";
import {SmfCookieService} from "../../../core/services/smfCookieService";
import {filter} from "rxjs";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{
  device: String = "Web";
  filter: Filter = new Filter(null, null, null);
  dateTimeFilter: Filter = new Filter(null, null, null); // date and time will be combined into one filter
  @Output() outFilter = new EventEmitter<Filter>();

  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])

  constructor(private breakpointObserver: BreakpointObserver, private smfService: SmfCookieService) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      //console.log(result);
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.device = this.displayMap.get(query) as String;
        }
      }
      //console.log(this.device);
    })
    console.log(smfService.loadFilter().toString())
  }
  ngOnInit(){
    this.filter = this.smfService.loadFilter();
  }

  filterChanged(event: Filter) {
    this.filter = event;
    this.smfService.saveFilter(this.filter);
    this.outFilter.emit(this.filter);
    console.log(this.dateTimeFilter);
  }
}
