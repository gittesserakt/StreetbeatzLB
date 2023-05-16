import {Component, ViewChild, AfterViewInit, OnInit, HostListener} from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import {AuthService} from "@auth0/auth0-angular";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'StreetbeatzLB_Frontend';
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;
  navbarHeight: number = 64;
  device:String = "Web";
  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])

  ngAfterViewInit(){
    this.navbarHeight = this.navbar.navbarHeight;
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--navbar-height', this.navbarHeight + 'px');
  }

  isAuth0Loading$ = this.authService.isLoading$;
  constructor(private authService: AuthService,private breakpointObserver: BreakpointObserver) {
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
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.scrollY >= 250;
  }
}
