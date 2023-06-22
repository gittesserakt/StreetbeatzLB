import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-landingpage-start',
  templateUrl: './landingpage-start.component.html',
  styleUrls: ['./landingpage-start.component.scss']
})
export class LandingpageStartComponent implements OnInit{
  @Input() device?:string;
  @Input() screenHeightPX!:number;
  @Input() screenWidthPX!:number;
  @Input() text!: string;
  gridWidthPX!: number;
  gridHeightPX!: number;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, @Inject(APP_BASE_HREF) public baseHref: string) {
    iconRegistry.addSvgIcon('scroll-Icon', sanitizer.bypassSecurityTrustResourceUrl(baseHref + 'assets/design/scrollable_icon.svg'));
  }

  ngOnInit(): void {
    this.getGridWidthAndHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.getGridWidthAndHeight();
  }

  getGridWidthAndHeight(){
    if(this.device == 'HandsetPortrait' || this.device == 'TabletPortrait'){
      this.gridWidthPX = this.screenWidthPX;
      this.gridHeightPX = Math.floor(this.screenHeightPX/2) ;
    }else {
      this.gridWidthPX = Math.floor(this.screenWidthPX/2);
      this.gridHeightPX = this.screenHeightPX;
    }
  }
}
