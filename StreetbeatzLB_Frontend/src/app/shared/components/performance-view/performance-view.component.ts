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

  verbosePerformances: VerbosePerformance[] = [];

  loadedPerformances: string = "0";

  isTextVisible: boolean = false;
  isTextNextDayVisible: boolean = false;
  isButtonMoreVisible: boolean = false;
  isButtonNextDayVisible: boolean = false;

  screenHeightPX: number = 0;
  screenWidthPX: number = 0;

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
        this.isButtonMoreVisible = newLoadedPerformances.length === 20;

        this.isButtonNextDayVisible = !this.isButtonMoreVisible && !this.isTextVisible;
        this.isTextNextDayVisible = false;

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

  loadNextDayPerformances() {
    let filter = this.smfService.loadFilter();
    filter.dateDate?.setDate(filter.dateDate?.getDate() + 1);
    if (filter.dateDate?.getDate() === 29){
      this.isButtonNextDayVisible = false;
      this.isTextNextDayVisible = true;
    } else {
      filter.timeDate?.setHours(18, 0, 0, 0);
      this.smfService.saveFilter(filter);
      this.getFilteredPerformances(this.smfService.loadFilter(), null);
    }
  }

  deleteMarkedPerformances(): void {

  }
}
