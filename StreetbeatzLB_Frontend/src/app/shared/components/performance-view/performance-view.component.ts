import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {VerbosePerformance} from "../../../core/models/verbosePerformance";
import {VerbosePerformanceService} from "../../../core";
import {Filter} from "../../../core/models/filter.model";
import {ActivatedRoute, Router} from '@angular/router';
import {SmfCookieService} from "../../../core/services/smfCookieService";

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

  verbosePerformances: VerbosePerformance[] = [];

  loadedPerformances: string = "0";

  isTextVisible: boolean = false;
  isButtonVisible: boolean = false;

  constructor(
    private verbosePerformanceService: VerbosePerformanceService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private smfService: SmfCookieService,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.WebLandscape
    ]).subscribe(result =>{
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.device = this.displayMap.get(query) as String;
        }
      }
      console.log(this.device);
    })

    this.isAdmin = false; //default value
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['stageId']) {
        this.smfService.saveFilter(new Filter(null, null, null, params['stageId']));
        this.getFilteredPerformances(new Filter(null, null, null, params['stageId']), null);
      } else if (params['artistId']) {
        this.smfService.saveFilter(new Filter(null, null, params['artistId'], null));
        this.getFilteredPerformances(new Filter(null, null, params['artistId'], null), null);
      } else if (this.smfService.filterSet()){
        this.getFilteredPerformances(this.smfService.loadFilter(), null);
      }
    });
  }

  getFilteredPerformances(filter: Filter, id: string | null): void {
    this.verbosePerformanceService.getFilteredVerbosePerformances(filter.dateDate, filter.timeDate, filter.artist, filter.stage, id)
      .subscribe((response) => {
        const {data, error} = response;

        let newLoadedPerformances: VerbosePerformance[] = [];

        if (data) {
          newLoadedPerformances = data as VerbosePerformance[];
          if (this.verbosePerformances.length === 0){
            this.verbosePerformances = newLoadedPerformances;
          } else {
            this.verbosePerformances = this.verbosePerformances.concat(newLoadedPerformances);
          }
          this.loadedPerformances = "" + this.verbosePerformances.length;
        }

        this.isTextVisible = this.loadedPerformances === "0";
        this.isButtonVisible = newLoadedPerformances.length === 20;

        if (error) {
          console.log(error);
        }
      });
  }

  filtersChanged(event: Filter) {
    this.verbosePerformances = [];
    this.getFilteredPerformances(event, null);
  }

  loadMorePerformances() {
    this.getFilteredPerformances(this.smfService.loadFilter(), this.loadedPerformances);
  }

  deleteMarkedPerformances(): void {

  }
}
