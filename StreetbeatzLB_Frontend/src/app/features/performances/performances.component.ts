import {Component, HostListener, OnInit} from "@angular/core";
import {VerbosePerformanceService} from "../../core";
import {VerbosePerformance} from "../../core/models/verbosePerformance";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Filter} from "../../core/models/filter.model";
import {SmfCookieService} from "../../core/services/smfCookieService";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.scss']
})
export class PerformancesComponent implements OnInit {
  device: String = "Web";

  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])

  verbosePerformances: VerbosePerformance[] = [];

  screenHeightPX: number = 0;
  screenWidthPX: number = 0;

  loadedPerformances: string = "0";

  isTextVisible: boolean = false;
  isButtonVisible: boolean = false;

  constructor(private verbosePerformanceService: VerbosePerformanceService, private activatedRoute: ActivatedRoute,
              private route: Router, private breakpointObserver: BreakpointObserver, private smfService: SmfCookieService) {
    this.onResize();
  }

  getFilteredPerformances(filter: Filter, id: string | null): void {
    this.verbosePerformanceService.getFilteredVerbosePerformances(
      filter.dateDate, filter.timeDate,  filter.artist, filter.stage, id)
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

  filterChanged(event: Filter) {
    this.verbosePerformances = [];
    this.getFilteredPerformances(event, null);
  }

  loadMorePerformances() {
    this.getFilteredPerformances(this.smfService.loadFilter(), this.loadedPerformances);
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
}
