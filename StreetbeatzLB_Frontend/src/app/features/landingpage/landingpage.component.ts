import {Component, HostListener} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  screenHeightPX: number = 0;
  screenWidthPX: number = 0;
  appText: string = "Experience StreetbeatzLB: 3 days, 11 stages, 32 artists." + '\n' + "Join the festival starting Friday at 6 PM. Get all the info and be part of it!";
  festivalText: string = "Get ready for an unforgettable festival weekend starting on Friday at 6 PM. With 3 days, 11 stages, and 32 talented artists, it's going to be epic. Don't miss the grand finale on Sunday at 9:30 PM on Main Stage A, featuring the top 3 voted artists. Get all the info you need and be part of the excitement. Download the app now!";
  device: string = 'Web';
  displayMap = new Map([
    [Breakpoints.HandsetPortrait, 'HandsetPortrait'],
    [Breakpoints.HandsetLandscape, 'HandsetLandscape'],
    [Breakpoints.TabletPortrait, 'TabletPortrait'],
    [Breakpoints.TabletLandscape, 'TabletLandscape'],
    [Breakpoints.WebPortrait, 'WebPortrait'],
    [Breakpoints.WebLandscape, 'WebLandscape'],
  ]);
  constructor(private breakpointObserver: BreakpointObserver) {
    this.onResize();
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
