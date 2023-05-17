import {Component, OnInit, HostListener} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'StreetbeatzLB_Frontend';
  device:String = "Web";
  displayMap = new Map([
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web']
  ])


  ngOnInit(): void {
  }

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
