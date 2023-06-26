import {Component, OnInit, HostListener, ViewChild, Inject, ElementRef} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild("sidenav") sidenav!: MatSidenav;
  title = 'StreetbeatzLB';

  lightBackground: boolean = false;

  backgroundImageStyles: any;

  xPositionBall1: number = 0;
  yPositionBall1: number = 0;
  xPositionBall2: number = 0;
  yPositionBall2: number = 0;
  xPositionBall3: number = 0;
  yPositionBall3: number = 0;
  sizeBall1: number = 0;
  sizeBall2: number = 0;
  sizeBall3: number = 0;
  backgroundURL: string = '';
  backgroundBallURL: string = '';

  currentURL: string = '';

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
    this.init();
  }

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver,
              private router: Router, @Inject(APP_BASE_HREF) public baseHref: string, private el: ElementRef) {
    this.el.nativeElement.style.setProperty('--lightBackground', this.lightBackground);
    this.init();
  }

  toggleSidenav(){
    this.sidenav.toggle();
  }

  init(){
    this.currentURL = this.router.url;
    this.getBreakpoint();
    this.switchBackground();
    this.switchBallSizeAndPosition();
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

  setBallPosition(xPositionBall1: number, yPositionBall1: number, xPositionBall2: number, yPositionBall2: number, xPositionBall3: number, yPositionBall3: number) {
    this.xPositionBall1 = xPositionBall1;
    this.yPositionBall1 = yPositionBall1;
    this.xPositionBall2 = xPositionBall2;
    this.yPositionBall2 = yPositionBall2;
    this.xPositionBall3 = xPositionBall3;
    this.yPositionBall3 = yPositionBall3;
  }

  setBallSize(sizeBall1: number, sizeBall2: number, sizeBall3: number) {
    this.sizeBall1 = sizeBall1;
    this.sizeBall2 = sizeBall2;
    this.sizeBall3 = sizeBall3;
  }

  switchBallSizeAndPosition(){
    switch (this.device) {
      case "WebLandscape":
        this.setBallPosition(65, 10, 37, 75, 110, 150);
        this.setBallSize(20, 15, 30);
        break;
      case "WebPortrait":
        this.setBallPosition(70, 10, 17, 62, 110, 90);
        this.setBallSize(270, 350, 310);
        break;
      case "TabletLandscape":
        this.setBallPosition(70, 10, 25, 65, 130, 90);
        this.setBallSize(25, 17, 40);
        break;
      case "TabletPortrait":
        this.setBallPosition(70, 10, 20, 55, 200, 100);
        this.setBallSize(40, 25, 65);
        break;
      case "HandsetLandscape":
        this.setBallPosition(70, 10, 30, 65, 120, 170);
        this.setBallSize(20, 15, 30);
        break;
      case "HandsetPortrait":
        this.setBallPosition(70, 20, 9, 61, 340, 95);
        this.setBallSize(70, 50, 85);
        break;
    }
  }

  switchBackground(){
    if(this.currentURL == '/'){
      this.backgroundURL = `${this.baseHref}assets/design/landingpage_blue-magenta-background.svg`;
      this.backgroundBallURL = `${this.baseHref}assets/design/landingpage_blue-background_ball.svg`;
    }else if(this.currentURL.includes('/performances')){
      this.backgroundURL = `${this.baseHref}assets/design/performances-n-admin_green-blue-background.svg`;
      this.backgroundBallURL = `${this.baseHref}assets/design/performances-n-admin_green-background_ball.svg`;
    }else if(this.currentURL.includes('/map')){
      this.backgroundURL = `${this.baseHref}assets/design/map_background.svg`;
    }else if(this.currentURL.includes('/vote')){
      this.backgroundURL = `${this.baseHref}assets/design/vote_red-yellow-background.svg`;
      this.backgroundBallURL = `${this.baseHref}assets/design/vote_red-yellow-background_ball.svg`;
    }else if(this.currentURL.includes('/admin-view')){
      this.backgroundURL = `${this.baseHref}assets/design/performances-n-admin_green-blue-background.svg`;
      this.backgroundBallURL = `${this.baseHref}assets/design/performances-n-admin_green-background_ball.svg`;
    }
  }

  generateBackgroundImageStyles(): any {
    if(this.currentURL.includes('/map')){
      this.lightBackground = false;
      return {
        'background-image': `url(${this.backgroundURL})`,
        'background-position': `0% 0%`,
        'background-size':  'cover',
        'background-repeat': 'no-repeat',
        'background-attachment': 'fixed',
      }
    }else if(this.currentURL.includes('/imprint') || this.currentURL.includes('/help-page')) {
      this.lightBackground = true;
      return {
        'background-color': 'white',
      }
    }else{
      if(this.currentURL.includes('/performances') || this.currentURL.includes('/admin-view')){
        this.lightBackground = true;
      }else {
        this.lightBackground = false;
      }
      return {
        'background-image': `url(${this.backgroundBallURL}), url(${this.backgroundBallURL}), url(${this.backgroundBallURL}), url(${this.backgroundURL})`,
        'background-position': `${this.xPositionBall1}% ${this.yPositionBall1}%, ${this.xPositionBall2}% ${this.yPositionBall2}%, ${this.xPositionBall3}% ${this.yPositionBall3}%, 0% 0%`,
        'background-size': `${this.sizeBall1}%, ${this.sizeBall2}%, ${this.sizeBall3}%, cover`,
        'background-repeat': 'no-repeat',
        'background-attachment': 'fixed',
      }
    }
  }

  changeBackgroundImageStyle(){
    this.init();
    this.backgroundImageStyles = this.generateBackgroundImageStyles();
  }
}
