import {Component, OnInit, HostListener} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StreetbeatzLB_Frontend';

  isSticky: boolean = false;

  xPositionBall1: number = 0;
  yPositionBall1: number = 0;
  xPositionBall2: number = 0;
  yPositionBall2: number = 0;
  xPositionBall3: number = 0;
  yPositionBall3: number = 0;

  sizeBall1: number = 0;
  sizeBall2: number = 0;
  sizeBall3: number = 0;

  device: String = "Web";
  displayMap = new Map([
    [Breakpoints.HandsetPortrait, 'HandsetPortrait'],
    [Breakpoints.HandsetLandscape, 'HandsetLandscape'],
    [Breakpoints.TabletPortrait, 'TabletPortrait'],
    [Breakpoints.TabletLandscape, 'TabletLandscape'],
    [Breakpoints.WebPortrait, 'WebPortrait'],
    [Breakpoints.WebLandscape, 'WebLandscape'],
  ]);


  ngOnInit(): void {
    this.getBreakpoint();
    this.switchBallSizeAndPosition();
  }

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver) {
    this.getBreakpoint();
    this.switchBallSizeAndPosition();
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.scrollY >= 250;
  }

  setBallPosition(xPositionBall1: number, yPositionBall1: number, xPositionBall2: number, yPositionBall2: number, xPositionBall3: number, yPositionBall3: number) {
    this.xPositionBall1 = xPositionBall1;
    this.yPositionBall1 = yPositionBall1;
    this.xPositionBall2 = xPositionBall2;
    this.yPositionBall2 = yPositionBall2;
    this.xPositionBall3 = xPositionBall3;
    this.yPositionBall3 = yPositionBall3;
    // console.log(xPositionBall1 + ',' + yPositionBall1 + ',' + xPositionBall2 + ',' + yPositionBall2 + ',' + xPositionBall3 + ',' + yPositionBall3);
    // console.log(this.xPositionBall1 + ',' + this.yPositionBall1 + ',' + this.xPositionBall2 + ',' + this.yPositionBall2 + ',' + this.xPositionBall3 + ',' + this.yPositionBall3);
  }

  setBallSize(sizeBall1: number, sizeBall2: number, sizeBall3: number) {
    this.sizeBall1 = sizeBall1;
    this.sizeBall2 = sizeBall2;
    this.sizeBall3 = sizeBall3;
    // console.log(sizeBall1 + ',' + sizeBall2 + ',' + sizeBall3);
    // console.log(this.sizeBall1 + ',' + this.sizeBall2 + ',' + this.sizeBall3);
  }

  switchBallSizeAndPosition(){
    // this.getBreakpoint();
    switch (this.device) {
      case "WebLandscape":
        this.setBallPosition(70, 10, 17, 62, 110, 90);
        this.setBallSize(270, 350, 310);
        break;
      case "WebPortrait":
        this.setBallPosition(70, 10, 17, 62, 110, 90);
        this.setBallSize(270, 350, 310);
        break;
      case "TabletLandscape":
        this.setBallPosition(70, 10, 12, 55, 125, 90);
        this.setBallSize(270, 200, 310);
        break;
      case "TabletPortrait":
        this.setBallPosition(70, 10, 12, 55, 125, 90);
        this.setBallSize(270, 200, 310);
        break;
      case "HandsetLandscape":
        this.setBallPosition(70, 10, 12, 55, 190, 90);
        this.setBallSize(200, 105, 250);
        break;
      case "HandsetPortrait":
        this.setBallPosition(70, 10, 12, 55, 190, 90);
        this.setBallSize(200, 105, 250);
        break;
    }
  }

  generateBackgroundImageStyles(): any {
    // this.switchBallSizeAndPosition();
    // console.log('Called: generateBackgroundImageStyles');
    // console.log(this.sizeBall1 + ',' + this.sizeBall2 + ',' + this.sizeBall3);
    // console.log(this.xPositionBall1 + ',' + this.yPositionBall1 + ',' + this.xPositionBall2 + ',' + this.yPositionBall2 + ',' + this.xPositionBall3 + ',' + this.yPositionBall3);
    // console.log(this.device);
    return {
      'background-image': `url('/assets/design/blue_backgroundBall.svg'), url('/assets/design/blue_backgroundBall.svg'), url('/assets/design/blue_backgroundBall.svg'), url('/assets/design/landingpage_background.svg')`,
      'background-position': `${this.xPositionBall1}% ${this.yPositionBall1}%, ${this.xPositionBall2}% ${this.yPositionBall2}%, ${this.xPositionBall3}% ${this.yPositionBall3}%, 0% 0%`,
      'background-size': `${this.sizeBall1}px, ${this.sizeBall2}px, ${this.sizeBall3}px, cover`,
      'background-repeat': 'no-repeat',
      'background-attachment': 'fixed',
    }
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

    // console.log('Breakpoint: ' + this.device)
  }
}
