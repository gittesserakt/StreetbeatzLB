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

  constructor(private verbosePerformanceService: VerbosePerformanceService, private activatedRoute: ActivatedRoute,
              private route: Router, private breakpointObserver: BreakpointObserver, private smfService: SmfCookieService) {
    this.onResize();
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
    this.verbosePerformanceService.getFilteredVerbosePerformances(
      filter.dateDate, filter.timeDate,  filter.artist, filter.stage, id)
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

  ngOnInit(): void {
    console.log("performances component init");
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['stageId']) {
        console.log("filter via map");
        this.smfService.saveFilter(new Filter(null, null, null, params['stageId']));
        this.getFilteredPerformances(new Filter(null, null, null, params['stageId']), null);
      } else if (params['artistId']) {
        console.log("filter via landingpage artist");
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
