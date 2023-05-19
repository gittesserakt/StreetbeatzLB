import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {VerbosePerformance} from "../../../core/models/verbosePerformance";
import {VerbosePerformanceService} from "../../../core";
import {Filter} from "../../../core/models/filter.model";

@Component({
  selector: 'app-performance-view',
  templateUrl: './performance-view.component.html',
  styleUrls: ['./performance-view.component.scss']
})
export class PerformanceViewComponent implements OnInit{
  @Input() isAdmin: boolean;

  device:String = "Web";

  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])

  verbosePerformances?: VerbosePerformance[];

  constructor(
    private verbosePerformanceService: VerbosePerformanceService,
    private breakpointObserver: BreakpointObserver
  ) {
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

    this.isAdmin = false; //default value
  }

  ngOnInit(): void {
    console.log("performances component init");
    this.getAllPerformances();
  }

  getAllPerformances(): void {
    this.verbosePerformanceService.getAllVerbosePerformances()
      .subscribe((response) => {
        const {data, error} = response;
        console.log('verbosePerformances', response);

        if (data) {
          this.verbosePerformances = data as VerbosePerformance[];
        }

        if (error) {
          console.log(error);
        }
      });
  }

  getFilteredPerformances(filter: Filter): void {
    this.verbosePerformanceService.getFilteredVerbosePerformances(filter.date, filter.artist, filter.stage)
      .subscribe((response) => {
        const {data, error} = response;
        console.log('verbosePerformances', response);

        if (data) {
          this.verbosePerformances = data as VerbosePerformance[];
        }

        if (error) {
          console.log(error);
        }
      });
  }

  filtersChanged(event: Filter) {
    this.getFilteredPerformances(event);
  }
}
