import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from "../../../../core/models/filter.model";
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
  @Input() inFilter!: Filter; //Was macht dieser inFilter?
  @Output() outFilter = new EventEmitter<Filter>();

  ngOnInit() {
    if (this.inFilter) {
      this.filter = this.inFilter;
      this.applyFilter();
    }
  }

  remove(filterType: string): void {
    const index = this.filterTypes.indexOf(filterType);

    switch (filterType) {
      case 'Date':
        this.filter.dateDate = null;
        break;
      case 'Time':
        this.filter.timeDate = null;
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
    this.filter.dateDate = event;

    if (event) {
      if (!this.filterTypes.includes('Date')) {
        this.add('Date');
      }
    } else {
      this.remove('Date');
    }
  }

  artistChangeEvent(event: string | null) {
    this.filter.artist = event;

    if (event) {
      if (!this.filterTypes.includes('Artist')) {
        this.add('Artist');
      }
    } else {
      this.remove('Artist');
    }
  }

  stageChangeEvent(event: string | null) {
    this.filter.stage = event

    if (event) {
      if (!this.filterTypes.includes('Stage')) {
        this.add('Stage');
      }
    } else {
      this.remove('Stage');
    }
  }

  timeChangeEvent(event: Time | null) {
    this.filter.setWithTimeType(event)

    if (event) {
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
  }
}
