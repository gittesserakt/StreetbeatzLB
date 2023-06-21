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
    /*console.log(this.isAdmin ? "performance-view component (as admin) init":
      "performance-view component init");*/
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['stageId']) {
        // console.log("filter via map");
        this.smfService.saveFilter(new Filter(null, null, null, params['stageId']));
        this.getFilteredPerformances(new Filter(null, null, null, params['stageId']), null);
      } else if (params['artistId']) {
        // console.log("filter via landingpage artist");
        this.smfService.saveFilter(new Filter(null, null, params['artistId'], null));
        this.getFilteredPerformances(new Filter(null, null, params['artistId'], null), null);
      } else if (this.smfService.filterSet()){
        this.getFilteredPerformances(this.smfService.loadFilter(), null);
      }
    });
  }

  getAllPerformances(id: string | null): void {
    this.verbosePerformanceService.getAllVerbosePerformances(id)
      .subscribe((response) => {
        const {data, error} = response;
        console.log('verbosePerformances', response);

        if (data) {
          if (this.verbosePerformances.length === 0){
            this.verbosePerformances = data as VerbosePerformance[];
            console.log("--____________________________"+this.verbosePerformances.length)
          } else {
            this.verbosePerformances = this.verbosePerformances.concat(data as VerbosePerformance[]);
            console.log("--____________________________"+this.verbosePerformances.length);
          }
          this.loadedPerformances = "" + this.verbosePerformances.length;
        }

        if (error) {
          console.log(error);
        }
      });
  }

  getFilteredPerformances(filter: Filter, id: string | null): void {
    this.verbosePerformanceService.getFilteredVerbosePerformances(filter.dateDate, filter.timeDate, filter.artist, filter.stage, id)
      .subscribe((response) => {
        const {data, error} = response;
        console.log('verbosePerformances', response);

        if (data) {
          if (this.verbosePerformances.length === 0){
            this.verbosePerformances = data as VerbosePerformance[];
            console.log("--____________________________"+this.verbosePerformances.length)
          } else {
            this.verbosePerformances = this.verbosePerformances.concat(data as VerbosePerformance[]);
            console.log("--____________________________"+this.verbosePerformances.length);
          }
          this.loadedPerformances = "" + this.verbosePerformances.length;
          console.log("loaded performances " + this.loadedPerformances);
        }

        this.isTextVisible = this.loadedPerformances === "0";

        console.log("text visible " + this.isTextVisible);

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
