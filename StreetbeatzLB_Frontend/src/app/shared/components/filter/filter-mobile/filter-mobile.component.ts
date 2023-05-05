import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from "../../../../core/models/filter.model";
import {SmfCookieService} from "../../../../core/services/smfCookieService";
import {Time} from "@angular/common";

@Component({
  selector: 'app-filter-mobile',
  templateUrl: './filter-mobile.component.html',
  styleUrls: ['./filter-mobile.component.scss']
})
export class FilterMobileComponent implements OnInit {
  panelOpenState = false;
  filter: Filter = new Filter(null, null, null, null);
  filterTypes: string[] = []; // 'Date', 'Artist', 'Stage'
  @Input() inFilter!: Filter;
  @Output() outFilter = new EventEmitter<Filter>();
  constructor(private smfCookieService:SmfCookieService) {
  }
  ngOnInit() {
    if (this.inFilter) {
      this.filter = this.inFilter;
    }
  }

  remove(filterType: string): void {
    const index = this.filterTypes.indexOf(filterType);

    switch (filterType) {
      case 'Date':
        this.filter.date = null;
        this.remove('Time');
        break;
      case 'Time':
        this.filter.time = null;
        break;
      case 'Artist':
        this.filter.artist = null;
        break;
      case 'Stage':
        this.filter.stage = null;
        break;
    }

    if (index >= 0) {
      this.filterTypes.splice(index, 1);
    }
  }

  add(filterType: string): void {
    this.filterTypes.push(filterType);
  }

  dateChangeEvent(event: Date | null) {
    this.filter.date = event;

    if (event) {
      this.add('Date');
    } else {
      this.remove('Date');
    }
  }

  artistChangeEvent(event: string | null) {
    this.filter.artist = event;

    if (event) {
      this.add('Artist');
    } else {
      this.remove('Artist');
    }
  }

  stageChangeEvent(event: string | null) {
    this.filter.stage = event;

    if (event) {
      this.add('Stage');
    } else {
      this.remove('Stage');
    }
  }

  timeChangeEvent($event: Time | null) {
    this.filter.time = $event;

    if ($event) {
      if (!this.filterTypes.includes('Time')) {
        this.add('Time');
      }
    } else {
      this.remove('Time');
    }
  }

  applyFilter() {
    this.outFilter.emit(this.filter);
    this.panelOpenState = false;
    this.smfCookieService.setFilterCookies(this.filter);
  }
}
