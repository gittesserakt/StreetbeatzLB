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
  appText: string = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores "; //200 letters
  festivalText: string = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labor"; // 400 letters
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
    this.getBreakpoint(breakpointObserver);
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenHeightPX = window.innerHeight;
    this.screenWidthPX = window.innerWidth;
    this.getBreakpoint(this.breakpointObserver);
  }

  getBreakpoint(breakpointObserver: BreakpointObserver){
    breakpointObserver.observe([
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
