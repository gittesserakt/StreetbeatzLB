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

  verbosePerformances?: VerbosePerformance[];

  screenHeightPX: number = 0;
  screenWidthPX: number = 0;

  constructor(private verbosePerformanceService: VerbosePerformanceService, private activatedRoute: ActivatedRoute,
              private route: Router, private breakpointObserver: BreakpointObserver, private smfService: SmfCookieService) {
    this.onResize();
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
    this.verbosePerformanceService.getFilteredVerbosePerformances(
      filter.dateDate, filter.timeDate,  filter.artist, filter.stage)
      .subscribe((response) => {
        const {data, error} = response;
        console.log('verbosePerformances', response);

        if (data) {
          this.verbosePerformances = data as VerbosePerformance[];
          console.log("--____________________________"+this.verbosePerformances.length)
        }

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
        this.getFilteredPerformances(new Filter(null, null, null, params['stageId']));
      } else if (params['artistId']) {
        console.log("filter via landingpage artist");
        this.smfService.saveFilter(new Filter(null, null, params['artistId'], null));
        this.getFilteredPerformances(new Filter(null, null, params['artistId'], null));
      } else {
         this.getAllPerformances();
      }
    });
  }

  filterChanged(event: Filter) {
    this.getFilteredPerformances(event);
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
