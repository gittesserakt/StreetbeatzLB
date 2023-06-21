import {Component, HostListener, Input, OnInit} from '@angular/core';
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

  screenHeightPX: number = 0;
  screenWidthPX: number = 0;

  verbosePerformances?: VerbosePerformance[];

  constructor(
    private verbosePerformanceService: VerbosePerformanceService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private smfService: SmfCookieService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.onResize();

    this.isAdmin = false; //default value
  }

  ngOnInit(): void {
    /*console.log(this.isAdmin ? "performance-view component (as admin) init":
      "performance-view component init");*/
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['stageId']) {
        // console.log("filter via map");
        this.smfService.saveFilter(new Filter(null, null, null, params['stageId']));
        this.getFilteredPerformances(new Filter(null, null, null, params['stageId']));
      } else if (params['artistId']) {
        // console.log("filter via landingpage artist");
        this.smfService.saveFilter(new Filter(null, null, params['artistId'], null));
        this.getFilteredPerformances(new Filter(null, null, params['artistId'], null));
      } else if (this.smfService.filterSet()){
        this.getFilteredPerformances(this.smfService.loadFilter());
      } else {
        this.getAllPerformances();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenHeightPX = window.innerHeight - 66;
    this.screenWidthPX = window.innerWidth;
    this.getBreakpoint();
  }

  getBreakpoint(){
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.device = this.displayMap.get(query) as string;
        }
      }
    })

    console.log('Breakpoint: ' + this.device)
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
    this.verbosePerformanceService.getFilteredVerbosePerformances(filter.dateDate, filter.timeDate, filter.artist, filter.stage)
      .subscribe((response) => {
        const {data, error} = response;
        console.log('verbosePerformances', response);

        if (data) {
          this.verbosePerformances = data as VerbosePerformance[];
          // console.log(this.verbosePerformances);
        }

        if (error) {
          console.log(error);
        }
      });
  }

  filtersChanged(event: Filter) {
    this.getFilteredPerformances(event);
  }

  deleteMarkedPerformances(): void {

  }
}
